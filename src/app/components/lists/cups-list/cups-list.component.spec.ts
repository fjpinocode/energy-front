import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupsListComponent } from './cups-list.component';

describe('CupsListComponent', () => {
  let component: CupsListComponent;
  let fixture: ComponentFixture<CupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
