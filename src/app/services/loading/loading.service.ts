import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  actived = false;

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  open(): boolean {
    let success = false;
    if (!this.actived) {
      this.actived = true;
      this.spinner.show();
      success = true;
    }
    return success;
  }

  close(): boolean {
    let success = false;
    if (this.actived) {
      this.actived = false;
      this.spinner.hide();
      success = true;
    }
    return success;
  }
}
