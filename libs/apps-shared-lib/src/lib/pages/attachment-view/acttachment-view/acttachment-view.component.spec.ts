import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActtachmentViewComponent } from './acttachment-view.component';

describe('ActtachmentViewComponent', () => {
  let component: ActtachmentViewComponent;
  let fixture: ComponentFixture<ActtachmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActtachmentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActtachmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
