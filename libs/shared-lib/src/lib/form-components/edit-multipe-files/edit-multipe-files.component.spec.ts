import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMultipeFilesComponent } from './edit-multipe-files.component';

describe('EditMultipeFilesComponent', () => {
  let component: EditMultipeFilesComponent;
  let fixture: ComponentFixture<EditMultipeFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMultipeFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMultipeFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
