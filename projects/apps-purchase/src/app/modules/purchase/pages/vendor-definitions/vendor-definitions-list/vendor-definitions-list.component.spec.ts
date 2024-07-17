import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDefinitionsListComponent } from './vendor-definitions-list.component';

describe('VendorDefinitionsListComponent', () => {
  let component: VendorDefinitionsListComponent;
  let fixture: ComponentFixture<VendorDefinitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorDefinitionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorDefinitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
