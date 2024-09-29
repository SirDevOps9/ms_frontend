import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UOMEditComponent } from './uom-edit.component';

describe('UOMEditComponent', () => {
  let component: UOMEditComponent;
  let fixture: ComponentFixture<UOMEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UOMEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UOMEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
