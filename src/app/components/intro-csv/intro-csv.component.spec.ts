import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroCsvComponent } from './intro-csv.component';

describe('IntroCsvComponent', () => {
  let component: IntroCsvComponent;
  let fixture: ComponentFixture<IntroCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
