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

  clients:any;
  @Input() days;
  constructor(private dialog: MatDialog, private service:ClientActivityTrackingService,  private spinner: NgxSpinnerService) { }

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

  tracking(){
   
    this.spinner.show();
    // get how many days
    this.service.getClientsTracking(this.days).subscribe(clients=>{
      this.clients = clients;
      this.spinner.hide();

    });

  }

}
