from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from fastapi import HTTPException
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Configuração do CORS para permitir requisições do Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# conexão com PostgreSQL
conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)

# modelo de dados para reserva tratada
class ReservaTratada(BaseModel):
    numero_reserva: str
    status_tratado: str
    responsavel: Optional[str] = None
    confirmada_por: Optional[str] = None
    observacoes: Optional[str] = None
    numero_nova_reserva: Optional[str] = None

# Buscar reserva negada por número
@app.get("/reservas_negadas/{numero}")
def buscar_por_numero(numero: str):
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM reservas_negadas WHERE numero_reserva = %s",
        (numero,)
    )

    colunas = [desc[0] for desc in cur.description]
    dados = cur.fetchall()
    cur.close()

    if not dados:
        # Lança um erro HTTP real de "Não Encontrado"
        raise HTTPException(status_code=404, detail="Reserva não encontrada")

    resultado = [dict(zip(colunas, linha)) for linha in dados]
    return resultado

# Buscar tratativa por número de reserva
@app.get("/reservas_tratadas/{numero}")
def buscar_tratativa(numero: str):

    cur = conn.cursor()
    cur.execute(
        """
        SELECT *
        FROM reservas_tratadas
        WHERE numero_reserva = %s
        """,
        (numero,)
    )

    dado = cur.fetchone()
    colunas = [desc[0] for desc in cur.description]

    cur.close()

    if not dado:
        return {}

    return dict(zip(colunas, dado))

# Atualizar reserva negada para tratada
@app.post("/reservas_tratadas")
def criar_tratativa(reserva: ReservaTratada):

    try:
        cur = conn.cursor()
        cur.execute(
            """
            SELECT id 
            FROM reservas_tratadas
            WHERE numero_reserva = %s
            """,
            (reserva.numero_reserva,)
        )

        tratativa_existente = cur.fetchone()

        if tratativa_existente:
            cur.execute(
                """
                UPDATE reservas_tratadas
                SET
                    status_tratado = %s,
                    responsavel = %s,
                    confirmada_por = %s,
                    observacoes = %s,
                    numero_nova_reserva = %s,
                    data_tratamento = CURRENT_TIMESTAMP
                WHERE numero_reserva = %s
                """,
                (
                    reserva.status_tratado,
                    reserva.responsavel,
                    reserva.confirmada_por,
                    reserva.observacoes,
                    reserva.numero_nova_reserva,
                    reserva.numero_reserva
                )
            )
            conn.commit()
            cur.close()

            return {
                "acao": "update",
                "msg": "Tratativa atualizada com sucesso"
            }
        else:
            cur.execute(

                """
                INSERT INTO reservas_tratadas (
                    numero_reserva,
                    status_tratado,
                    responsavel,
                    confirmada_por,
                    observacoes,
                    numero_nova_reserva
                )
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (
                    reserva.numero_reserva,
                    reserva.status_tratado,
                    reserva.responsavel,
                    reserva.confirmada_por,
                    reserva.observacoes,
                    reserva.numero_nova_reserva
                )
            )

        conn.commit()
        cur.close()

        return {
            "acao": "insert",
            "msg": "Tratativa criada com sucesso"
        }
        
    except Exception as e:
        print("ERRO:", e)
        raise HTTPException(status_code=500, detail=str(e))
    