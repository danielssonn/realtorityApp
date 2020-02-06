import { ElementRef, NgZone, Component, OnInit, ViewChild, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PropertiesService } from '../properties.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContentComponent } from './content/content.component';
 import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/_dev/packages/core';
import { Subscription } from 'rxjs';

declare var google: any;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number;
  lon: number;
  zoom: number;
  heat: any;
  mapStyle: any;
  zones: any
  infoWindows = [];
  switchZoom = 16 ;
  public searchControl: FormControl;


  allProperties = [];
  allPermits = [];
  allProposals = [];

  proposals = [];
  permits = [];
  properties = [];
  houseTypesHeat = [{name: 'All', type: 'rateAll'}, {name: 'Detached', type: 'rateDetached'}, {name: 'Condo', type: 'rateCondo'},
  {name: 'Semi', type: 'rateSemi'}, {name: 'Att/Row', type: 'rateRowhouse'} ];
  selectedHeat = 'rateAll';
  showHeat = false;
  showZones = false;
  showBuild = false;
  showProperties = false;
  showPermits = false;
  clusterStyles: any;
  map: any;
  busy: Subscription;
  zoneLayer: any;
  heatToggle: any;

  @ViewChild('search', {static:false})
  public searchElementRef: ElementRef;
  constructor(private router: Router, private service: PropertiesService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {





    this.searchControl = new FormControl();
    this.lat = 43.6532;
    this.lon = -79.3832;
    this.zoom = 12;
 

    this.mapStyle = [
      {
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f5f5f5'
          }
        ]
      },
      {
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ] 
      },
      {
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#616161'
          }
        ]
      },
      {
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#f5f5f5'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#bdbdbd'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#eeeeee'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#757575'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e5e5e5'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#757575'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dadada'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#616161'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e5e5e5'
          }
        ]
      },
      {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#eeeeee'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#c9c9c9'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      }
    ];

    this.clusterStyles = [{
      width: 50,
      height: 50,
      textColor: '#ffffff',
      textSize: 15,
      url: 'assets/clusters/1.png'
    },
    {
      width: 50,
      height: 50,
      textColor: '#ffffff',
      textSize: 15,
      url: 'assets/clusters/1.png'
    },

    {
      width: 50,
      height: 50,
      textColor: '#ffffff',
      textSize: 15,
      url: 'assets/clusters/1.png'
    },
    {
      width: 50,
      height: 50,
      textColor: '#000000',
      textSize: 15,
      url: 'assets/clusters/1.png'
    }]


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
  }

  heatSelectionChange(heat, event) {
    this.service.setHeat(heat)
  }

  heatChange(event) {
    console.log('heat change', event)
    if (!event.checked) {
      this.heat = [];
      this.showHeat = false
    } else {
      this.showHeat = true;
      this.busy = this.service.communities().subscribe(
        response => {
          this.heat = response.value
          this.service.setHeat(this.selectedHeat)
        }
      )
    }

  }
  buildChange(event) {
    if (!event.checked) {
      this.showBuild = false
      this.proposals = [];
 

    } else {
      this.showBuild = true;
      this.busy = this.service.developments().subscribe(
        response => {
          this.allProposals = response;
          this.setMarkersToMap();
        }
      )

    }
  }
  permitsChange(event) {
    if (!event.checked) {
      this.showPermits = false
      this.permits = [];
    } else {
      this.showPermits = true;
      this.busy = this.service.permits().subscribe(
        response => {
          this.allPermits = response;
          this.setMarkersToMap();
        }
      )
    }
  }
  zonesChange(event) {
    if (!event.checked) {
      this.showZonesLayer(false);
    } else {
      this.showZonesLayer(true);
    }
  }
  propertiesChange(event) {
    if (!event.checked) {
      this.showProperties = false
      this.properties = [];
      this.allProperties = [];


    } else {
      this.showProperties = true;
      this.busy = this.service.allProperties().subscribe(
        response => {
          this.allProperties = response;
          this.setMarkersToMap();
        }
      )
    }
  }

  mapIdle(event) {
    this.setMarkersToMap();
  }

  heatPolyClick(area, event) {
    const infowindow = new google.maps.InfoWindow({
      content: 'Some stats mumbo jumbo for ' + area,
      position: { lat: event.latLng.lat(), lng: event.latLng.lng() }
    });
    infowindow.open(this.map)
  }

  setMarkersToMap() {

    this.proposals = [];
    this.properties = [];
    this.permits = [];


    if (this.map.zoom < this.switchZoom) {
      return;
    }

    this.showHeat = false;
    this.heat = [];
    if (this.showPermits) {
      this.allPermits.forEach(
        marker => {
          marker.point = new google.maps.LatLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
          if (this.map.getBounds().contains(marker.point)) {
            this.permits.push(marker);
          }
        }
      )
    }
    if (this.showBuild) {
      this.allProposals.forEach(
        marker => {
          marker.point = new google.maps.LatLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
          if (this.map.getBounds().contains(marker.point)) {
            this.proposals.push(marker);
          }
        }
      )
    }
    if (this.showProperties) {
      this.allProperties.forEach(
        marker => {
          marker.point = new google.maps.LatLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
          if (this.map.getBounds().contains(marker.point)) {
            this.properties.push(marker);
          }
        }
      )
    }

  }


  mapReady(nativeMap) {
    this.map = nativeMap;
    this.zoneLayer = new google.maps.FusionTablesLayer({
      query: {
        select: 'location',
        from: '1mO9TT_34rBbqMsdX-Bu-90r_6c8C8mT6w3-LM0XF',
        // where: "ZN_ZONE = 'RD'",
      },
      styleId: 2,
      templateId: 2,

    });
    this.setMarkersToMap();
  }

  showZonesLayer(show) {


    if (show) {
      this.zoneLayer.setMap(this.map);
    } else {
      this.zoneLayer.setMap(null)
    }


  }
}
