import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'app/user.service';
import { MessageService } from 'app/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.css']
})
export class PropertyTypeComponent implements OnInit {
  // tslint:disable-next-line:whitespace
  // tslint:disable-next-line:max-line-length
  propertyTypes = [{ name: 'Detached', selected: 0 }, { name: 'Condo', selected: 0 }, { name: 'Semi', selected: 0 }, { name: 'Townhouse', selected: 0 }];
  selectedOptions: any;
  hasChanged: boolean;
  nextDisabled = true;
  subscription: Subscription;


  constructor(private spinner: NgxSpinnerService, private router: Router, private location: Location, private service: PropertiesService,
    private userService: UserService, private messageService: MessageService) {
    this.hasChanged = false;
    this.spinner.show();
    service.getUserPreferences().subscribe(val => {
      this.selectedOptions = [];
      console.log('prefzs', val)
      if (!val) { this.spinner.hide(); return; }

      if (val.detached) {
        this.selectedOptions.push('Detached')
      }
      if (val.semi) {
        this.selectedOptions.push('Semi')
      }
      if (val.condo) {
        this.selectedOptions.push('Condo')
      }
      if (val.townhouse) {
        this.selectedOptions.push('Townhouse')
      }
      if (this.selectedOptions.length > 0) {
        this.nextDisabled = false;
      }

      this.spinner.hide();

      this.subscription = this.messageService.getMessage().subscribe(message => {

        if(message.text ==='clack'){
          this.save();
        }
      });

    })
  }

  save(){
    if (this.hasChanged) {
      const selectedPropertyTypes = { detached: 0, semi: 0, townhouse: 0, condo: 0 };
      this.selectedOptions.forEach(selected => {
        selectedPropertyTypes[selected.toLowerCase()] = 1;
      })
      this.service.savePropertyType(selectedPropertyTypes).then(() => {
        this.service.dailyReset();
        this.service.weeklyReset();
      })
    } 


  }

  next() {
    if (this.hasChanged) {
      const selectedPropertyTypes = { detached: 0, semi: 0, townhouse: 0, condo: 0 };
      this.selectedOptions.forEach(selected => {
        selectedPropertyTypes[selected.toLowerCase()] = 1;
      })
      this.service.savePropertyType(selectedPropertyTypes).then(() => {
        this.service.dailyReset();
        this.service.weeklyReset();
        this.router.navigate(['./interview/beds'])
      })
    } else { this.router.navigate(['./interview/beds']) }

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

  changed() {
    if (this.selectedOptions.length === 0) {
      this.nextDisabled = true;
    } else {
      this.nextDisabled = false;
    }
    this.hasChanged = true;
  }
  previous() {
    if (this.hasChanged) {
      const selectedPropertyTypes = { detached: 0, semi: 0, townhouse: 0, condo: 0 };
      this.selectedOptions.forEach(selected => {
        selectedPropertyTypes[selected.toLowerCase()] = 1;
      })
      this.service.savePropertyType(selectedPropertyTypes).then(() => {
        console.log('saved will navigate')
        this.router.navigate(['./interview/location'])

      }
      )
    } else { this.router.navigate(['./interview/location']) }

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
