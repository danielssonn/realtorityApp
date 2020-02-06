import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/_dev/packages/core';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Output() onMapReady = new EventEmitter<any>();

  constructor(public mapApiWrapper: GoogleMapsAPIWrapper) { }

  ngOnInit() {
    this.mapApiWrapper.getNativeMap()
    .then((map) => {

      this.onMapReady.emit(map);
    })
  }

}
