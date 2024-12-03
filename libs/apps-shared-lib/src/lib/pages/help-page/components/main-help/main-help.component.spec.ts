import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHelpComponent } from './main-help.component';

describe('MainHelpComponent', () => {
  let component: MainHelpComponent;
  let fixture: ComponentFixture<MainHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
