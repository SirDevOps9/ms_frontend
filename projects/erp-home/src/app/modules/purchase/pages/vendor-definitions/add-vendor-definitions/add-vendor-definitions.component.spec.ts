import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorDefinitionsComponent } from './add-vendor-definitions.component';

describe('AddVendorDefinitionsComponent', () => {
  let component: AddVendorDefinitionsComponent;
  let fixture: ComponentFixture<AddVendorDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVendorDefinitionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddVendorDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
