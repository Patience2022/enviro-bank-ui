import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerPopUpComponent } from './update-customer-pop-up.component';

describe('UpdateCustomerPopUpComponent', () => {
  let component: UpdateCustomerPopUpComponent;
  let fixture: ComponentFixture<UpdateCustomerPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCustomerPopUpComponent]
    });
    fixture = TestBed.createComponent(UpdateCustomerPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
