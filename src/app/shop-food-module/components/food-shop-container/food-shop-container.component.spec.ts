import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodShopContainerComponent } from './food-shop-container.component';

describe('FoodShopContainerComponent', () => {
  let component: FoodShopContainerComponent;
  let fixture: ComponentFixture<FoodShopContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodShopContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodShopContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
