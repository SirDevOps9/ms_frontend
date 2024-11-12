import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPricePolicyComponent } from './view-price-policy.component';

describe('ViewPricePolicyComponent', () => {
  let component: ViewPricePolicyComponent;
  let fixture: ComponentFixture<ViewPricePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPricePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPricePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
