import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroDataComponent } from './intro-data.component';

describe('IntroDataComponent', () => {
  let component: IntroDataComponent;
  let fixture: ComponentFixture<IntroDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
