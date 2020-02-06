import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-property-size',
  templateUrl: './property-size.component.html',
  styleUrls: ['./property-size.component.css']
})
export class PropertySizeComponent implements OnInit {
  max = 10000000;
  minFrom = 0;
  minTo = 0;
  step= 1000;
  min= 0;
  constructor(private router: Router, private location: Location) { }
  next() {
    this.router.navigate(['./interview/beds']);
  }

  previous() {
    // this.location.back();
  }

  ngOnInit() {
  }

}
