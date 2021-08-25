import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'app/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MessageService } from 'app/message.service';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';



@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css'],

})

export class WeekComponent implements OnInit, AfterViewInit {

  day1: any;
  day2: any;
  day3: any;
  day4: any;
  day5: any;
  day6: any;
  day7: any;
  today: any;
  propertiesWeekly: any;
  propertiesCount: number;
  days = [];
  dayDates = []
  isAuth;
  properties: any;
  calendar = [];
  filteredFeed: any;
  filterControl = new FormControl();
  feedFilter: String;
  private subscription: Subscription;

  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewport: CdkVirtualScrollViewport;


  showDetail() {
    this.router.navigate(['details']);
  };

  startInterview() {
    this.router.navigate(['interview']);
  }

  constructor(private router: Router, public service: PropertiesService, private spinner: NgxSpinnerService,
    private translate: TranslateService, private userService: UserService, public snackBar: MatSnackBar, private messageService: MessageService) {
    this.isAuth = this.userService.isAuthenticated();
    this.service.getUserPreferences().subscribe();
    
    console.log('feed component constructed');
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if(message.text ==='updateFeed'){
        console.log('update feed received!')
        console.log(message);

        this.refresh();
      }

    });

  }



  addWeek() {

    if (!this.service.addWeek()) {
      this.translate.get('Maximum number of weeks reached').subscribe((res: string) => {
        this.snackBar.open(res, '', {
          duration: 2000,
        });
      });
    } else {
      this.refresh();
    }


  }

  setProperties(props) {

    if (!Array.isArray(props)) {
      return;
    }
    console.log('got props')
    this.filteredFeed = []
    this.properties = [];
    this.propertiesCount = 0;

    props.sort(function (a, b) {
      var c = new Date(a.added);
      var d = new Date(b.added);
      return +d - +c;
    })
    if (!props || !props[0]) {
      console.log('!got props')

      return;
    }

    this.calendar = [];
    props.forEach(property => {

      if (property.isIn) {
        this.propertiesCount++;
        const dateInMonth = moment(property.added).format('l');

        if (this.calendar.indexOf(dateInMonth) === -1) {
          this.calendar.push(dateInMonth)
          property.d = dateInMonth
        }
        this.properties.push(property)
      }


    });
    console.log(this.properties.length);
    this.propertiesCount = this.properties.length;
    this.filteredFeed = this.filterControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterFeed(value))
        );

  }

  displayDate(property) {

    const datePipe = new DatePipe(this.translate.currentLang);

    return datePipe.transform(property.added, 'EEE d/M');
  }


  private _filterFeed(value: string): string[] {
    console.log('filtering')
    const filterValue = value.toLowerCase();
    return this.properties.filter(option => {
        if(!option.addr){
          return true;
        }
       return option.addr.toLowerCase().includes(filterValue)
      });
  }

  ngOnInit() {
    this.spinner.show();
    this.service.weekly(false).subscribe(
      value => {
        this.setProperties(value);

        this.spinner.hide();
        this.translate.get('Weekly listings updated').subscribe((res: string) => {
          this.snackBar.open(res, '', {
            duration: 2000,
          });
        });
      }, err => { this.spinner.hide(); this.router.navigate(['ohoh']) });
  }

  ngOnDestroy(){
    console.log('week  destroy');
    this.subscription.unsubscribe();
  }

  refresh() {
    this.spinner.show();
    this.setProperties([]);
    this.service.weekly(true).subscribe(
      value => {

        this.setProperties(value)
        this.spinner.hide();
        this.translate.get('Weekly listings updated').subscribe((res: string) => {
          this.snackBar.open(res, '', {
            duration: 2000,
          });
        });
      });
  }

  
  ngAfterViewInit() {

    setTimeout(() => {
      this.viewport.scrollToIndex(this.service.getScrollPosition());
    });


  }

  scrolledTo(ev) {
    if (ev != 0) {
      this.service.setScrollPosition(ev);

    }
  }
}
