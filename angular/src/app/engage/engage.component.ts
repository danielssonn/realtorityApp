import { Component, OnInit } from '@angular/core';
import { EngageDataSource } from './engage.datasource';
import { EngageService } from './engage.service';
import { MatDialog } from '@angular/material';
import { CreateEngagementComponent } from './create-engagement/create-engagement.component';
import { Engagement } from './engagement';
import { SocialLinkComponent } from './social-link/social-link.component';
import { EmailListComponent } from './email-list/email-list.component';

@Component({
  selector: 'app-engage',
  templateUrl: './engage.component.html',
  styleUrls: ['./engage.component.css']
})
export class EngageComponent implements OnInit {
  
  dataSource: EngageDataSource;
  engagement: Engagement;


  displayedColumns = ['date', 'title', 'message', 'outcome'];


  constructor(private engageService: EngageService, public dialog: MatDialog) { 
    this.dataSource = new EngageDataSource(this.engageService);

  }

  ngOnInit() {
    this.engagement = {id:'0',title:'Tile',message:'Message', outcome:'123', type:'push', date:'today'};
  }

  addEngagement(){
    const dialogSpec = {
      height: '90vh',
      width: '90vw',
      data: {
        dataKey: this.engagement
      }
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(CreateEngagementComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {
       

      }
    });

  }
  socialLink(){
    const dialogSpec = {
      height: '90vh',
      width: '90vw',
      data: {
        dataKey: this.engagement
      }
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(SocialLinkComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {
       

      }
    });

  }

emailList(){
    const dialogSpec = {
      height: '90vh',
      width: '90vw',
      data: {
        dataKey: this.engagement
      }
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(EmailListComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {
       

      }
    });

  }
}
