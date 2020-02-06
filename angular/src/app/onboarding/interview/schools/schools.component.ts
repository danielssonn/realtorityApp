import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'app/message.service';
import { Subscription } from 'rxjs';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  hasChanged: boolean;
  nextDisabled = false;
  goodSchools = false;
  goodPublicSchools = 0;
  goodCatholicSchools = 0;

  schoolsAndDistricts: any;
  districts: any;
  schools: any
  selectedSchools: String;

  rawSchoolDistricts: any;

  subscription: Subscription;
  isAuth: any;
  constructor(private userService: UserService, private router: Router, private service: PropertiesService, private spinner: NgxSpinnerService, private messageService: MessageService) { }
  ngOnInit() {
    this.service.getUserPreferences().subscribe(val => {
      this.isAuth = this.userService.isAuthenticated();
      this.goodPublicSchools = val.goodSchools;
      this.goodCatholicSchools = val.goodCatholicSchools;

      if (this.goodPublicSchools) {
        this.goodSchools = true;
        this.selectedSchools = 'goodPublicSchools';
      } else if (this.goodCatholicSchools) {
        this.goodSchools = true;
        this.selectedSchools = 'goodCatholicSchools';
      } else {
        this.goodSchools = false;
      }
    })
    this.service.getSchoolsAndDistricts().subscribe(val => {
      this.rawSchoolDistricts = val;
      this.setDistricts();
    }
    )
   

  }

  setDistricts() {

    // group per School Board
    // DSB : Schools
    // [{dsb:dsb, schools: schools[]}]
    let catholic = 'N'
    if (this.selectedSchools === 'goodCatholicSchools') {
      catholic = 'Y'
    } else {
      catholic = 'N'
    }
    this.rawSchoolDistricts.forEach(schools => {
      const schoolList = [];
      this.schoolsAndDistricts = new Map();
      console.log('set district', catholic)
      this.districts = null;
      schools.forEach(school => {
        if (school.catholic === catholic) {
          if (this.schoolsAndDistricts.has(school.school_details + '(' + school.school_type + ')')) {

            if (!this.schoolsAndDistricts.get(school.school_details + '(' + school.school_type + ')').includes(school.school_name)) {
              this.schoolsAndDistricts.get(school.school_details + '(' + school.school_type + ')').push(school.school_name)

            }

          } else {
            this.schoolsAndDistricts.set(school.school_details + '(' + school.school_type + ')', [school.school_name])
          }
          this.districts = [];
          Array.from(this.schoolsAndDistricts.keys()).forEach(el => {
            this.districts.push({ name: el, show: false })
          }
          )
        }
      })

    });
  }

  getSchools(district) {
    console.log(district)
    return this.schoolsAndDistricts.get(district.name)
  }

  schoolsChange(event) {

    console.log('school change', this.selectedSchools);

    if (this.goodSchools && (this.selectedSchools === '' || !this.selectedSchools)) {
      this.selectedSchools = 'goodPublicSchools';
    }
    if (!this.goodSchools) {
      this.selectedSchools = '';
      this.service.saveSchools({ goodSchools: 0, goodCatholicSchools: 0 }).then(val => {
      })
    }
    if (this.selectedSchools === 'goodPublicSchools') {
      this.service.saveSchools({ goodSchools: 1, goodCatholicSchools: 0 }).then(val => {
      })
    }
    if (this.selectedSchools === 'goodCatholicSchools') {
      this.service.saveSchools({ goodSchools: 0, goodCatholicSchools: 1 }).then(val => {
      })
    }
    this.setDistricts();

  }
  schoolsMatter(ev) {
    this.goodSchools = !this.goodSchools;
    if (!this.goodSchools) {
      this.selectedSchools = null;
    }
  }

  toggle(school) {
    if (!school.show) {
      school.show = false;
    }
    school.show = !school.show

  }

  onSwipe(evt) {
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    if (x === 'right') {
      this.previous();
    }
    if (x === 'left') {
      this.next();
    }
  }
  next() {
    if (this.hasChanged) {
        this.save()
        this.router.navigate(['./interview/price']);
      
    } else { this.router.navigate(['./interview/price']); }

  }

  previous() {
    if (this.hasChanged) {
      this.save();
      this.router.navigate(['./interview/baths'])
    } else { this.router.navigate(['./interview/baths']) }
  }

  save() {
   
      this.spinner.show();
      this.service.saveSchools({ goodSchools: this.goodPublicSchools, goodCatholicSchools: this.goodCatholicSchools }).then(
        val=>{  
          this.service.clearCachedProperties();
          this.spinner.hide()}
      )

    
  }
}
