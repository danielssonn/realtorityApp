import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgmMap, LatLngBounds, LatLngBoundsLiteral, AgmPolygon, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/_dev/packages/core';
import { PropertiesService } from 'app/properties.service';

@Component({
  selector: 'app-school-bounds',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolBoundsComponent implements OnInit {
  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number;
  schools: any;
  @ViewChild(AgmMap,  {static:false}) map: any;
  @ViewChild(AgmPolygon,  {static:false}) public polygon: any;
  isEditable: false;

  minZoom: number; 

  maxZoom: number;
  showMap: boolean;
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


  constructor( private service: PropertiesService) {

    this.lat = 43.6532;
    this.lon = -79.3832;
    this.minZoom = 9;
    this.zoom = 14;
    this.maxZoom = 17;
    this.showMap = true;
   }

  ngOnInit() {

    this.service.schools().subscribe(
      response => {

        this.schools = response.value
        console.log(this.schools)
      }
  )
  }
  polyDblClick(pid, poly){
    alert(pid);
    poly.isEditable = !poly.isEditable;
  }
  polyClicked(pid, poly) {
    alert(pid);
    poly.isEditable = !poly.isEditable;
     this.polygon.getPolygonPath().then(data => {
        data.forEach((path, i) => {
          console.log(i + ': ' + path.lat() + ' - ' + path.lng());
        })
      })
  }
  mapClick(e) {
      console.log(e.coords)
  }
 polyDragEnd(event) {
    this.polygon.getPolygonPath().then(data => {
          data.forEach((path, i) => {
            console.log(i + ': ' + path.lat() + ' - ' + path.lng());
          })
        })
    }

}
