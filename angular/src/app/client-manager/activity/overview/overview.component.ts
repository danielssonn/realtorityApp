import { CoolLocalStorage } from '@angular-cool/storage';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientActivityTrackingService } from '../client-activity.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, AfterViewInit {
  salesPersonId: any;
  dayList: any;
  segmentsList: any;

  days: any;
  segment: any;
  constructor(private session: CoolLocalStorage, private service: ClientActivityTrackingService, private spinner: NgxSpinnerService) {
    this.salesPersonId = this.session.getItem('salesPersonId');

  }
  ngAfterViewInit(): void {

  }

  breakpoint: any;
  ngOnInit() {
    this.spinner.show();
    this.breakpoint = (window.innerWidth <= 480) ? 2 : 4;
    this.service.getActivityDates().subscribe(
      activityDates => {
        this.dayList = activityDates;
        this.days = this.dayList[0].dateCount;

        this.service.getClientSegments().subscribe(
          clientSegments => {
            this.segmentsList = clientSegments;
            console.log('selected segement', this.segmentsList[0].userSegementID)
            this.segment = this.segmentsList[0].userSegementID;
            this.spinner.hide();
          }
        )
      }
    )
  }


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 2 : 4;
  }

}
