import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'app/user.service';
import { DeviceService } from 'app/device.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm: FormGroup;
  emailFormControl = new FormControl('email', [
    Validators.required]);
  showOK: boolean;
  showOh: boolean;

  constructor(private formBuilder: FormBuilder, private service: UserService, private translateService: TranslateService) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }
  get f() { return this.resetForm.controls; }

  reset() {

    const user = { email: this.f.email.value, language: this.translateService.currentLang };

    this.service.reset(user).subscribe(value => {
      console.log(value)
      if (value.status === 200) {
        this.showOK = true;
        this.showOh = false;

      } else {
        this.showOK = false;
        this.showOh = true;
      }
    })
  }
}
