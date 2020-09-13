import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhySignonComponent } from './why-signon.component';

describe('WhySignonComponent', () => {
  let component: WhySignonComponent;
  let fixture: ComponentFixture<WhySignonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhySignonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhySignonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
