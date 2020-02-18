import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DOCUMENT, CurrencyPipe, LOCATION_INITIALIZED } from '@angular/common';

import { Injector, APP_INITIALIZER } from '@angular/core';

import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { registerLocaleData } from '@angular/common';
import localeKo from '@angular/common/locales/ko';

registerLocaleData(localeKo);


import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyHttpInterceptor } from './my-http-interceptor';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

import { MatButtonModule, MatDialogModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatExpansionModule,} from '@angular/material';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/_dev/packages/core';
// import {AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/dummy/packages/core';
import { AgmJsMarkerClustererModule } from '@agm/_dev/packages/js-marker-clusterer';
import { CoolStorageModule } from '@angular-cool/storage';


import { MatListModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';


// tslint:disable-next-line:max-line-length
import { MatButtonToggleModule, MatSnackBarModule, MatAutocompleteModule, MatSliderModule, MatSlideToggleModule, MatCardModule, MatIconModule, MatCheckboxModule, MatRadioModule, MatTooltipModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';


import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppComponent } from './app.component';
import 'hammerjs';
import { InterviewComponent } from './onboarding/interview/interview.component';
import { LocationComponent } from './onboarding/interview/location/location.component';
import { PriceComponent } from './onboarding/interview/price/price.component';
import { PropertyTypeComponent } from './onboarding/interview/property-type/property-type.component';
import { PropertySizeComponent } from './onboarding/interview/property-size/property-size.component';
import { BedroomsComponent } from './onboarding/interview/bedrooms/bedrooms.component';
import { BathroomsComponent } from './onboarding/interview/bathrooms/bathrooms.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { TodayComponent } from './today/today.component';
import { WeekComponent } from './week/week.component';
import { AccountComponent } from './account/account.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { ShortCurrencyPipe } from './short-currency.pipe';
import { PropertiesService } from './properties.service';
import { UserService } from './user.service';
import { LocationsComponent } from './onboarding/interview/locations/locations.component';
import { MapComponent } from './map/map.component';
import { ContentComponent } from './map/content/content.component';
import { HowtoComponent } from './howto/howto.component';
import { StartComponent } from './howto/start/start.component';
import { ImproveComponent } from './howto/improve/improve.component';
import { TrashbinComponent } from './trashbin/trashbin.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NeighbourhoodsComponent } from './neighbourhoods/neighbourhoods.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { OhOhComponent } from './oh-oh/oh-oh.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShortTextPipe } from './short-text.pipe';
import { SignupComponent } from './signup/signup.component';
import { AccoutSimpleComponent } from './accout-simple/accout-simple.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ParkingComponent } from './onboarding/interview/parking/parking.component';
import { LicenseComponent } from './license/license.component';
import { MortgageCalculatorComponent } from './mortgage-calculator/mortgage-calculator.component';
import { NouisliderModule } from 'ng2-nouislider';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { ShowingDefaultsComponent } from './showing-defaults/showing-defaults.component';
import { HtmlSanitizerPipe } from './html-sanitizer-pipe.pipe';
import { SchoolBoundsComponent } from './schools/schools.component';
import { SchoolsComponent } from './onboarding/interview/schools/schools.component';
import { ClientManagerComponent } from './client-manager/client-manager.component';
import { ClientManagerDetailsComponent } from './client-manager/client-manager-details/client-manager-details.component';
import { ClientManagerRecommendComponent } from './client-manager/client-manager-recommend/client-manager-recommend.component';
import { ClientManagerSearchComponent } from './client-manager/client-manager-search/client-manager-search.component';
import { TAB_ID } from 'app/client-manager/client-manager-recommend/tab-id.injector';
import { MapRadarComponent } from './map-radar/map-radar.component';
import { ClientOverviewComponent } from './client-manager/client-overview/client-overview.component';
import { JustTextAdComponent } from './marketing/just-text-ad/just-text-ad.component';
import { AdWithMapComponent } from './marketing/ad-with-map/ad-with-map.component';
import { MarketingComponent } from './marketing/marketing.component';
import { MarketingDirective } from './marketing/marketing.directive';
import { SearchPreferenceOverviewComponent } from './onboarding/search-preference-overview/search-preference-overview.component';
import { GalleryComponent,  } from './gallery/gallery.component'
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EngageComponent } from './engage/engage.component';
import { CreateEngagementComponent } from './engage/create-engagement/create-engagement.component';
import { SocialLinkComponent } from './engage/social-link/social-link.component';
import { EmailListComponent } from './engage/email-list/email-list.component';






export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

    locationInitialized.then(() => {
      const languages = ['ko_KR', 'en_CA'];

      languages.forEach(langToSet => {
        translate.use(langToSet).subscribe(() => {
          console.log(`Successfully initialized '${langToSet}' language.'`);
        }, err => {
          console.log(`Problem with '${langToSet}' language initialization.'`);
        }, () => {
          resolve(null);
        });
        translate.setDefaultLang('en_CA')
      })
    });
  });
}


export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });

    return mc;
  }
}
export const routerConfig: Routes = [
  {

    path: 'interview',
    component: InterviewComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'location', pathMatch: 'full' },
      { path: 'location', component: LocationsComponent, data: { title: 'Location' }, },
      { path: 'price', component: PriceComponent, data: { title: 'Price' }, },
      { path: 'parking', component: ParkingComponent, data: { title: 'Parking' }, },
      { path: 'size', component: PropertySizeComponent, data: { title: 'Size' }, },
      { path: 'type', component: PropertyTypeComponent, data: { title: 'Type' }, },
      { path: 'beds', component: BedroomsComponent, data: { title: 'Bedrooms' }, },
      { path: 'schools', component: SchoolsComponent, data: { title: 'Schools' }, },

      {
        path: 'baths', component: BathroomsComponent, data: { title: 'Bathrooms' },
      },
      // { path: 'specs', component: Specs }
    ]
  },
  {
    path: 'manage',
    component: ClientManagerComponent,
    canActivate: [AuthGuard],
    data: { title: 'Manage' }
  },
  {
    path: 'radar',
    component: MapRadarComponent,
    canActivate: [AuthGuard],
    data: { title: 'Radar' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Register' }
  },
  {
    path: 'schools',
    component: SchoolBoundsComponent,
    data: { title: 'Schools' }
  },
  {
    path: 'ohoh',
    component: OhOhComponent,
    data: { title: 'Oh!' }
  },
  {
    path: 'today',
    component: TodayComponent,
 //   canActivate: [AuthGuard],
    data: { title: 'Today' }
  },
  {
    path: 'week',
    component: WeekComponent,
//    canActivate: [AuthGuard],
    data: { title: 'Week' }
  },
  {
    path: 'details/:ml_num',
    component: PropertyDetailComponent,
  //  canActivate: [AuthGuard],
    pathMatch: 'full',
    data: { title: 'Details' }
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    // canActivate: [AuthGuard],
    data: { title: 'Favourites' }
  },
  {
    path: 'trashbin',
    component: TrashbinComponent,
    // canActivate: [AuthGuard],
    data: { title: 'Trashbin' }
  },
  {
    path: 'hoods',
    component: NeighbourhoodsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Hoodz' }
  },
  {
    path: '',
    component: WeekComponent,
    canActivate: [AuthGuard],
    data: { title: 'Week' }
  },
  {
    path: 'research',
    component: MapComponent,
    canActivate: [AuthGuard],
    data: { title: 'reSearch' }
  },
  {
    path: 'engage',
    component: EngageComponent,
    canActivate: [AuthGuard],
    data: { title: 'engage!' }
  },
  {
    path: 'account',
    component: AccountComponent,
    data: { title: 'Join' }
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { title: 'Gallery' }
  },
  {
    path: 'accountSimple',
    component: AccoutSimpleComponent,
    data: { title: 'Success! Please Login ...' }
  },
  {
    path: 'howto',
    component: HowtoComponent,
    data: { title: 'How This Works' }
  },
  {
    path: 'contactUs',
    component: ContactUsComponent,
    data: { title: 'Contact Us' }
  },
  {
    path: 'mortgage',
    component: MortgageCalculatorComponent,
    data: { title: 'Mortgage Calculator' }
  }
  ,
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot' }
  },
  {
    path: 'license',
    component: LicenseComponent,
    data: { title: 'License' }
  }



]

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    InterviewComponent,
    LocationComponent,
    PriceComponent,
    PropertyTypeComponent,
    PropertySizeComponent,
    BedroomsComponent,
    BathroomsComponent,
    PropertyDetailComponent,
    FavoritesComponent,
    TodayComponent,
    WeekComponent,
    MapComponent,
    AccountComponent,
    PropertyCardComponent,
    ShortCurrencyPipe,
    LocationsComponent,
    MapComponent,
    ContentComponent,
    HowtoComponent,
    StartComponent,
    ImproveComponent,
    TrashbinComponent,
    NeighbourhoodsComponent,
    OhOhComponent,
    ShortTextPipe,
    SignupComponent,
    AccoutSimpleComponent,
    ContactUsComponent,
    ForgotPasswordComponent,
    ParkingComponent,
    LicenseComponent,
    MortgageCalculatorComponent,
    ShowingDefaultsComponent,
    HtmlSanitizerPipe,
    SchoolsComponent,
    SchoolBoundsComponent,
    ClientManagerComponent,
    ClientManagerDetailsComponent,
    ClientManagerRecommendComponent,
    ClientManagerSearchComponent,
    MapRadarComponent,
    ClientOverviewComponent,
    JustTextAdComponent,
    AdWithMapComponent,
    MarketingComponent,
    MarketingDirective,
    SearchPreferenceOverviewComponent,
    GalleryComponent,
    EngageComponent,
    CreateEngagementComponent,
    SocialLinkComponent,
    EmailListComponent
    

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'exeyo' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(routerConfig, {
      scrollPositionRestoration: 'enabled',

    }),
    CoolStorageModule,
    MatSliderModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatMenuModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmJsMarkerClustererModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    }}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyACemDlXE6JrEJnBsdZ-KeixHuBOGtpdIg',
      libraries: ['places']
    }),
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgxSpinnerModule,
    NouisliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule, 
    ScrollingModule,
    AngularEditorModule,
    MatExpansionModule

  ],
  providers: [
    { provide: 'windowObject', useValue: window },
   
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializerFactory,
    //   deps: [TranslateService, Injector],
    //   multi: true
    // },
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      }
    }, 
   
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    PropertiesService,
    UserService,
    GoogleMapsAPIWrapper,
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    MatDatepickerModule



  ],
  entryComponents: [
    HowtoComponent,
    StartComponent,
    ImproveComponent,
    ClientManagerDetailsComponent,
    ClientOverviewComponent,
    JustTextAdComponent,
    AdWithMapComponent,
    CreateEngagementComponent,
    EmailListComponent,
    SocialLinkComponent
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
