import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FildestComponent } from './fildest.component';

describe('FildestComponent', () => {
  let component: FildestComponent;
  let fixture: ComponentFixture<FildestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FildestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FildestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
