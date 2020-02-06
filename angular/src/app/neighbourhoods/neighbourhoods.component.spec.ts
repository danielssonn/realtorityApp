import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighbourhoodsComponent } from './neighbourhoods.component';

describe('NeighbourhoodsComponent', () => {
  let component: NeighbourhoodsComponent;
  let fixture: ComponentFixture<NeighbourhoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeighbourhoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighbourhoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
