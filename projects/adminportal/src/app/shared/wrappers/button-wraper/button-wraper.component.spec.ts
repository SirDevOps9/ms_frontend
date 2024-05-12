import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWraperComponent } from './button-wraper.component';

describe('ButtonWraperComponent', () => {
  let component: ButtonWraperComponent;
  let fixture: ComponentFixture<ButtonWraperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWraperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonWraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
