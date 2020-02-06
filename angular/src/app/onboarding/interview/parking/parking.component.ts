import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from 'app/properties.service';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  parking = false;
  parkingChanged = false;
  isAuth;
  constructor(private router: Router, private service: PropertiesService, private userService: UserService) { }

  ngOnInit() {
    this.isAuth = this.userService.isAuthenticated();
    this.service.getUserPreferences().subscribe(val => {
      if (!val) {
        this.parking = false;
        return;
      } if (val.parking === '1') {
        this.parking = true;
      }
    });
  }
  parkingChange(ev) {
    this.parkingChanged = true;
  }

  next() {
    if (this.parkingChanged) {
      this.service.saveParking(this.parking).then(() =>
        this.router.navigate(['./interview/beds']))
    } else { this.router.navigate(['./interview/beds']) }


  }

  previous() {
    if (this.parkingChanged) {
      this.service.saveParking(this.parking).then(() =>
        this.router.navigate(['./interview/price'])
      )
    } else { this.router.navigate(['./interview/price']) }
  }

}
