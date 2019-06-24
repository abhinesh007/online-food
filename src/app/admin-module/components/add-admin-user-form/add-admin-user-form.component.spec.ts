import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminUserFormComponent } from './add-admin-user-form.component';

describe('AddAdminUserFormComponent', () => {
  let component: AddAdminUserFormComponent;
  let fixture: ComponentFixture<AddAdminUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
