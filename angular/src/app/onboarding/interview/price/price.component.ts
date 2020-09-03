import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { NouiFormatter } from '../../../../../../node_modules/ng2-nouislider';
import { UserService } from 'app/user.service';
import { MessageService } from 'app/message.service';
import { Subscription } from 'rxjs';

export class TooltipFormatter implements NouiFormatter {

  budget = [
    50000,
    100000,
    150000,
    200000,
    250000,
    300000,
    350000,
    400000,
    450000,
    500000,
    550000,
    600000,
    700000,
    750000,
    800000,
    850000,
    900000,
    950000,
    1000000,
    1250000,
    1500000,
    1750000,
    2000000,
    2250000,
    2500000,
    2750000,
    3000000,
    3250000,
    3500000,
    3750000,
    4000000,
    4500000,
    5000000,
    10000000
  ]
  to(value: number): string {

    const price = this.budget[Math.round(value)];
    if (price < 1000000) {
      return price / 1000 + 'k';
    }
    if (price >= 1000000) {
      return price / 1000000 + 'm';
    }
    // return this.budget[value].toString();
  };

  from(value: string): number {
    console.log('formating from', value)
    return 1;
  }
}



@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})

export class PriceComponent implements OnInit {
  from: any;
  to: any;
  max: any;
  step: any;
  hasChanged: boolean;
  budget = [];
  priceRange = [0, 33]

  public rangeSliderConfig: any = {
    start: [10, 20],
    range: {
      'min': [0],
      'max': [33]
    },
    tooltips: [new TooltipFormatter(), new TooltipFormatter()],
    step: 1,
    connect: [false, true, false],
  };
  subscription: Subscription;
  userServices: UserService;
  constructor(private router: Router, private location: Location, private service: PropertiesService, private spinner: NgxSpinnerService,
    userService: UserService, private messageService: MessageService) {
    this.userServices = userService;
    this.max = 10000000;
    this.step = 25000;
    this.hasChanged = false;
    this.from = 100000;
    this.to = 10000000;
    this.spinner.show();

    this.budget = [
      50000,
      100000,
      150000,
      200000,
      250000,
      300000,
      350000,
      400000,
      450000,
      500000,
      550000,
      600000,
      700000,
      750000,
      800000,
      850000,
      900000,
      950000,
      1000000,
      1250000,
      1500000,
      1750000,
      2000000,
      2250000,
      2500000,
      2750000,
      3000000,
      3250000,
      3500000,
      3750000,
      4000000,
      4500000,
      5000000,
      10000000
    ]

    service.getUserPreferences().subscribe(val => {
      if (!val) {
        this.spinner.hide();
        return;
      }
      if (val.priceFrom) {
        this.from = this.budget.indexOf(val.priceFrom);
        this.priceRange = [this.budget.indexOf(val.priceFrom), this.budget.indexOf(val.priceTo)]
      }
      if (val.priceTo) {
        this.to = this.budget.indexOf(val.priceTo);
      }
      this.spinner.hide();

    })

    // subscription on main click
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.save()
    });
  }
  getFrom() {

    return this.budget[this.from];
  }
  getTo() {

    return this.budget[this.to];
  }
  onRangeChange(event) {

  }
  onSwipe(evt) {
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    if (x === 'right') {
      this.previous();
    }
    if (x === 'left') {
      this.next();
    }
  }


  next() {

    // this.service.savePriceRange({ priceFrom: this.getFrom(), priceTo: this.getTo() }).then(() => {
    // tslint:disable-next-line:max-line-length
    if (this.hasChanged) {

      this.save();
      this.router.navigate(['./week'])

    } else {
      this.router.navigate(['./week'])
    }
  }

  save() {
    if (this.hasChanged) {
      this.spinner.show();
      this.service.savePriceRange({ priceFrom: this.budget[this.priceRange[0]], priceTo: this.budget[this.priceRange[1]] }).then(() => {
        this.service.dailyReset();
        this.service.weeklyReset();
        this.spinner.hide();

      })
    }
  }
  changed() {
    this.hasChanged = true;
  }
  previous() {
    if (this.hasChanged) {
      this.save();
      this.router.navigate(['./interview/schools'])

    } else { this.router.navigate(['./interview/schools']) }
  }
  ngOnInit() {
  }

}
