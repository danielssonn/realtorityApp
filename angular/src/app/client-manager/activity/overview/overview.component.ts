import { CoolLocalStorage } from '@angular-cool/storage';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientActivityTrackingService } from '../client-activity.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  salesPersonId: any;
  dayList: any;
  segmentsList: any;

  days: any;
  segment: any;
  constructor(private session: CoolLocalStorage, private service: ClientActivityTrackingService, private spinner: NgxSpinnerService) {
    this.salesPersonId = this.session.getItem('salesPersonId');

  }


  breakpoint: any;
  ngOnInit() {
    this.spinner.show();
    this.breakpoint = (window.innerWidth <= 480) ? 2 : 4;
    this.service.getActivityDates().subscribe(
      activityDates => {
        this.dayList = activityDates;
       

        this.service.getClientSegments().subscribe(
          clientSegments => {
            this.segmentsList = clientSegments;
            let segmentFromSession = +this.session.getItem('segment');
            if(segmentFromSession){
              console.log('seg from sesh', this.session.getItem('segment') )
              this.segment = segmentFromSession;
            } else{
              this.segment = this.segmentsList[0].userSegmentId;
            }

            let daysFromSession = +this.session.getItem('days');
            if(daysFromSession){
              this.days = daysFromSession;
            } else{
              this.days = this.dayList[0].dateCount;
            }

            this.spinner.hide();
          }
        )
      }
    )
  }

  segmentOrDayChange(){

    this.service.announceActivity({activity:'segmentOrDayChange'});
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 2 : 4;
  }

}
