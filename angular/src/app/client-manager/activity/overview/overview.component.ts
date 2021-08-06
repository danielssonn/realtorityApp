import { CoolLocalStorage } from '@angular-cool/storage';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, AfterViewInit {
  salesPersonId: any;
  dayList = [
    { "name": "7 Days", "value": "7" },
    { "name": "60 Days", "value": "60" },
    { "name": "90 Days", "value": "90" }

  ]

  days: any;
  constructor(private session: CoolLocalStorage) {
    this.salesPersonId = this.session.getItem('salesPersonId');

  }
  ngAfterViewInit(): void {
    this.days = this.dayList[0].value;
  }

  breakpoint: any;
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 480) ? 2 : 4;

  }


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 2 : 4;
  }

}
