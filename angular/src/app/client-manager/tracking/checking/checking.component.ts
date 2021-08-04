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
  @Input() days;
  constructor(private dialog: MatDialog, private service:ClientActivityTrackingService,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.checking();
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

  checking(){
   this.spinner.show();
    // get how many days
    this.service.getClientsClicking(this.days).subscribe(clients=>{
      this.clients = clients;
      this.spinner.hide();

    });

  }

}
