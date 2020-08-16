import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})
export class HowToComponent implements OnInit {

  address :any;

  constructor( @Optional() private dialogRef: MatDialogRef<HowToComponent>,  @Optional() @Inject(MAT_DIALOG_DATA) public dialogProperty: any) { }

  ngOnInit() {
    this.address = this.dialogProperty.address;
    console.log('aa', this.address)
  }

  onSwipe(evt) {

    this.dialogRef.close()


}

}
