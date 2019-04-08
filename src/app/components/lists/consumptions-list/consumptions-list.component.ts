import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Consumption } from 'src/app/models/consumption.model';
import { Page } from 'src/app/models/page.model';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { CupsService } from 'src/app/services/cups/cups.service';
import { ConsumptionsService } from 'src/app/services/consumptions/consumptions.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-consumptions-list',
  templateUrl: './consumptions-list.component.html',
  styleUrls: ['./consumptions-list.component.sass']
})
export class ConsumptionsListComponent implements OnInit {

  @Output ()
  updateData = new EventEmitter <any>();

  readonly PER_PAGE = 30;

  ascTypeSort = false;

  page = new Page({ limit: this.PER_PAGE, offset: 0 });
  rows = new Array<Consumption>();

  @ViewChild('deleteTitle') deleteTitle: TemplateRef<any>;
  @ViewChild('deleteRow') deleteRow: TemplateRef<any>;

  loadingIndicator = true;
  reorderable = true;

  columns: TableColumn[] = [
    { prop: 'cups', name: 'CUPS' },
    { prop: 'dateFormat', name: 'FECHA' },
    { prop: 'hour', name: 'HORA' },
    { prop: 'consumption', name: 'Consumo' },
    { prop: 'obtainingMethod', name: 'Método Obtención' }
  ];

  constructor(
    private loading: LoadingService,
    private cupsSvc: CupsService,
    private consumptionsSvc: ConsumptionsService
  ) { }

  ngOnInit() {
    this.columns.push(
      {
        cellTemplate: this.deleteRow,
        headerTemplate: this.deleteTitle,
        prop: 'id',
        name: 'Eliminar'
      }
    );
    setTimeout(() => {
      this.setPage({});
    }, 300);
  }

  deleteConsumption(value) {
    this.loading.open();
    this.consumptionsSvc.deleteConsumptions(value)
    .pipe(
      finalize(() => {
        this.loading.close();
      })
    )
    .subscribe(
      d => {
        console.log(d);
        this.updateData.emit(true);
        this.setPage({});
      }
    );
  }

  setPage(p: any) {
    this.page.offset = p.offset;
    this.page.sort = 'cups';
    this.page.dir = 'desc';
    this.fetchData();
  }

  sortPage(sortEvent: any) {
    this.page.sort = sortEvent.column.prop;
    this.page.dir = sortEvent.newValue;
    this.fetchData();
  }

  private fetchData() {
    this.loadingIndicator = true;

    const page = this.page;

    this.consumptionsSvc.getConsumptions(this.cupsSvc.selectedCups, page)
    .pipe(
      finalize(() => {
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      })
    )
    .subscribe(
      data => {
        console.log('+++++++++++');
        console.log(data);
        this.page = data.page;
        this.rows = data.consumptions;
        this.loadingIndicator = false;
      },
      e => {}
    );
  }

}
