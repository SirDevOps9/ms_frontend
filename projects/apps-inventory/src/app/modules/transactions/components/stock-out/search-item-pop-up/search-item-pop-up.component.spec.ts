import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemPopUpComponent } from './search-item-pop-up.component';

describe('SearchItemPopUpComponent', () => {
  let component: SearchItemPopUpComponent;
  let fixture: ComponentFixture<SearchItemPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchItemPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchItemPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
