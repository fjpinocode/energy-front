import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartConsumptionComponent } from './chart-consumption.component';

describe('ChartConsumptionComponent', () => {
  let component: ChartConsumptionComponent;
  let fixture: ComponentFixture<ChartConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
