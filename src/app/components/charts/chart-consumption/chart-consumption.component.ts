import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ConsumptionsService } from 'src/app/services/consumptions/consumptions.service';
import { CupsService } from 'src/app/services/cups/cups.service';
import { Consumption } from 'src/app/models/consumption.model';

@Component({
  selector: 'app-chart-consumption',
  templateUrl: './chart-consumption.component.html',
  styleUrls: ['./chart-consumption.component.sass']
})
export class ChartConsumptionComponent implements OnInit {

  isDataAvailable = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  // barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartLabels = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  // barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Consumos' }
  // ];
  barChartData: ChartDataSets[] = [];

  constructor(
    private consumptionsSvc: ConsumptionsService,
    private cupsSvc: CupsService
  ) { }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    this.isDataAvailable = false;
    this.consumptionsSvc.getConsumptions(this.cupsSvc.selectedCups).subscribe(
      d => {
        this.barChartLabels = [];
        this.barChartData = [];
        const auxLabels = [];
        const auxData = [];
        d.consumptions.map(c => {
          const con = Consumption.fromJson(c);
          auxLabels.push(con.dateFormat);
          auxData.push(con.consumption);
        });
        this.barChartLabels = auxLabels;
        this.barChartData = [{ data: auxData, label: 'Consumos' }];
        this.isDataAvailable = true;
      }
    );
  }

}
