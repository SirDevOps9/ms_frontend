import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSequenceComponent } from './confirm-sequence.component';

describe('ConfirmSequenceComponent', () => {
  let component: ConfirmSequenceComponent;
  let fixture: ComponentFixture<ConfirmSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmSequenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
