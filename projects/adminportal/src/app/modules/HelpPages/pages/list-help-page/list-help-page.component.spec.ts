import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHelpPageComponent } from './list-help-page.component';

describe('ListHelpPageComponent', () => {
  let component: ListHelpPageComponent;
  let fixture: ComponentFixture<ListHelpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListHelpPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListHelpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
