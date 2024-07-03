import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialBlanceComponent } from './trial-blance.component';

describe('TrialBlanceComponent', () => {
  let component: TrialBlanceComponent;
  let fixture: ComponentFixture<TrialBlanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrialBlanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialBlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
