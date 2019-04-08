import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Consumption } from 'src/app/models/consumption.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, share } from 'rxjs/operators';
import { Page } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionsService {

  readonly API = environment.apiUrl + 'consumptions';

  consumptions: Consumption[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getConsumptions(cups: string, newPage?: Page): Observable<any> {
    const url = this.API + '/' + cups;
    let page: Page;

    if (newPage) {
      page = newPage;
    } else {
      page = new Page({});
    }

    const from = page && page.from ? page.from : 0;
    const max = page && page.limit ? page.limit : 5;
    const sort = page && page.sort ? page.sort : '_id';
    const dir = page && page.dir ? page.dir : 'asc';

    const params = new HttpParams()
    .set('cups', cups)
    .set('sort', sort)
    .set('dir', dir)
    .set('from', from.toString())
    .set('max', max.toString());

    const obs = this.http.get(url, { params } ).pipe(
      map( (data: any) => {
        console.log(data);
        let res: any;
        let count: number;
        if (data.total && !isNaN(+data.total)) {
          count = +data.total;
        }
        if (!data.consumptionsDB) {
          res = throwError(data);
        } else {
          let resData = {};
          page.count = count;
          const consumptions: Consumption[] = [];
          data.consumptionsDB.map(
            c => {
              consumptions.push(Consumption.fromJson(c));
            }
          );
          resData = { consumptions, page };
          res = resData;
        }
        return res;
      }),
      catchError( e => {
        return throwError(e);
      }),
      share()
    );

    obs.subscribe();

    return obs;
  }

  saveConsumptionsByCsv(file: File): Observable<any> {
    const url = this.API + '/csv';

    const formData: FormData = new FormData();
    formData.append('csvfile', file, file.name);

    const obs = this.http.post(url, formData)
    .pipe(
      map( data => {
        console.log(data);
      }),
      catchError( e => {
        return throwError(e);
      }),
      share()
    );

    return obs;
  }

  saveConsumptions() {
    // TODO
  }

  updateConsumption() {
    // TODO
  }

  deleteConsumptions(cups: string): Observable<any> {
    const url = this.API + '/' + cups;

    const obs = this.http.delete(url).pipe(
      share()
    );

    obs.subscribe();

    return obs;
  }
}
