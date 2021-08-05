import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientActivityTrackingService } from '../client-activity.service';
import { SoldDetailsComponent } from './sold-details/sold-details.component';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit, OnChanges {

  clients: any;
  sales: any;
  clientsGo:any;
  salesGo:any;
  @Input() days:any;
  buttonDisabled:any;
  constructor(private dialog:MatDialog, private service: ClientActivityTrackingService, private spinner: NgxSpinnerService) { 
    this.service.activityChangeAnnounced.subscribe(
      activity => {
        this.buttonDisabled = false; 
      });

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
   
    this.sold();
  }

  showDetails(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(SoldDetailsComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px'
    });
  }
  setActivity(){
    this.service.announceActivity({activity:'trackingSold', days: this.days});
    this.buttonDisabled = true; 
   }
  sold(){
    this.spinner.show('soldSpinner');
    // get how many days
    this.service.getClientsSold(this.days).subscribe(stats=>{
      let clientsBefore;
      let soldBefore

      if(stats[0]){
        this.clients = stats[0].clks;
      }

      if(stats[1]){
        this.sales = stats[1].clks;
      }
      if(stats[2]){
        clientsBefore = stats[2].clks;
      }
      if(stats[3]){
        soldBefore = stats[3].clks;
      }

      
      if(this.clients - clientsBefore > 0){
        this.clientsGo = 1
      }
      else if(this.clients  - clientsBefore < 0){
        this.clientsGo = -1
      }
      else{
        this.clientsGo = 0
      }

      if(this.sales  - soldBefore > 0){
        this.salesGo = 1
      }
      else if(this.sales - soldBefore < 0){
        this.salesGo = -1
      }
      else{
        this.salesGo = 0
      }

      this.spinner.hide('soldSpinner');

    });

  }




}
