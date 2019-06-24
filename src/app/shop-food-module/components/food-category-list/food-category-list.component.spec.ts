import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCategoryListComponent } from './food-category-list.component';

describe('FoodCategoryListComponent', () => {
  let component: FoodCategoryListComponent;
  let fixture: ComponentFixture<FoodCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
