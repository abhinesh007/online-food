import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCartInineItemComponent } from './mini-cart-inine-item.component';

describe('MiniCartInineItemComponent', () => {
  let component: MiniCartInineItemComponent;
  let fixture: ComponentFixture<MiniCartInineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniCartInineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartInineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
