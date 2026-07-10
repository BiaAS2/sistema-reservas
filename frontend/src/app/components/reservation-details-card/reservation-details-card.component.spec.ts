import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDetailsCardComponent } from './reservation-details-card.component';

describe('ReservationDetailsCardComponent', () => {
  let component: ReservationDetailsCardComponent;
  let fixture: ComponentFixture<ReservationDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationDetailsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
