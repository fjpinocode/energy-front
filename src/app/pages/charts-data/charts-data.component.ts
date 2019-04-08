import { Component, OnInit, ViewChild } from '@angular/core';
import { CupsService } from 'src/app/services/cups/cups.service';
import { Router } from '@angular/router';
import { ChartConsumptionComponent } from 'src/app/components/charts/chart-consumption/chart-consumption.component';

@Component({
  selector: 'app-charts-data',
  templateUrl: './charts-data.component.html',
  styleUrls: ['./charts-data.component.sass']
})
export class ChartsDataComponent implements OnInit {

  @ViewChild('chartCons') chartCons: ChartConsumptionComponent;

  constructor(
    private cupsSvc: CupsService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.cupsSvc.selectedCups) {
      this.router.navigate(['/intro']);
    }
  }

  getCups() {
    let res = '';
    try {
      res = this.cupsSvc.selectedCups;
    } catch (e) {
      console.log(e);
      res = '';
    }
    return res;
  }

  updateCharts() {
    console.log('updateCharts');
    this.chartCons.initChart();
  }

}
