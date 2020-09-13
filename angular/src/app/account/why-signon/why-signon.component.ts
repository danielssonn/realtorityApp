import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-why-signon',
  templateUrl: './why-signon.component.html',
  styleUrls: ['./why-signon.component.css']
})
export class WhySignonComponent implements OnInit {

  constructor( @Optional() private dialogRef: MatDialogRef<WhySignonComponent>, public service: UserService) { }

  ngOnInit() {

    this.service.audit('signonInq').subscribe();
  }

  onSwipe(evt) {
    this.dialogRef.close()
  }

}
