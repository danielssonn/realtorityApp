import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhOhComponent } from './oh-oh.component';

describe('OhOhComponent', () => {
  let component: OhOhComponent;
  let fixture: ComponentFixture<OhOhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhOhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhOhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
