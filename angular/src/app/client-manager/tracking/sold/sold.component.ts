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

  clients:any;
  @Input() days:any;
  constructor(private dialog:MatDialog, private service: ClientActivityTrackingService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.sold();
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

  sold(){
    this.spinner.show();
    // get how many days
    this.service.getClientsSold(this.days).subscribe(clients=>{
      this.clients = clients;
      this.spinner.hide();

    });

  }

}
