import { CoolLocalStorage } from '@angular-cool/storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  salesPersonId: any;
  dayList = [
    { "name": "7 Days", "value":"7"},
    { "name": "30 Days", "value":"30"},
    { "name": "90 Days", "value":"90"}

]
days = this.dayList[0].value;
  
  constructor(private session: CoolLocalStorage) {
    this.salesPersonId = this.session.getItem('salesPersonId');
    
   }

 breakpoint:any;
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 480) ? 2 : 4;
}

onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 480) ? 2 : 4;
}

}
