import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPricePolicyComponent } from './edit-price-policy.component';

describe('EditPricePolicyComponent', () => {
  let component: EditPricePolicyComponent;
  let fixture: ComponentFixture<EditPricePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPricePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPricePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
