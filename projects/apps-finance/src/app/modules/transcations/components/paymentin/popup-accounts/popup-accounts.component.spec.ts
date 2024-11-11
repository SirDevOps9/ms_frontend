import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAccountsComponent } from './popup-accounts.component';

describe('PopupAccountsComponent', () => {
  let component: PopupAccountsComponent;
  let fixture: ComponentFixture<PopupAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
