import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttributeDetalisComponent } from './view-attribute-detalis.component';

describe('ViewAttributeDetalisComponent', () => {
  let component: ViewAttributeDetalisComponent;
  let fixture: ComponentFixture<ViewAttributeDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAttributeDetalisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAttributeDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
