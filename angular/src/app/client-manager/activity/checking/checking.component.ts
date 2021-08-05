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
  @Input() days;
  activity:any;

  constructor(private dialog: MatDialog, private service:ClientActivityTrackingService,  private spinner: NgxSpinnerService) { 

    this.service.activityChangeAnnounced.subscribe(
      activity => {
       console.log('Copy activity from Checking ', activity)
      });

  }

  ngOnInit(): void {
    this.spinner.show('checkingSpinner');
    
  }
  ngOnChanges(changes: SimpleChanges) {
    this.checking();
  }

  showDetails(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(CheckingDetailsComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px'
    });
  }
  setActivity(){
   this.service.announceActivity({activity:'checking', days: this.days});
  }
  checking(){
    this.spinner.show('checkingSpinner');
    // get how many days
    this.service.getClientsClicking(this.days).subscribe(stats=>{
      
      let clientsBefore;
      let clicksBefore

      if(stats[0]){
        this.clients = stats[0].clks;
      }

      if(stats[1]){
        this.clicks = stats[1].clks;
      }
      if(stats[2]){
        clientsBefore = stats[2].clks;
      }
      if(stats[3]){
        clicksBefore = stats[3].clks;
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

      if(this.clicks  - clicksBefore > 0){
        this.clicksGo = 1
      }
      else if(this.clicks - clicksBefore < 0){
        this.clicksGo = -1
      }
      else{
        this.clicksGo = 0
      }

      this.spinner.hide('checkingSpinner');

    });

  }

}
