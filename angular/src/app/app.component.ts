
import { mergeMap, map, filter } from 'rxjs/operators';
import { Component, ViewChild, NgZone, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSidenavModule, MatSidenav } from '@angular/material';
import { Location } from '@angular/common';



import { UserService } from './user.service';
import { MatDialog } from '@angular/material';


import { PropertiesService } from './properties.service';
import { HowtoComponent } from 'app/howto/howto.component';
import { StartComponent } from 'app/howto/start/start.component';
import { TodayComponent } from 'app/today/today.component';
import { WeekComponent } from 'app/week/week.component';
import { ImproveComponent } from 'app/howto/improve/improve.component';
import { CordovaService } from './cordova.service';
import { DeviceService } from './device.service';
import { ContactUsComponent } from 'app/contact-us/contact-us.component';
import { TranslateService } from '@ngx-translate/core';
import { LocationsComponent } from './onboarding/interview/locations/locations.component';
import { InterviewComponent } from './onboarding/interview/interview.component';
import { Subscription } from 'rxjs';
import { ClientManagerSearchService } from './client-manager/client-manager-search/client-manager-search.service';
import { CoolLocalStorage } from '@angular-cool/storage';
import { ConditionalExpr } from '@angular/compiler';
import { MessageService } from './message.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var device;
declare var AppRate: any;





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnInit {

  user: any;
  innerWidth: any;
  collapsed: any;
  collapsedClass;
  title: any;
  networkFail: boolean;
  isAuthenticated;
  onBehalf: any;
  clientManagerSubscription: Subscription;
  isSalesPerson: any;


  clack() {

    this.messageService.sendMessage('clack');
  }
  navigate = function () {
    this.networkFail = false;
    // this.sidenav.toggle();
    if (this.location.path().indexOf('/details/') > -1) {
      this.location.back();
    } else {


    }
  };

  startInterview = function () {
    this.router.navigate(['./interview']);
  };

  explore = function () {
    this.router.navigate(['./nearby']);
  }
  research = function () {

    this.router.navigate(['/research']);
  }

  showWeek = function () {
    this.service.setScrollPosition(0);
    this.service.clearCachedProperties();
    this.router.navigate(['./week']);
  };
  showToday = function () {
    this.service.setScrollPosition(0);
    this.service.clearCachedProperties();
    this.router.navigate(['./today']);
  };
  showFavorites = function () {
    this.service.setScrollPosition(0);
    this.service.clearCachedProperties();
    this.router.navigate(['./favorites']);
  };
  showTrash = function () {

    this.router.navigate(['./trashbin']);
  };
  account = function () {

    this.router.navigate(['./account']);
  };


  openDialog() {
    const dialogSpec = {
      height: '80vh',
      width: '80vw',
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(ContactUsComponent, dialogSpec);


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  constructor(private router: Router, private location: Location, private titleService: Title,
    private userService: UserService, private activatedRoute: ActivatedRoute, public dialog: MatDialog,
    private dvs: DeviceService, private zone: NgZone, private translate: TranslateService,
    private clientManagerSearchService: ClientManagerSearchService, private session: CoolLocalStorage,
    private messageService: MessageService, private spinner: NgxSpinnerService, private service: PropertiesService


  ) {
    this.collapsed = false;
    this.onBehalf = { userId: '-1' }
    this.userService.getUser().subscribe({
      next: (x) => {
        if (x) {

          this.isSalesPerson = x.salespersonId;
          console.log("SPPS", this.isSalesPerson)
        }

      }

    }
    )
    this.isSalesPerson = false;
    if (this.session.getItem('salesPersonId')) {
      this.isSalesPerson = true;
    }
    this.user = this.userService.isAuthenticated();
    console.log(this.user)
    console.log("SPP", this.isSalesPerson)
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en_CA')
    this.translate.use('en_CA');


    this.clientManagerSearchService.setup();



    this.clientManagerSubscription = this.clientManagerSearchService.clientManagerBuilder().subscribe(
      {
        next: (x) => { this.onBehalf = x.client; this.isSalesPerson = true; console.log('clientManagerSubscription fired', x) },
        error: (x) => { console.log('erroorz', x) }
      }
    );


    if (navigator.language === 'ko_KR') {
      this.translate.use(navigator.language);
      this.dvs.setLanguage(navigator.language);
    }

    this.dvs.googlePlus.subscribe(gPlus => console.log('GPLUS', gPlus));

    this.dvs.globalization.subscribe(glob => {

      AppRate.preferences = {
        displayAppName: 'HelloMyHouse',
        usesUntilPrompt: 3,
        promptAgainForEachNewVersion: false,
        inAppReview: true,
        storeAppURL: {
          ios: '1403146194',
          android: 'market://details?id=com.exevu.Concierge',
        },
        customLocale: {
          title: 'Would you mind rating %@?',
          message: 'Thank you for your support, we appreciate it !',
          cancelButtonLabel: 'No, Thanks',
          laterButtonLabel: 'Remind Me Later',
          rateButtonLabel: 'Rate It Now',
          yesButtonLabel: 'Yes!',
          noButtonLabel: 'Not really',
          appRatePromptTitle: 'Do you like using %@?',
          feedbackPromptTitle: 'Mind giving us some feedback?',
        },
        callbacks: {
          handleNegativeFeedback: function () {
            window.open('mailto:sayhi@hellomyhouse.com', '_system');
          },
          onRateDialogShow: function (callback) {
            callback(1) // cause immediate click on 'Rate Now' button
          },
          onButtonClicked: function (buttonIndex) {
            console.log('onButtonClicked -> ' + buttonIndex);
          }
        }
      };

      if (glob.language === 'ko-KR' || glob.language === 'ko_KR') {
        this.translate.use('ko_KR');
        AppRate.preferences.useLanguage = 'ko';
        this.dvs.setLanguage('ko_KR');
      } else {
        this.translate.use('en_CA');
        AppRate.preferences.useLanguage = 'en';
      }
      AppRate.promptForRating(false);
    });


    this.dvs.firebase.subscribe(firebase => {

      firebase.grantPermission();

      firebase.hasPermission(function (hasPermission) {
        console.log("Permission is " + (hasPermission ? "granted" : "denied"));
        if (hasPermission === "NO") {
          firebase.grantPermission().then(function () {
            console.log("Push messaging is allowed");
            firebase.getToken(
              tkn => { console.log("FCM Token", tkn); this.userService.registerPushToken(tkn).subscribe() },
              err => { console.log("Get Token error", err) }
            )
          });
        } else {

          console.log("Push messaging is allowed");
          firebase.getToken(
            tkn => { console.log("FCM Token", tkn); this.userService.registerPushToken(tkn).subscribe() },
            err => { console.log("Get Token error", err) }
          )
        }

      });



      firebase.getToken(
        tkn => { console.log("FCM Token", tkn); this.userService.registerPushToken(tkn).subscribe() },
        err => { console.log("Get Token error", err) }
      )

      firebase.onTokenRefresh(tkn => this.userService.registerPushToken(tkn).subscribe());

      firebase.onMessageReceived(msg => this.zone.run(() => {

        
        
        if (msg.key){
          if (msg.key =="feedUpdated"){
          this.showWeek();
          } 
          else if (msg.key =="favouritesUpdated"){
            this.showFavorites();
          } 
          else if (msg.key =="showNearby"){
            this.showNearby();
          } 
          else{
            this.showFavorites();
          }
        }else {
          this.showFavorites()
        }
          
      }))
      firebase.onBackgroundMessage(msg => this.zone.run(() => this.showFavorites()))
    });

    this.dvs.networkOffline.subscribe(netw => this.networkFail = true)

    this.dvs.platform.subscribe(devic => {
      dvs.setDevice(devic);

    })

    this.dvs.networkOnline.subscribe(netw => this.networkFail = false)


    this.router.events.pipe(filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data))
      .subscribe((event) => {
        if (event['title'] === 'Today') {
          // tslint:disable-next-line:quotemark
          this.translate.get('New Listings Today').subscribe((res: string) => {
            this.title = res;
          });
        } else if (event['title'] === 'Week') {
          this.translate.get('New Listings Week').subscribe((res: string) => {
            this.title = res;
          });
        } else { this.title = event['title'] }

      });


    this.innerWidth = (window.screen.width) + 'px';

    if (innerWidth > 414) {
      this.collapsed = false;
    } else {
      this.collapsed = true;
    }
  }
  ngOnInit(): void {
  }
  onSwipe(evt) {

    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    if (x === 'left') {
      console.log('swipe left')
    }

  }
  manage() {
    this.router.navigate(['./manage']);
  }
  radar() {
    this.router.navigate(['./radar']);
  }

  onClack() {
    console.log('Clacked through');
  }
  showSearch() {
    this.router.navigate(['./gallery']);
  }
  showNearby() {
    this.router.navigate(['./nearby']);
  }

}

