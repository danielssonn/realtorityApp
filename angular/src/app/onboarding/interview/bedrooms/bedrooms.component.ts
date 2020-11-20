import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'app/user.service';
import { MessageService } from 'app/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bedrooms',
  templateUrl: './bedrooms.component.html',
  styleUrls: ['./bedrooms.component.css']
})
export class BedroomsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  bedroomTypes = [{ name: 'bed1', count: '1', label: '1' }, { name: 'bed2', count: '2', label: '2' }, { name: 'bed3', count: '3', label: '3' }, { name: 'bed4', count: '4', label: '4' }, { name: 'bed5', count: '5', label: '5 +' }]
  selectedOptions: any;
  hasChanged: boolean;
  nextDisabled = true;
  subscription: Subscription;


  constructor(private router: Router, private location: Location, private service: PropertiesService, private spinner: NgxSpinnerService,
    private userService: UserService, private messageService: MessageService) {

    this.hasChanged = false;
    this.spinner.show();
    service.getUserPreferences().subscribe(val => {
      this.selectedOptions = [];
      if (!val) {
        this.spinner.hide();
        return;
      }

      if (val.bed1) {
        this.selectedOptions.push('bed1');
      }
      if (val.bed2) {
        this.selectedOptions.push('bed2');
      }
      if (val.bed3) {
        this.selectedOptions.push('bed3');
      }
      if (val.bed4) {
        this.selectedOptions.push('bed4');
      }
      if (val.bed5) {
        this.selectedOptions.push('bed5');
      }
      if (this.selectedOptions.length > 0) {
        this.nextDisabled = false;
      }
      this.spinner.hide();
    });

    // subscription on main click
    this.subscription = this.messageService.getMessage().subscribe(message => {

      if(message.text ==='clack'){
        this.save();
      }
    });


  }

  next() {
    if (this.hasChanged) {
      this.save();
      this.router.navigate(['./interview/baths'])

    } else { this.router.navigate(['./interview/baths']); }

  }
  changed() {
    console.log(this.selectedOptions)
    if (this.selectedOptions.length === 0) {
      this.nextDisabled = true;
    } else {
      this.nextDisabled = false;
    }
    this.hasChanged = true;
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

  previous() {
    if (this.hasChanged) {
      this.save();
      this.router.navigate(['./interview/type'])
    } else {
      this.router.navigate(['./interview/type'])
    }

  }

  ngOnInit() {
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  save() {
    if (this.hasChanged) {
      console.log("bed save");
      this.spinner.show();
      this.service.dailyReset();
      this.service.weeklyReset();
      const beds = { bed1: 0, bed2: 0, bed3: 0, bed4: 0, bed5: 0 };
      this.selectedOptions.forEach(selected => {
        beds[selected] = 1;
      })
      this.service.saveBedrooms(beds).then(
        val => this.spinner.hide()
      )
    }
  }

}
