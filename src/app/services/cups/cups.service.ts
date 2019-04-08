import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, share } from 'rxjs/operators';
import { Page } from 'src/app/models/page.model';

export interface Cups {
  cups: string;
}

@Injectable({
  providedIn: 'root'
})
export class CupsService {

  readonly API = environment.apiUrl + 'cups';

  selectedCups: any;

  constructor(
    private http: HttpClient
  ) { }

  getCups(newPage?: Page): Observable<any> {
    let page: Page;

    if (newPage) {
      page = newPage;
    } else {
      page = new Page({});
    }

    const url = this.API;
    const from = page && page.from ? page.from : 0;
    const max = page && page.limit ? page.limit : 5;

    const sort = page && page.sort ? page.sort : '_id';
    const dir = page && page.dir ? page.dir : 'asc';

    const params = new HttpParams()
      .set('from', from.toString())
      .set('max', max.toString())
      .set('sort', sort)
      .set('dir', dir);

    const obs = this.http.get(url, { params })
    .pipe(
      map( (data: any) => {
        console.log(data);
        let res: any;
        let count: number;
        if (data.total && !isNaN(+data.total)) {
          count = +data.total;
        }
        if (!data.cups) {
          res = throwError(data);
        } else {
          let resData = {};
          page.count = count;
          const cups = [];
          data.cups.map(
            s => {
              cups.push({ cups: s });
            }
          );
          resData = { cups, page };
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

  deleteCups(cups: string): Observable<any> {
    const url = this.API + '/' + cups;

    const obs = this.http.delete(url)
    .pipe(
      share()
    );

    obs.subscribe();

    return obs;
  }
}
