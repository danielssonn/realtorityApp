import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBoundsComponent } from './schools.component';

describe('SchoolsComponent', () => {
  let component: SchoolBoundsComponent;
  let fixture: ComponentFixture<SchoolBoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolBoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolBoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
