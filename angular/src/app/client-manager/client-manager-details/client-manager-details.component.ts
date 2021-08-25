import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'app/user.service';
import { AppConfig } from 'app/app-config';

declare var sms: any;


@Component({
  selector: 'app-client-manager-details',
  templateUrl: './client-manager-details.component.html',
  styleUrls: ['./client-manager-details.component.css']
})
export class ClientManagerDetailsComponent implements OnInit {

  clientDetailsForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    userId: new FormControl(''),
    created: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) public client: any, private userService: UserService,
    private dialogRef: MatDialogRef<ClientManagerDetailsComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.clientDetailsForm = this.formBuilder.group({
      email: [this.client.dataKey.email, Validators.email],
      name: [this.client.dataKey.name, Validators.required],
      firstName: [this.client.dataKey.firstName],
      lastName: [this.client.dataKey.lastName],
      phone: [this.client.dataKey.phone, Validators.required],
      created: [this.client.dataKey.created],
      userId: [this.client.dataKey.userId],
    });
    console.log(this.client.dataKey)

  }
  update() {
    const client = { name: this.f.name.value, email: this.f.email.value, phone: this.f.phone.value, userId: this.client.dataKey.userId,
       firstName: this.f.firstName.value, lastName: this.f.lastName.value};
    this.userService.update(client).subscribe(
      result => {
        this.dialogRef.close(result)
      }
    );

  }
  get f() { return this.clientDetailsForm.controls; }
  get email() { return this.clientDetailsForm.get('email'); }

  cancel() {
    this.dialogRef.close('close')
  }

  onSwipe(ev){
    this.dialogRef.close('close')
  }



  
}
