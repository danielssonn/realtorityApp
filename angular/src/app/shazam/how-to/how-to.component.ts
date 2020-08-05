import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})
export class HowToComponent implements OnInit {

  constructor( @Optional() private dialogRef: MatDialogRef<HowToComponent>) { }

  ngOnInit() {
  }

  onSwipe(evt) {

    this.dialogRef.close()


}

}
