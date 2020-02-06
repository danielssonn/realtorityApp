import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustTextAdComponent } from './just-text-ad.component';

describe('JustTextAdComponent', () => {
  let component: JustTextAdComponent;
  let fixture: ComponentFixture<JustTextAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustTextAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustTextAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
