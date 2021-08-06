import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientActivityTrackingService } from '../client-activity.service';
import { TrackingDetailsComponent } from './tracking-details/tracking-details.component';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnChanges {


  clients: any;
  tracks: any;
  clientsGo:any;
  tracksGo:any
  stats:any;
  @Input() days;
  buttonDisabled:any;
  clientsBefore:any;
  tracksBefore:any;

  constructor(private dialog: MatDialog, private service:ClientActivityTrackingService,  private spinner: NgxSpinnerService) {
    this.service.activityChangeAnnounced.subscribe(
      activity => {
       this.buttonDisabled = false;
      });

   }

  ngOnInit(): void {
    this.tracking();
  }

  ngOnChanges(changes: SimpleChanges) {
   
    this.tracking();
  }

  showDetails(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(TrackingDetailsComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px',
      data: {
        dataKey: {clientsNow: this.clients, clientsBefore:this.clientsBefore, clientsGo:this.clientsGo,
          tracksNow: this.tracks, tracksBefore:this.tracksBefore, tracksGo:this.tracksGo, days:this.days}
        } 
    });
  }
  setActivity(){
    this.service.announceActivity({activity:'tracking', days: this.days});
    this.buttonDisabled=true;
   }
  tracking(){
    if(this.days){
    this.spinner.show('trackingSpinner');
    // get how many days
    this.service.getClientsTracking(this.days).subscribe(stats=>{
      this.stats = stats;
     

      if(this.stats[0]){
        this.tracks = this.stats[0].clks;
      }

      if(this.stats[1]){
        this.clients = this.stats[1].clks;
      }
      if(this.stats[2]){
        this.tracksBefore = this.stats[2].clks;
      }
      if(this.stats[3]){
        this.clientsBefore = this.stats[3].clks;
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

      if(this.tracks  - this.tracksBefore > 0){
        this.tracksGo = 1
      }
      else if(this.tracks - this.tracksBefore < 0){
        this.tracksGo = -1
      }
      else{
        this.tracksGo = 0
      }

      this.spinner.hide('trackingSpinner');

    });
  
  }
  }

}
