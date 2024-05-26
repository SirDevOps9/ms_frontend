import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggelComponent } from './toggel.component';

describe('ToggelComponent', () => {
  let component: ToggelComponent;
  let fixture: ComponentFixture<ToggelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
