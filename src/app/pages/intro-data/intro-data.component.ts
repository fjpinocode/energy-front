import { Component, OnInit, ViewChild } from '@angular/core';
import { CupsListComponent } from 'src/app/components/lists/cups-list/cups-list.component';

@Component({
  selector: 'app-intro-data',
  templateUrl: './intro-data.component.html',
  styleUrls: ['./intro-data.component.sass']
})
export class IntroDataComponent implements OnInit {

  @ViewChild('cupsList') cupsList: CupsListComponent;

  constructor() {}

  ngOnInit() {
  }

  updateCupsList() {
    this.cupsList.setPage({});
  }

}
