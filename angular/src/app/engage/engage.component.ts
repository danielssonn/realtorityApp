import { Component, OnInit, ViewChild } from '@angular/core';
import { EngageDataSource } from './engage.datasource';
import { EngagementService } from './engage.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { CreateEngagementComponent } from './create-engagement/create-engagement.component';
import { SocialLinkComponent } from './engagement-channel/engagement-channel.component';
import { EmailListComponent } from './email-list/email-list.component';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { EngagementDetailsComponent } from './engagement-details/engagement-details.component';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';


@Component({
  selector: 'app-engage',
  templateUrl: './engage.component.html',
  styleUrls: ['./engage.component.css']
})
export class EngageComponent implements OnInit {

  dataSource: EngageDataSource;

  @ViewChild(MatPaginator, { static: false }) engagementPaginator: MatPaginator;


  displayedColumns = ['date', 'comment','title', 'message', 'recurrenceTitle','id'];



  constructor(private engageService: EngagementService, public dialog: MatDialog, private sanitize: DomSanitizer) {
    this.dataSource = new EngageDataSource(this.engageService);


  }

  ngOnInit() {
    this.dataSource.loadEngagements("", "");
  }

  ngAfterViewInit() {

    this.engagementPaginator.page
      .pipe(
        tap(() => this.dataSource.loadEngagements("", "", "", this.engagementPaginator.pageIndex, this.engagementPaginator.pageSize)
        )
      ).subscribe()
  }

  getHTMLValue(val) {
    return this.sanitize.bypassSecurityTrustHtml(val);
  }

  addEngagement() {
    const dialogSpec = {
      height: '90vh',
      width: '90vw',
      
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(CreateEngagementComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {

        this.dataSource.loadEngagements("", "", "", this.engagementPaginator.pageIndex, this.engagementPaginator.pageSize);


      }
    });

  }

  removeEngagement(engagement){
    this.engageService.removeEngagement(engagement.id).subscribe(
      val => this.dataSource.loadEngagements("", "")
    )
  
  }

  socialLink() {
    const dialogSpec = {
      height: '90vh',
      width: '90vw',
     
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(SocialLinkComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {


      }
    });

  }

  emailList() {
    const dialogSpec = {
      height: '90vh',
      width: '90vw',
     
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(EmailListComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {


      }
    });

  }

  showMessage(engagement){
    const dialogSpec = {
      height: '90vh',
      width: '90vw',
      data: engagement
     
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(EngagementDetailsComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {


      }
    });
  }
}
