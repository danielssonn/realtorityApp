import { ElementRef, Component, NgZone, OnInit, ViewChild, EventEmitter, Output, Input, SimpleChange, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AgmMap, LatLngBounds, LatLngBoundsLiteral, AgmPolygon, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/_dev/packages/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


import { PropertiesService } from '../../../properties.service';
import * as jsts from 'jsts/dist/jsts.js';
import { LocationsComponent } from '../locations/locations.component';
import { UserService } from 'app/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValueTransformer } from '@angular/compiler/src/util';


declare var jsts: any;
declare var Wkt: any;
declare var WktGMap: any;
declare var google: any;



@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css'],
})


export class LocationComponent implements OnInit {
    _ref: any;
    @ViewChild(AgmMap,  {static:false}) public map: any;
    @ViewChild(AgmPolygon,  {static:false}) public polygon: any;

    heatPolygons: any;
    geoJson: any;


    @Output() locationAdded = new EventEmitter(true);
    @Output() mapRemoved = new EventEmitter(true);
    @Output() polyRemoved = new EventEmitter(true);
    @Output() polyMoved = new EventEmitter(true);
    @Output() polyMoveStart = new EventEmitter(true);
    @Output() menuClack = new EventEmitter<boolean>();
    @Output() saveMaps = new EventEmitter<boolean>();



    edit = false;
    searchforlocation: String;



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

    @Input() poly;
    @ViewChild('search',  {static:false})
    public searchElementRef: ElementRef;


    @Input() lat: number;
    @Input() lon: number;
    @Input() zoom: number;

    minZoom: number;

    maxZoom: number;
    showMap: boolean;
    switchZoom = 16;
    properties: any;


    currentBounds: LatLngBounds;
    public searchControl: FormControl;
    isAuth;


    constructor(private router: Router, private service: PropertiesService, private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone, private translate: TranslateService, private userService: UserService,
        public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) {
        this.lat = 43.6532;
        this.lon = -79.3832;
        this.minZoom = 7;
        this.zoom = 14;
        this.maxZoom = 20;
        this.showMap = true;
        this.isAuth = this.userService.isAuthenticated();



        this.translate.get('searchforlocation').subscribe((res: string) => {
            this.searchforlocation = res;
        });


    }
    styleFunc(feature) {
        return ({
            clickable: false,
            fillColor: feature.getProperty('color'),
            fillOpacity: 0.65,
            strokeWeight: 0
        });
    }
    zoomIn() {
        this.zoom++;

    }
    zoomOut() {
        this.zoom--;
    }

    next() {
        this.router.navigate(['./interview/type']);
    }

    removeMap() {
        this.mapRemoved.emit(this)
    }

    polyDragStart(evt){
        this.polyMoveStart.emit(this)
        console.log('drag start')
    }


    ngOnInit() {
        this.spinner.show(); 
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address'],
                componentRestrictions: { country: 'ca' }

            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place = autocomplete.getPlace();

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    // set latitude, longitude and zoom
                    this.lat = place.geometry.location.lat();
                    this.lon = place.geometry.location.lng();
                    this.zoom = this.switchZoom;
                });
            });
        });

        this.searchControl = new FormControl();


        if (this.poly) {

            this.polygon = {
                editable: this.edit,
                clickable: this.isAuth ? true : false,
                draggable: this.isAuth ? true : false,
                fillColor: 'blue',
                fillOpacity: 0,
                strokeOpacity: 1,
                strokeWeight: 1,
                visible: true,
                zIndex: 99,
                geodesic: true,
                strokeColor: 'red',
                paths: this.poly
            };
        }

        if(!this.userService.isAuthenticated()){
            this.searchControl.disable();
        }
    
        // this.analyzeFit();

    }


    mapReady(evt){
        this.spinner.hide();
    }
    hasPolygon() {
        if (this.polygon && this.polygon.paths.length > 0) {
            return true;
        } else {
            return false
        }
    }
    mapClicked($event: MouseEvent) {
    }

    boundsChange($event) {
        this.currentBounds = $event;

    }

    editChangeFromButton() {
        this.edit = !this.edit;
        const holdoverPoly = this.polygon;

        holdoverPoly.editable = this.edit;
        if( holdoverPoly.strokeColor !== "green"){
            holdoverPoly.strokeColor = "green"
           
        } else {
            holdoverPoly.strokeColor = "red"
        }
       

        // this.startOver();
        // this.polygon = holdoverPoly;
        // this.locationAdded.emit(this);

    }
    editChange() {
        const holdoverPoly = this.polygon;
        holdoverPoly.editable = this.edit;

        // this.startOver();
        // this.polygon = holdoverPoly;
        // this.locationAdded.emit(this);

    }
    checkPoly() {
    }

    analyzeFit() {

       
        this.spinner.show();
        this.heatPolygons = [];
        this.geoJson = null;
        this.polygon.getPolygonPath().then(
            polyPath => {
                this.service.communitiesWeekly([{ zoom: this.map.zoom, polygon: polyPath, lat: this.map.latitude, lng: this.map.longitude }]
                ).then(
                    response => {
                        this.heatPolygons = response

                        this.geoJson = response;
                        this.spinner.hide();
                        if (this.geoJson.features.length > 0) {
                            this.snackBar.open('There are more properties matching your search criteria in the darker Communities on the map.', 'Dismiss', {
                                duration: 8000,
                            });
                        } else {
                            this.snackBar.open('Ooops, our hamsters could not finish the analysis. Please try again next time or refine your search settings.', 'Dismiss', {
                                duration: 8000,
                            });
                        }


                    }
                )
            }
        )
        // this.service.weekly(true).subscribe(
        //     listings => {
        //         this.properties = []
        //         listings.forEach(listing => {
        //             const geo = listing.geo.split(',')
        //             let icon;
        //             console.log(geo[0])
        //             if (listing.isIn) {
        //                 icon = 'assets/oldPlace.svg';
        //             } else {
        //                 icon = 'assets/newPlace.svg';
        //             }
        //             this.properties.push({ icon: icon, latitude: geo[0]++, longitude: geo[1]++ })
        //         })




        //     }, err => { this.spinner.hide(); this.router.navigate(['ohoh']) }
        // );
    }

    capturePolygon() {

        const ne = this.currentBounds.getNorthEast();
        const sw = this.currentBounds.getSouthWest();

        const currentPoly = {
            editable: this.edit,
            clickable: true,
            draggable: true,
            fillColor: 'blue',
            fillOpacity: 0,
            strokeOpacity: 1,
            strokeWeight: 1,
            visible: true,
            zIndex: 99,
            geodesic: true,
            strokeColor: 'red', paths: [{ lat: ne.lat(), lng: ne.lng() },
            { lat: ne.lat(), lng: sw.lng() },
            { lat: sw.lat(), lng: sw.lng() }, { lat: sw.lat(), lng: ne.lng() }]
        }

        this.polygon = currentPoly;
        this.locationAdded.emit(this);
        if (this.zoom !== this.maxZoom - 1) {
            this.zoom--;
        }
        this.snackBar.open('Great! You can move or edit the shape for the perfect search area fit.','Dismiss',{
            duration: 8000,
          });

    }

    getPolygon() {
    }

    polyDragEnd(event) {
        // this.heatPolygons = [];
        this.polyMoved.emit(this);
        console.log('drag end')




    }

    startOver() {
        this.polygon = undefined;
        this.heatPolygons = [];
        this.geoJson = null;
        this.polyRemoved.emit();
    }
}
