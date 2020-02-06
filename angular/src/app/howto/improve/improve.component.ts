import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'app/properties.service';

@Component({
  selector: 'app-improve',
  templateUrl: './improve.component.html',
  styleUrls: ['./improve.component.css']
})
export class ImproveComponent implements OnInit {
  currentCount: any;
  currentPreferences: any;
  constructor(private service: PropertiesService) { }
  ngOnInit() {

    this.service.weekly(true).subscribe(
      value => {this.currentCount = Math.round(value.length / 10) * 10 }
    );
    this.service.getUserPreferences().subscribe(
      val => {this.currentPreferences = val+''; }
    )
  }

}
