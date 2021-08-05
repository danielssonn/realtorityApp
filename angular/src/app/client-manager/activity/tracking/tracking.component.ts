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
  @Input() days;
  constructor(private dialog: MatDialog, private service:ClientActivityTrackingService,  private spinner: NgxSpinnerService) {
    this.service.activityChangeAnnounced.subscribe(
      activity => {
       console.log('Copy activity from Tracking ', activity)
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
      minWidth: '375px'
    });
  }
  setActivity(){
    this.service.announceActivity({activity:'tracking', days: this.days});
   }
  tracking(){
   
    this.spinner.show('trackingSpinner');
    // get how many days
    this.service.getClientsTracking(this.days).subscribe(stats=>{
      let clientsBefore;
      let tracksBefore

      if(stats[0]){
        this.tracks = stats[0].clks;
      }

      if(stats[1]){
        this.clients = stats[1].clks;
      }
      if(stats[2]){
        tracksBefore = stats[2].clks;
      }
      if(stats[3]){
        clientsBefore = stats[3].clks;
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

      if(this.tracks  - tracksBefore > 0){
        this.tracksGo = 1
      }
      else if(this.tracks - tracksBefore < 0){
        this.tracksGo = -1
      }
      else{
        this.tracksGo = 0
      }

      this.spinner.hide('trackingSpinner');

    });
  

  }

}
