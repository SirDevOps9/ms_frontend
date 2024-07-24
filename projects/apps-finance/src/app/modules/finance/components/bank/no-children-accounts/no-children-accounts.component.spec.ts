import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoChildrenAccountsComponent } from './no-children-accounts.component';

describe('NoChildrenAccountsComponent', () => {
  let component: NoChildrenAccountsComponent;
  let fixture: ComponentFixture<NoChildrenAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoChildrenAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoChildrenAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
