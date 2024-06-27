import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultipeFilesComponent } from './upload-multipe-files.component';

describe('UploadMultipeFilesComponent', () => {
  let component: UploadMultipeFilesComponent;
  let fixture: ComponentFixture<UploadMultipeFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMultipeFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadMultipeFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
