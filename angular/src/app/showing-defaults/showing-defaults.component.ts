import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-showing-defaults',
  templateUrl: './showing-defaults.component.html',
  styleUrls: ['./showing-defaults.component.css']
})

export class ShowingDefaultsComponent implements OnInit {
  @Input() isPreset: string;
  preset = false;
  results = true;
  isAuth;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.isAuth = this.userService.isAuthenticated();
    if (this.isPreset) {
      this.preset = true;
      this.results = false;
    }

  }

}
