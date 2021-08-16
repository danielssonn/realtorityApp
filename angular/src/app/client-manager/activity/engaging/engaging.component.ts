import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientActivityTrackingService } from '../client-activity.service';
import { EngagingDetailsComponent } from './engaging-details/engaging-details.component';

@Component({
  selector: 'app-engaging',
  templateUrl: './engaging.component.html',
  styleUrls: ['./engaging.component.css']
})
export class EngagingComponent implements OnInit, OnChanges {
  clients: any;
  clientsGo: any
  clientsBefore:any;
  @Input() days;
  @Input() segment = 0;
  buttonDisabled:any; 
  constructor(private dialog: MatDialog, private service: ClientActivityTrackingService, private spinner: NgxSpinnerService) {
    this.service.activityChangeAnnounced.subscribe(
      activity => {
        this.buttonDisabled = false;
      });

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.engaging();
  }
  setActivity() {
    this.service.announceActivity({ activity: 'engaging', days: this.days,segment: this.segment });
    this.buttonDisabled = true;
  }
  showDetails() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(EngagingDetailsComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px',
      data: {
        dataKey: {clientsNow: this.clients, clientsBefore:this.clientsBefore, clientsGo:this.clientsGo, days:this.days}
      }
    });
  }

  engaging() {
    if(this.days){
    this.spinner.show('engagingSpinner');
    // get how many days
    this.service.getClientsEngaging(this.days, this.segment).subscribe(stats => {
      
      this.clientsBefore = 0
      
      if (stats[0]) {
        this.clients = stats[0].clks;
 
      }
      if (stats[1]) {
        this.clientsBefore = stats[1].clks;
      
      }

      if (this.clients - this.clientsBefore > 0) {
        this.clientsGo = 1
      }
      else if (this.clients - this.clientsBefore < 0) {
        this.clientsGo = -1
      }
      else {
        this.clientsGo = 0
      }
     
      this.spinner.hide('engagingSpinner');

    });
  }
  }

}
