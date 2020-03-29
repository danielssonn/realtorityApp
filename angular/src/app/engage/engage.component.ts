import { Component, OnInit, ViewChild } from '@angular/core';
import { EngageDataSource } from './engage.datasource';
import { EngageService } from './engage.service';
import { MatDialog, MatPaginator } from '@angular/material';
import { CreateEngagementComponent } from './create-engagement/create-engagement.component';
import { Engagement } from './engagement';
import { SocialLinkComponent } from './social-link/social-link.component';
import { EmailListComponent } from './email-list/email-list.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-engage',
  templateUrl: './engage.component.html',
  styleUrls: ['./engage.component.css']
})
export class EngageComponent implements OnInit {

  dataSource: EngageDataSource;
  engagement: Engagement;

  @ViewChild(MatPaginator, { static: false }) engagementPaginator: MatPaginator;


  displayedColumns = ['date', 'title', 'message', 'outcome'];


  constructor(private engageService: EngageService, public dialog: MatDialog) {
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

  addEngagement() {
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
  socialLink() {
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

  emailList() {
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
