import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashbinComponent } from './trashbin.component';

describe('TrashbinComponent', () => {
  let component: TrashbinComponent;
  let fixture: ComponentFixture<TrashbinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashbinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashbinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
