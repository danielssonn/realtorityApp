import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-trashbin',
  templateUrl: './trashbin.component.html',
  styleUrls: ['./trashbin.component.css']
})
export class TrashbinComponent implements OnInit {

  trashbin: any;

  constructor(private router: Router, private service: PropertiesService,  private userService: UserService) {
     this.service.trashbin().subscribe(
      value => this.trashbin = value
      );
   }

  showDetail = function() {
    this.router.navigate(['details']);
  };
  emptyTrash = function() {
    this.service.emptyTrash().subscribe(
      value => this.trashbin = value
      );
  }
  ngOnInit() {

  }


}
