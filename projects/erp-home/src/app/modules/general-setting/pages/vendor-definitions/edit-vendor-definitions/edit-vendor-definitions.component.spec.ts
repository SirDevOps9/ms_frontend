import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendorDefinitionsComponent } from './edit-vendor-definitions.component';

describe('EditVendorDefinitionsComponent', () => {
  let component: EditVendorDefinitionsComponent;
  let fixture: ComponentFixture<EditVendorDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVendorDefinitionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditVendorDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
