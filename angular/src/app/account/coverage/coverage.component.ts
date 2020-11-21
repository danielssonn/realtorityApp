import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.css']
})
export class CoverageComponent implements OnInit {

  constructor( @Optional() private dialogRef: MatDialogRef<CoverageComponent>, public service: UserService) { }

  ngOnInit() {
    this.service.audit('coverageInq').subscribe();
  }
  onSwipe(evt) {
    this.dialogRef.close()
  }

}
