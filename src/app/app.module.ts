import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroDataComponent } from './pages/intro-data/intro-data.component';
import { ChartsDataComponent } from './pages/charts-data/charts-data.component';
import { CupsListComponent } from './components/lists/cups-list/cups-list.component';
import { ConsumptionsListComponent } from './components/lists/consumptions-list/consumptions-list.component';
import { IntroCsvComponent } from './components/intro-csv/intro-csv.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldFileComponent } from './components/formly-types/file-type.component';
import { ChartsModule } from 'ng2-charts';
import { ChartConsumptionComponent } from './components/charts/chart-consumption/chart-consumption.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroDataComponent,
    ChartsDataComponent,
    CupsListComponent,
    ConsumptionsListComponent,
    IntroCsvComponent,
    NopagefoundComponent,
    FormlyFieldFileComponent,
    ChartConsumptionComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: FormlyFieldFileComponent }
      ]
    }),
    FormlyBootstrapModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
