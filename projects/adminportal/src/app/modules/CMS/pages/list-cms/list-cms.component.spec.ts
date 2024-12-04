import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCMSComponent } from './list-cms.component';

describe('ListCMSComponent', () => {
  let component: ListCMSComponent;
  let fixture: ComponentFixture<ListCMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCMSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
