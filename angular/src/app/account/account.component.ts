import { Component, OnInit, Input, NgZone, ApplicationModule } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
// import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
import { Router } from '@angular/router';
import { CoolLocalStorage } from '@angular-cool/storage';
import { PropertiesService } from '../properties.service';
import { DeviceService } from 'app/device.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from 'app/sidenav.service';
import { ClientManagerSearchService } from 'app/client-manager/client-manager-search/client-manager-search.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CoverageComponent } from './coverage/coverage.component';
import { WhySignonComponent } from './why-signon/why-signon.component';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  user: any;
  userName: String;
  salesPersonId: String;
  clients: any;
  loginOn = false;
  lang: any;
  isAppleDevice: boolean;


  // tslint:disable-next-line:max-line-length
  constructor(private translate: TranslateService, private spinner: NgxSpinnerService, public _zone: NgZone, private dvs: DeviceService, private formBuilder: FormBuilder, private router: Router, public service: UserService, private session: CoolLocalStorage, private propService: PropertiesService,
    private clientManagerSearchService: ClientManagerSearchService, private deviceService: DeviceService, private dialog: MatDialog) {
    this.user = this.service.isAuthenticated();
    this.userName = this.session.getItem('userName');
    this.salesPersonId = this.session.getItem('salesPersonId');

    this.dvs.platform.subscribe(val=> {
      if (val.platform == 'iOS') {
        this.isAppleDevice = true;
      }
    }
    )
    


    this.lang = this.translate.currentLang;
  }
  public logout() {
    this.service.logout();
    this.propService.clearCachedProperties();
    this.clientManagerSearchService.reset();
    this.service.setUser(null);
    if (this.dvs.getDevice() !== 'browser') {
      this.dvs.googlePlus.subscribe((gPlus) => {
        gPlus.logout();
      })
    }
    this.session.clear();
    this.user = false
  }
  public toggleLogin() {
    if (!this.loginOn) {
      this.loginOn = true;
    } else {
      this.loginOn = false;
    }
  }

  public signinWithApple() {

    if (this.dvs.getDevice() !== 'browser') {
      const that = this;
      this.dvs.signInWithApple.subscribe((apple) => {
        
        apple.signin(
          { requestedScopes: [0, 1] },
           (success) => {
            this.appleSuccess(success);
          },
          (err) => {
            alert("Please try again ...");

          })

      })

    }
    else { console.log('Sing in with Apple not supported in browser, yet') }
  }

  public signinWithGoogle() {

    const service = this.service;

    if (this.dvs.getDevice() !== 'browser') {
    
      this.dvs.googlePlus.subscribe((gPlus) => {
        gPlus.login(
          {
            // 'scopes': '... ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': '609504804574-g3m6tgt4d0kq91qd7mh869b4q9brt8k2.apps.googleusercontent.com',
            'offline': true
          },
          (success) => {
            service.oAuth(success).subscribe(
              value => {
                if (value) {

                  this.setSession(value, 'via Google Sign On');

                }
              }
            )
          },
          function (msg) {
            alert('Please try again. ' + msg);
          }
        )
      }

      );
    } else {
      console.log('Well, this is a browser ....')
      // const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

      // this.socialAuthService.signIn(socialPlatformProvider).then(
      //   (userData) => {
      //     // this will return user data from google. What you need is a user token which you will send it to the server
      //     console.log('!', userData);
      //     this.sendToRestApiMethod(userData);
      //   }
      // );
    }


  }
  public sendToRestApiMethod(profile: any) {
    this.spinner.show();
    this.service.oAuth(profile).subscribe(value => {
      if (value) {
        this.service.setUser(value);
        this.session.setItem('userName', value.email + ' Google Sign On');
        console.log('sp', value.salespersonId, (value.salespersonId))
        if (value.salespersonId) {

          this.session.setItem('salesPersonId', value.salespersonId);
        } else {
          this.session.setItem('salesPersonId', null);

        }

        this.clearPreferences();
        this.navigateOnPreferences();
      }
    })
  }

  public clearPreferences() {
    this.propService.clearCachedProperties();
    this.propService.clearUserPreferences();
  }
  public navigateOnPreferences() {
    console.log('navigate on prefs')
    this.propService.getUserPreferences().subscribe(val => {
      if (val.default) {
        this.router.navigate(['interview']);

      } else {
        this.router.navigate(['week']);
      }

    })
    this.spinner.hide();
  }

  public appleSuccess(value) {

   
      this.spinner.show();
      this.service.appleSignin(value).subscribe(value => {
        this.setSession(value, 'via Sign in with Apple')
        this.spinner.hide();
      })
    }
    




  public setSession(value, via) {
    const that = this;
    this.session.setItem('userName', value.email + ' '+via);
    this.session.setItem('salesPersonId', value.salespersonId);
    this.service.setUser(value);
    this.service.registerPushToken().subscribe();
    that._zone.run((() => {
      this.spinner.show();
      this.clientManagerSearchService.getActiveClient().subscribe();
      this.clearPreferences();
      this.navigateOnPreferences();

    }
    )
    )
  }

  ngOnInit() {

  }
  onSwipe(evt) {

    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    if (x === 'left') {
      console.log('swipe left')
    }
    if (x === 'right') {
      console.log('swipe left')
    }
  }

  radar() {
    this.router.navigate(['./radar']);
  }

  showWhere(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(CoverageComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px'
    });
  }

  showWhy(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(WhySignonComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px'
    });

  }
}
