import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDetailCardComponent } from './admin-order-detail-card.component';

describe('AdminOrderDetailCardComponent', () => {
  let component: AdminOrderDetailCardComponent;
  let fixture: ComponentFixture<AdminOrderDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrderDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
