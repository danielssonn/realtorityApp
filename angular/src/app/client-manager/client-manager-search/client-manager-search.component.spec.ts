import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerSearchComponent } from './client-manager-search.component';

describe('ClientManagerSearchComponent', () => {
  let component: ClientManagerSearchComponent;
  let fixture: ComponentFixture<ClientManagerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientManagerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
