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
  traces = [];



  constructor(private router: Router, private service: PropertiesService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

   
    this.lat = 43.6532;
    this.lon = -79.3832;
    this.zoom = 14;

    this.service.getTrails().subscribe(trails => {
     
      if(trails.length ===0){
        alert('Once you explore nearby listings, you will find all previous locations here.');
        this.router.navigate(['nearby']);
      }
      let counter = 0;
      trails.forEach(trail => {
       
        this.traces.push({
          latitude: trail.latitude++,
          longitude: trail.longitude++
          
        })
        if(counter==trails.length-1){
          console.log('last marker', this.traces[this.traces.length-1])
          this.lat =this.traces[this.traces.length-1].latitude;
          this.lon = this.traces[this.traces.length-1].longitude;
        }
        counter++;
      })

    });
 

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
  }





  mapReady(nativeMap) {
  }

  mapIdle(ev){}

  takeMeThere(where){
    console.log('les go', where)

    this.router.navigate(['nearby', where]);
  }


}
