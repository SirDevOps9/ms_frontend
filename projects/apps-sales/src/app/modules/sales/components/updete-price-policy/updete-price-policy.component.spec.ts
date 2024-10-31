import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdetePricePolicyComponent } from './updete-price-policy.component';

describe('UpdetePricePolicyComponent', () => {
  let component: UpdetePricePolicyComponent;
  let fixture: ComponentFixture<UpdetePricePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdetePricePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdetePricePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
