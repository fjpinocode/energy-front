import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ConsumptionsService } from 'src/app/services/consumptions/consumptions.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-intro-csv',
  templateUrl: './intro-csv.component.html',
  styleUrls: ['./intro-csv.component.scss']
})
export class IntroCsvComponent implements OnInit {

  @Output ()
  updateData = new EventEmitter <any>();

  form = new FormGroup({});
  model = { };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'csvfile',
      type: 'file'
    },
  ];

  constructor(
    private loading: LoadingService,
    private consumptionsSvc: ConsumptionsService
  ) { }

  ngOnInit() {
  }

  formChange(event) {
    try {
      if (event && event.srcElement) {
        this.loading.open();
        const files = event.srcElement.files;
        this.consumptionsSvc.saveConsumptionsByCsv(files[0])
        .pipe(
          finalize(() =>  {
            this.loading.close();
            setTimeout(() => {
              this.form.reset();
            }, 300);
          })
        )
        .subscribe(
          d => {
            this.updateData.emit(true);
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
}
