import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesDetailsInfoComponent } from './companies-details-info.component';

describe('CompaniesDetailsInfoComponent', () => {
  let component: CompaniesDetailsInfoComponent;
  let fixture: ComponentFixture<CompaniesDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompaniesDetailsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompaniesDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
