import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodItemFormComponent } from './add-food-item-form.component';

describe('AddFoodItemFormComponent', () => {
  let component: AddFoodItemFormComponent;
  let fixture: ComponentFixture<AddFoodItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
