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
  clients:any;
  clientsGo:any
  @Input() days;
  constructor(private dialog:MatDialog, private service:ClientActivityTrackingService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges) {
   
    this.engaging();
  }

  showDetails(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(EngagingDetailsComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px'
    });
  }

  engaging(){
   
    this.spinner.show();
    // get how many days
    this.service.getClientsEngaging(this.days).subscribe(stats=>{
      
      let clientsBefore=0
      if(stats[0]){
        this.clients = stats[0].clks;
      }
      if(stats[1]){
        clientsBefore = stats[1].clks;
      }

      if(this.clients-clientsBefore> 0){
        this.clientsGo = 1
      }
      else if(this.clients-clientsBefore < 0){
        this.clientsGo = -1
      }
      else{
        this.clientsGo = 0
      }
      this.spinner.hide();

    });

  }

}
