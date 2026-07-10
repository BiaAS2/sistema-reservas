import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTaskCardComponent } from './reservation-task-card.component';

describe('ReservationTaskCardComponent', () => {
  let component: ReservationTaskCardComponent;
  let fixture: ComponentFixture<ReservationTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationTaskCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
