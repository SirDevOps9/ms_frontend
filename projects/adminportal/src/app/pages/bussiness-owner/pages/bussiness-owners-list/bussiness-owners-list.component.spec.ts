import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessOwnersListComponent } from './bussiness-owners-list.component';

describe('BussinessOwnersListComponent', () => {
  let component: BussinessOwnersListComponent;
  let fixture: ComponentFixture<BussinessOwnersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BussinessOwnersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BussinessOwnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
