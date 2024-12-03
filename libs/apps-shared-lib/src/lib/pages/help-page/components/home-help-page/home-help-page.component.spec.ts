import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHelpPageComponent } from './home-help-page.component';

describe('HomeHelpPageComponent', () => {
  let component: HomeHelpPageComponent;
  let fixture: ComponentFixture<HomeHelpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHelpPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeHelpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
