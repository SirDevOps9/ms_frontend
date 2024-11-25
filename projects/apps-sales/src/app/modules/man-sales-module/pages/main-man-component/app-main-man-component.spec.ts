import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainManComponent } from './app-main-man-component';

describe('MainManComponent', () => {
  let component: MainManComponent;
  let fixture: ComponentFixture<MainManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainManComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
