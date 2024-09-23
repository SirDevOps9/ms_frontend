import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UOMAddComponent } from './uom-add.component';

describe('UOMAddComponent', () => {
  let component: UOMAddComponent;
  let fixture: ComponentFixture<UOMAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UOMAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UOMAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
