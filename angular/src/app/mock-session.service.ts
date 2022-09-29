import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockSessionService {

  constructor() { }

  setItem = (name: string, value: string) =>{
    window.sessionStorage.setItem(name, value);
  }

  getItem = (name: string) =>{
    return window.sessionStorage.getItem(name);
  }
}
