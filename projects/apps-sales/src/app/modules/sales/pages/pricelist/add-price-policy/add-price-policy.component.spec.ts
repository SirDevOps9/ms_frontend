import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPricePolicyComponent } from './add-price-policy.component';

describe('AddPricePolicyComponent', () => {
  let component: AddPricePolicyComponent;
  let fixture: ComponentFixture<AddPricePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPricePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPricePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
