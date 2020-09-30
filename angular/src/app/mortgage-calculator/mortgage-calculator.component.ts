import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.css']
})
export class MortgageCalculatorComponent implements OnInit {
  @Input() asking;
  rate = 2.05;
  @Input() downpayment;
  @Input() maintenance = -1;

  insurance = 0;
  totalMortgage;
  monthlyPayment;
  mortgagePayment;
  @Input() propertyTaxes;
  show = false;
  amortYears = [
    { value: 5, viewValue: '5 Years' },
    { value: 10, viewValue: '10 Years' },
    { value: 15, viewValue: '15 years' },
    { value: 20, viewValue: '20 years' },
    { value: 25, viewValue: '25 years' },
    { value: 30, viewValue: '30 years' },
    { value: 35, viewValue: '35 years' },

  ];
  selected = 30;
  monthlyRate = this.rate / 100 / 12;
  payments = this.selected * 12

  constructor() {

  }
  ngOnInit() {
    this.calculate();
  }

  setAsking(val) {
    this.asking = Number(val.replace(/[^0-9\.-]+/g, ''));
    this.calculate();
  }
  setDownpayment(val) {
    this.downpayment = Number(val.replace(/[^0-9\.-]+/g, ''));
    this.calculate();
  }
  toggle() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
  calculate() {
    const mi = this.rate / 1200
    let base = 1;
    const mbase = 1 + mi;
    for (let i = 0; i < this.selected * 12; i++) {
      base = base * mbase
    }
    this.totalMortgage = this.asking - this.downpayment + this.insurance;
    this.mortgagePayment = this.floor(this.totalMortgage * mi / (1 - (1 / base)))
    this.monthlyPayment = this.mortgagePayment + this.propertyTaxes + this.maintenance
  }
  floor(number) {
    return Math.floor(number * Math.pow(10, 2) + 0.9) / Math.pow(10, 2);
  }
  updateDownPayment(event) {
    console.log(event)
    // this.downpayment = event.replace(/[^0-9\.-]+/g, '');

  }
  updateAsking(event) {

    this.asking = event.replace(/[^0-9\.-]+/g, '');

  }
  updateRate(event) {

    this.rate = event.replace(/[^0-9\.-]+/g, '') / 100;

  }


}
