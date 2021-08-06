import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientActivityTrackingService } from '../client-activity.service';
import { CheckingDetailsComponent } from './checking-details/checking-details.component';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit, OnChanges {

  clients: any;
  clicks: any;
  clientsGo:any;
  clicksGo:any
  stats: any;
  @Input() days;
  buttonDisabled: boolean 
  activity:any;
  clientsBefore:any;
  clicksBefore:any;

  constructor(private dialog: MatDialog, private service:ClientActivityTrackingService,  private spinner: NgxSpinnerService) { 

    this.service.activityChangeAnnounced.subscribe(
      activity => {
       this.buttonDisabled = false; 
      });

  }

  ngOnInit(): void {
  
    
  }
  ngOnChanges(changes: SimpleChanges) {
    this.checking();
  }

  showDetails(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(CheckingDetailsComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px',
      data: {
        dataKey: {clientsNow: this.clients, clientsBefore:this.clientsBefore, clientsGo:this.clientsGo,
                  clicksNow: this.clicks, clicksBefore:this.clicksBefore, clicksGo:this.clicksGo, days:this.days}
      }
    });
  }
  setActivity(){
   this.service.announceActivity({activity:'checking', days: this.days});
   this.buttonDisabled = true;
  }
  checking(){

    if(this.days){
    this.spinner.show('checkingSpinner');
    // get how many days
    this.service.getClientsClicking(this.days).subscribe(stats=>{
      this.stats = stats;


      if(this.stats[0]){
        this.clients = this.stats[0].clks;
      }

      if(this.stats[1]){
        this.clicks = this.stats[1].clks;
      }
      if(this.stats[2]){
        this.clientsBefore = this.stats[2].clks;
      }
      if(stats[3]){
        this.clicksBefore = this.stats[3].clks;
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

      if(this.clicks  - this.clicksBefore > 0){
        this.clicksGo = 1
      }
      else if(this.clicks - this.clicksBefore < 0){
        this.clicksGo = -1
      }
      else{
        this.clicksGo = 0
      }

      this.spinner.hide('checkingSpinner');

    });
  }
  }

}
