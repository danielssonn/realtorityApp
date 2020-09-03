import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PropertiesService } from '../properties.service';
import { UserService } from 'app/user.service';
import { Router } from '@angular/router';
import { CoolLocalStorage } from '@angular-cool/storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceService } from 'app/device.service';
import { ClientManagerSearchService } from 'app/client-manager/client-manager-search/client-manager-search.service';

@Component({
  selector: 'app-accout-simple',
  templateUrl: './accout-simple.component.html',
  styleUrls: ['./accout-simple.component.css']
})
export class AccoutSimpleComponent implements OnInit {

  signinForm: FormGroup;
  passPattern = '^[a-zA-Z0-9!@#$%^&*?]{0,55}$';
  nameFormControl = new FormControl('', [
    Validators.required]);

  passwordFormControl = new FormControl('', [
    Validators.required]);
  // tslint:disable-next-line:max-line-length
  constructor(private deviceService: DeviceService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private router: Router, private service: UserService, private propService: PropertiesService, private session: CoolLocalStorage,
    private clientManagerSearchService: ClientManagerSearchService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.pattern(this.passPattern)],
    });
  }

  get f() { return this.signinForm.controls; }

  login = function () {
    this.spinner.show();
    const user = { username: this.f.email.value, password: this.f.password.value };
    this.service.logon(user).subscribe(value => {

      if (value.userId) {
        this.session.setItem('user', true);
        this.session.setItem('userName', value.username);
        this.session.setItem('salesPersonId', value.salespersonId);
        this.clientManagerSearchService.getActiveClient().subscribe();
        this.service.setUser(value);
        this.propService.clearCachedProperties();
        this.propService.clearUserPreferences();
        if (this.deviceService.getDevice() !== 'browser') {
          this.service.registerPushToken().subscribe();
        }
        this.navigateOnPreferences();
      } else {
        alert('Please try again ...')
        this.password = '';
        this.email = '';
      }
      this.spinner.hide();
    })
  }
  navigateOnPreferences() {
    this.propService.getUserPreferences().subscribe(val => {
      if (val.default) {
        this.router.navigate(['interview']);

      } else {
        this.router.navigate(['week']);
      }
    })

  }

}
