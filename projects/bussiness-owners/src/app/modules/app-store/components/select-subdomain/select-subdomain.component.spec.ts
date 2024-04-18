import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubdomainComponent } from './select-subdomain.component';

describe('SelectSubdomainComponent', () => {
  let component: SelectSubdomainComponent;
  let fixture: ComponentFixture<SelectSubdomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSubdomainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSubdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
