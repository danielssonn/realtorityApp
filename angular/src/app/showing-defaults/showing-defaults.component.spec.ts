import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingDefaultsComponent } from './showing-defaults.component';

describe('ShowingDefaultsComponent', () => {
  let component: ShowingDefaultsComponent;
  let fixture: ComponentFixture<ShowingDefaultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowingDefaultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingDefaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
