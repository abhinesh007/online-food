import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderCardComponent } from './admin-order-card.component';

describe('AdminOrderCardComponent', () => {
  let component: AdminOrderCardComponent;
  let fixture: ComponentFixture<AdminOrderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
