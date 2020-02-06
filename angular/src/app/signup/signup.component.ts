import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/user.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  passPattern = '^[a-z0-9_-]{0,55}$';

  constructor(private service: UserService, private formBuilder: FormBuilder, private router: Router, private translate:TranslateService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.pattern(this.passPattern)],
  });
  }

  get f() { return this.registerForm.controls; }

  signup() {

      const user = {
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        password: this.f.password.value,
        username: this.f.email.value
      }

      this.service.signup(user).subscribe(val => {
        if ( val.status === 200 ) {
          this.translate.get('Success! Please Login ...').subscribe((res: string) => {
            this.snackBar.open(res + '...', '', {
                duration: 4000,
            });
        });
          this.router.navigate(['./accountSimple']);

        } else if (val.status === 409) {
          alert('This username/email is already registered');
        }

      });

  }
}
