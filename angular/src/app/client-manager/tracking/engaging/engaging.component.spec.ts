import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagingComponent } from './engaging.component';

describe('EngagingComponent', () => {
  let component: EngagingComponent;
  let fixture: ComponentFixture<EngagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
