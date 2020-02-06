import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-neighbourhoods',
  templateUrl: './neighbourhoods.component.html',
  styleUrls: ['./neighbourhoods.component.css']
})
export class NeighbourhoodsComponent implements OnInit {

  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number;
  minZoom: number;

  maxZoom: number;
  constructor() {
    this.lat = 43.6532;
    this.lon = -79.3832;
    this.minZoom = 9;
    this.zoom = 14;
    this.maxZoom = 17;
   }

  ngOnInit() {

  }

}
