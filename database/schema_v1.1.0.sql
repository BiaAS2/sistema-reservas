--
-- PostgreSQL database dump
--

\restrict LwUDXbKLYZMK6d5hvGGwVHdD2RtIZ2amnsO80FQie2fKRSxWaeXsPRoAGbvQ5yM

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-09-17 17:33:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 17000)
-- Name: reservas_negadas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reservas_negadas (
    id integer NOT NULL,
    segmento character varying(2) NOT NULL,
    numero_reserva character varying(50) NOT NULL,
    nome_empresa character varying(150),
    nome_requisitante character varying(100),
    agencia character varying(150),
    nome_condutor character varying(100),
    cpf character varying(14),
    grupo character varying(10),
    email character varying(100),
    telefone character varying(20),
    data_retirada date,
    data_devolucao date,
    valor_reserva numeric(10,2) DEFAULT 0.00,
    status character varying(50) DEFAULT 'NEGADA'::character varying,
    CONSTRAINT reservas_negadas_segmento_check CHECK (((segmento)::text = ANY ((ARRAY['PF'::character varying, 'PJ'::character varying])::text[])))
);


--
-- TOC entry 219 (class 1259 OID 16999)
-- Name: reservas_negadas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reservas_negadas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 219
-- Name: reservas_negadas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reservas_negadas_id_seq OWNED BY public.reservas_negadas.id;


--
-- TOC entry 222 (class 1259 OID 17015)
-- Name: reservas_tratadas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reservas_tratadas (
    id integer NOT NULL,
    numero_reserva character varying(50) NOT NULL,
    segmento character varying(2) NOT NULL,
    status_tratado character varying(50) NOT NULL,
    responsavel character varying(100),
    confirmada_por character varying(100),
    observacoes text,
    numero_nova_reserva character varying(50),
    valor_recuperado numeric(10,2) DEFAULT 0.00,
    data_tratamento timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reservas_tratadas_segmento_check CHECK (((segmento)::text = ANY ((ARRAY['PF'::character varying, 'PJ'::character varying])::text[])))
);


--
-- TOC entry 221 (class 1259 OID 17014)
-- Name: reservas_tratadas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reservas_tratadas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 221
-- Name: reservas_tratadas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reservas_tratadas_id_seq OWNED BY public.reservas_tratadas.id;


--
-- TOC entry 4760 (class 2604 OID 17003)
-- Name: reservas_negadas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservas_negadas ALTER COLUMN id SET DEFAULT nextval('public.reservas_negadas_id_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 17018)
-- Name: reservas_tratadas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservas_tratadas ALTER COLUMN id SET DEFAULT nextval('public.reservas_tratadas_id_seq'::regclass);


--
-- TOC entry 4769 (class 2606 OID 17013)
-- Name: reservas_negadas reservas_negadas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservas_negadas
    ADD CONSTRAINT reservas_negadas_pkey PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 17029)
-- Name: reservas_tratadas reservas_tratadas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservas_tratadas
    ADD CONSTRAINT reservas_tratadas_pkey PRIMARY KEY (id);


-- Completed on 2026-09-17 17:33:10

--
-- PostgreSQL database dump complete
--

\unrestrict LwUDXbKLYZMK6d5hvGGwVHdD2RtIZ2amnsO80FQie2fKRSxWaeXsPRoAGbvQ5yM

