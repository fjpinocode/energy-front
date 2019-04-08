import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { CupsService, Cups } from 'src/app/services/cups/cups.service';
import { Page } from 'src/app/models/page.model';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cups-list',
  templateUrl: './cups-list.component.html',
  styleUrls: ['./cups-list.component.sass']
})
export class CupsListComponent implements OnInit {

  readonly PER_PAGE = 10;

  ascTypeSort = false;

  page = new Page({ limit: this.PER_PAGE, offset: 0 });
  rows = new Array<Cups>();

  @ViewChild('detailTitle') detailTitle: TemplateRef<any>;
  @ViewChild('detailRow') detailRow: TemplateRef<any>;

  @ViewChild('deleteTitle') deleteTitle: TemplateRef<any>;
  @ViewChild('deleteRow') deleteRow: TemplateRef<any>;

  loadingIndicator = true;
  reorderable = true;

  columns: TableColumn[] = [
    { prop: 'cups', name: 'CUPS' }
  ];

  constructor(
    private loading: LoadingService,
    private cupsSvc: CupsService,
    private router: Router
  ) {
    this.setPage({});
  }

  ngOnInit() {
    this.columns.push(
      {
        cellTemplate: this.deleteRow,
        headerTemplate: this.deleteTitle,
        prop: 'cups',
        name: 'Eliminar'
      }
    );
    this.columns.push(
      {
        cellTemplate: this.detailRow,
        headerTemplate: this.detailTitle,
        prop: 'cups',
        name: 'Ver Detalle'
      }
    );
  }

  deleteCups(cups: any) {
    console.log('Eliminar cups: ' + cups);
    this.loading.open();
    this.cupsSvc.deleteCups(cups)
    .pipe(
      finalize(() => {
        this.loading.close();
      })
    )
    .subscribe(
      d => {
        this.setPage({ offset: 0 }); }
    );
  }

  viewDetailCups(cups: any) {
    console.log('ir a detalle cups ' + cups);
    this.cupsSvc.selectedCups = cups;
    this.router.navigate(['/charts']);
  }

  setPage(p: any) {
    this.page.offset = p.offset;
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

    this.cupsSvc.getCups(page)
    .pipe(
      finalize(() => {
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      })
    )
    .subscribe(
      data => {
        this.rows = data.cups;
      },
      e => {}
    );
  }
}
