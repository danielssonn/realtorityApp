import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmLightForkComponent } from './agm-light-fork.component';

describe('AgmLightForkComponent', () => {
  let component: AgmLightForkComponent;
  let fixture: ComponentFixture<AgmLightForkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgmLightForkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgmLightForkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
