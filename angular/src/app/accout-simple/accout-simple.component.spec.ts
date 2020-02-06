import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutSimpleComponent } from './accout-simple.component';

describe('AccoutSimpleComponent', () => {
  let component: AccoutSimpleComponent;
  let fixture: ComponentFixture<AccoutSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccoutSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
