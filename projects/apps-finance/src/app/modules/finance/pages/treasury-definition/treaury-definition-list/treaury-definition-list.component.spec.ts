import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreauryDefinitionListComponent } from './treaury-definition-list.component';

describe('TreauryDefinitionListComponent', () => {
  let component: TreauryDefinitionListComponent;
  let fixture: ComponentFixture<TreauryDefinitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreauryDefinitionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreauryDefinitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
