import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementDetailsComponent } from './engagement-details.component';

describe('EngagementDetailsComponent', () => {
  let component: EngagementDetailsComponent;
  let fixture: ComponentFixture<EngagementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
