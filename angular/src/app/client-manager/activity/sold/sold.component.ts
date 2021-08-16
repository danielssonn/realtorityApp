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
  stats:any;
  @Input() days:any;
  @Input() segment = 0;
  buttonDisabled:any;
  clientsBefore:any;
  soldBefore:any;
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
      minWidth: '375px',
      data: {
        dataKey: {clientsNow: this.clients, clientsBefore:this.clientsBefore, clientsGo:this.clientsGo,
          soldNow: this.sales, soldBefore:this.soldBefore, salesGo:this.salesGo, days:this.days}
        } 
    });
  }
  setActivity(){
    this.service.announceActivity({activity:'trackingSold', days: this.days, segment: this.segment});
    this.buttonDisabled = true; 
   }
  sold(){

    if(this.days){
      
      this.spinner.show('soldSpinner'); 
      this.service.getClientsSold(this.days, this.segment).subscribe(stats=>{

        this.stats = stats;

  
        if(this.stats[0]){
          this.clients = this.stats[0].clks;
        }
  
        if(this.stats[1]){
          this.sales = this.stats[1].clks;
        }
        if(this.stats[2]){
          this.clientsBefore = this.stats[2].clks;
        }
        if(this.stats[3]){
          this.soldBefore = this.stats[3].clks;
        }
  
        
        if(this.clients - this.clientsBefore > 0){
          this.clientsGo = 1
        }
        else if(this.clients  - this.clientsBefore < 0){
          this.clientsGo = -1
        }
        else{
          this.clientsGo = 0
        }
  
        if(this.sales  - this.soldBefore > 0){
          this.salesGo = 1
        }
        else if(this.sales -this.soldBefore < 0){
          this.salesGo = -1
        }
        else{
          this.salesGo = 0
        }
  
        this.spinner.hide('soldSpinner');
  
      });
  
    
    }
  }




}
