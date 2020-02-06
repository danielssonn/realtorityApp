import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'app/user.service';
import { MessageService } from 'app/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bathrooms',
  templateUrl: './bathrooms.component.html',
  styleUrls: ['./bathrooms.component.css']
})
export class BathroomsComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  bathroomTypes = [{ name: 'bath1', count: '1', label: '1' }, { name: 'bath2', count: '2', label: '2' }, { name: 'bath3', count: '3', label: '3' }, { name: 'bath4', count: '4', label: '4' }, { name: 'bath5', count: '5', label: '5 +' }]
  selectedOptions: string[];
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

      if (val.bath1) {
        this.selectedOptions.push('bath1');
      }
      if (val.bath2) {
        this.selectedOptions.push('bath2');
      }
      if (val.bath3) {
        this.selectedOptions.push('bath3');
      }
      if (val.bath4) {
        this.selectedOptions.push('bath4');
      }
      if (val.bath5) {
        this.selectedOptions.push('bath5');
      }
      if (this.selectedOptions.length > 0) {
        this.nextDisabled = false;
      }
      this.spinner.hide();
    });
    // subscription on main click
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.save()
    });
  }

  next() {
    if (this.hasChanged) {
      this.save();
      this.router.navigate(['./interview/schools']);
    } else { this.router.navigate(['./interview/schools']); }

  }

  save() {
    if (this.hasChanged) {
      this.spinner.show();
      const baths = { bath1: 0, bath2: 0, bath3: 0, bath4: 0, bath5: 0 };
      this.selectedOptions.forEach(selected => {
        baths[selected] = 1;
      })
      this.service.saveBathrooms(baths).then(val => {
        this.spinner.hide();
      })
    }
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
      this.router.navigate(['./interview/beds']);
    } else { this.router.navigate(['./interview/beds']) }

  }
  changed() {
    if (this.selectedOptions.length === 0) {
      this.nextDisabled = true;
    } else {
      this.nextDisabled = false;
    }
    this.hasChanged = true;
  }

  ngOnInit() {
  }

}
