import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainSpaceInfoComponent } from './domain-space-info.component';

describe('DomainSpaceInfoComponent', () => {
  let component: DomainSpaceInfoComponent;
  let fixture: ComponentFixture<DomainSpaceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomainSpaceInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainSpaceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
