
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { Location, ViewportScroller } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Image } from '../image';
import { PropertiesService } from '../properties.service';
import { UserService } from 'app/user.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceService } from 'app/device.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlPosition } from '@agm/core'
import { Subscription } from 'rxjs';
import { ClientManagerSearchService } from 'app/client-manager/client-manager-search/client-manager-search.service';

declare var sms: any;

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css'],

})

export class PropertyDetailComponent implements OnInit {

    property: any;
    images: Image[];
    lat: number
    lon: number;
    zoom: any;
    polygons: any;
    developments: any;
    permits: any;
    showHeat = false;
    showBuild = false;
    showPermits = false;
    @Input() userComment;
    shallComment: boolean;
    emailSubjectOffMarket: string;
    emailSubjectRegular: string;
    since: String;
    getTracked: String;
    device: String;
    marketingMessageSafe: any;
    schools: any;
    onBehalf: any;
    clientManagerSubscription: Subscription;


    fullscreenControlOptions: {
        position: ControlPosition.TOP_CENTER
    }


    mapStyle =
        [
            {
                'featureType': 'administrative.land_parcel',
                'elementType': 'labels',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'landscape',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#fffcf4'
                    }
                ]
            },
            {
                'featureType': 'landscape.man_made',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'landscape.natural',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#fffcf4'
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'poi.business',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#b6f3bf'
                    }
                ]
            },
            {
                'featureType': 'poi.park',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#b6f3bf'
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffb1a6'
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'color': '#b6f3bf'
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'color': '#424242'
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#fffb9e'
                    },
                    {
                        'visibility': 'on'
                    },
                    {
                        'weight': 3
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffb8a3'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'labels',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'transit.station.bus',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'transit.station.rail',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffeb3b'
                    },
                    {
                        'visibility': 'simplified'
                    },
                    {
                        'weight': 1
                    }
                ]
            },
            {
                'featureType': 'transit.station.rail',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'transit.station.rail',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'visibility': 'on'
                    }
                ]
            }
        ]
    preferences: any;

    // tslint:disable-next-line:max-line-length
    constructor(public snackBar: MatSnackBar, private translate: TranslateService, private location: Location,
        private route: ActivatedRoute, private router: Router, private service: PropertiesService,
        private viewportScroller: ViewportScroller, private userService: UserService,
        private deviceService: DeviceService, private domSanitizer: DomSanitizer,
        @Optional() private dialogRef: MatDialogRef<PropertyDetailComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogProperty: any,
        private clientManagerSearchService: ClientManagerSearchService) {

        // listing passed in from a dialog    
        if (this.dialogProperty) {
            this.preferences = {};
            this.setProperty(this.dialogProperty.listing);
        } else {
            // listing retrieved from route
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) =>
                    this.service.details(params.get('ml_num'))))
                .subscribe(value => this.setProperty(value));
        }

        this.device = this.deviceService.getDevice();
        
        this.service.getUserPreferences().subscribe(
            value => {
                this.preferences = value;

            }

        );

        this.clientManagerSearchService.getActiveClient().subscribe(
            val =>{ 
                this.onBehalf = val 
            }
        );

        this.clientManagerSubscription = this.clientManagerSearchService.clientManagerBuilder().subscribe(
            {
                next: (x) => { this.onBehalf = x.client },
                error: (x) => { console.log('erroorz', x) }
            }
        );




    }

    onMapReady(map) {
        map.setOptions({
            fullscreenControl: 'true',
            fullscreenControlOptions: {
                position: ControlPosition.TOP_LEFT
            }
        });
    }
    ngOnInit() {
    }

    heatChange(event) {
        let propertyType = 'rateAll'

        if (this.property.type_own1_out.indexOf('Condo') > 0) {
            propertyType = 'rateCondo'
        }
        if (this.property.type_own1_out.indexOf('Semi') > 0) {
            propertyType = 'rateSemi'
        }
        if (this.property.type_own1_out.indexOf('Att') > 0) {
            propertyType = 'rateRowhouse'
        }
        if (this.property.type_own1_out.indexOf('Detached') > 0) {
            propertyType = 'rateDetached'
        }

        if (this.showHeat) {
            this.polygons = [];
            this.showHeat = false
        } else {
            this.showHeat = true;
            this.service.communities().subscribe(
                response => {
                    this.polygons = response.value
                    this.service.setHeat(propertyType)
                }
            )
        }
    }
    buildChange(event) {
        if (this.showBuild) {
            this.showBuild = false
            this.developments = [];
        } else {
            this.showBuild = true;
            this.service.developments().subscribe(
                response => {
                    this.developments = response;
                }
            )

        }
    }
    permitsChange(event) {
        if (this.showPermits) {
            this.showPermits = false
            this.permits = [];
        } else {
            this.showPermits = true;
            this.service.permits().subscribe(
                response => {
                    this.permits = response;
                }
            )
        }
    }
    getInnerHTMLValue() {
        return this.domSanitizer.bypassSecurityTrustHtml(this.property.longMessage);
    }

    getSchoolLabel(schoolType) {
        if (schoolType === 'E') {

            return 'Elem.'
        }
        if (schoolType === 'S') {
            return 'Sec.'
        }

    }
    setProperty(property) {

        if (!property) {
            this.router.navigate(['/']);
            return;
        }
        if (property.marketingMessage) {
            this.property = property;
            // tslint:disable-next-line:max-line-length
            this.emailSubjectRegular = 'mailto:jina@hellomyhouse.com?subject=Hello!&body= ... ';

            return;
        }
        // this.property = property[0];
        this.property = property;
        this.images = []
        if (property.schools && !Array.isArray(property.schools)) {
            this.schools = [];
            property.schools.split(':').forEach(school => {
                const s = school.split(',')
                if (s[0].length > 0) {
                    this.schools.push({ name: s[0], type: s[1] });
                }
            });
        } else {
            this.schools = property.schools
        }


        // tslint:disable-next-line:max-line-length
        this.emailSubjectOffMarket = 'mailto:jina@hellomyhouse.com?subject=Re:' + property.ml_num + '&body=Hello! What happened to this listing? Has it sold? Please let me know!';
        // tslint:disable-next-line:max-line-length
        this.emailSubjectRegular = 'mailto:jina@hellomyhouse.com?subject=Re:' + property.ml_num + '&body=Hello! Could you send me more info on this property?';

        this.lat = +this.property.geo.split(',')[0];
        this.lon = +this.property.geo.split(',')[1];
        this.since = moment(property.added).format('LLLL');
        this.zoom = 16;
        this.userComment = this.property.userComment;

        let i: number;
        for (i = 1; i <= this.property.numberOfPics; i++) {
            this.images.push({
                title: i + ' of ' + (this.property.numberOfPics + 1),
                url: 'https://s3.amazonaws.com/mlspicz/' + this.property.ml_num + '-' + (i)
            })
        }
        if (this.userService.isAuthenticated()) {
            this.service.read(property);
        }

        if (this.property.star !== 'Y') {
            this.translate.get('Track It').subscribe((res: string) => {
                this.getTracked = res;
            });
        } else {
            this.translate.get('Added to favs').subscribe((res: string) => {
                this.getTracked = res;
            });
        }
        const element = document.getElementById('topp');
        this.viewportScroller.scrollToPosition([0, 0]);
        // element.scrollIntoView({ behavior: 'auto' });




    }

    imageError($event) {
        $event.target.src = 'assets/coming.png';
    }

    onSwipe(evt) {

        if (this.dialogRef) {
            this.dialogRef.close();
        } else {
            const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
            const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
            if (x === 'right') {
                this.location.back();
            }
        }


    }
    remove(property) {
        this.service.remove(property)
        this.translate.get('Track It').subscribe((res: string) => {
            this.getTracked = res;
        });
        this.translate.get('Removed from Favourites').subscribe((res: string) => {
            this.snackBar.open(res + '...', '', {
                duration: 2000,
            });
        });
    }

    like(property) {


        if (this.shallComment) {
            this.property.userComment = this.userComment;
        }


        if (this.onBehalf.userId === '-1') {
            this.service.like(property, 0);
        } else {
            this.service.like(property, 1);
        }


        this.translate.get('Added to favs').subscribe((res: string) => {
            this.getTracked = res;
            this.snackBar.open(res, '', {
                duration: 4000,
            });
        });

    }

    addComment(property, comment) {
        this.service.addComment(property, comment).subscribe(
            response => {
                console.log('comment response', response)
                if (response.status === 200) {
                    this.shallComment = false;
                }
            }
        );

    }
    commentEdit() {
        this.shallComment = true;
    }
    getPropertyIcon(property) {
        if(property.sp_dol){
            return 'assets/sold.png'
        }
        if (property.marketingMessage) {
            return 'assets/info.svg'
        }
        return 'https://s3.amazonaws.com/mlspicz/' + this.property.ml_num + '-1'
    }


    getMessagePhoneNumberAndSend(property) {
        let phoneNumber = '4162702726';
       
        const cm = this.clientManagerSearchService.getCurrentClientManager();
        if (cm.client && cm.client.userId !== '-1') {
            phoneNumber = cm.client.phone;
            if (phoneNumber) {
                this.sendSms(property, phoneNumber);
            } else {
                // alert('We do not have a phone number for ' + cm.client.name)
            }  

        } else {
            this.clientManagerSearchService.getActiveSalesperson().subscribe(
                res => {
                    if (res) {
                        console.log('should message agent', res.phone);
                        phoneNumber = res.phone;
                        if (!phoneNumber) {
                            alert('We do not have a phone number for your agent ' + cm.agent.name)
                        }
                    }
                    this.sendSms(property, phoneNumber)
                }
            )
        }
    }
    sendSms(property, phoneNumber) {

        console.log('sending to', phoneNumber)

        this.translate.get('Composing message').subscribe((res: string) => {
            this.snackBar.open(res, phoneNumber, {
                duration: 2000,
            });
        });
        // CONFIGURATION
        const options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                // intent: '' // send SMS without open any other app
            }
        };

        const success = function () {

        };
        const error = function (e) {

        };

        this.translate.get('SMS greet').subscribe((greet: string) => {
            this.translate.get('SMS schedule').subscribe((scheduleVisit: string) => {
                if (!property.marketingMessage) {
                    // tslint:disable-next-line:max-line-length
                    sms.send(phoneNumber, greet + property.addr + ' (' + property.ml_num + ')' + scheduleVisit, options, success, error);
                } else {
                    sms.send(phoneNumber, '...', options, success, error);

                }
            })
        })






    }


 
}
