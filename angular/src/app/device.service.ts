import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CordovaService } from './cordova.service';

declare var device;
declare var navigator;
declare var window;
declare var AppRate;
declare var cordova;


@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  signInWithApple: Observable<any>;
  googlePlus: Observable<any>;
  platform: Observable<any>;
  networkOffline: Observable<any>;
  networkOnline: Observable<any>;
  device: any;
  firebase: Observable<any>;
  globalization: Observable<any>;
  language: String;
  appRate: any;
  getAppRate: Observable<any>


  constructor(private cds: CordovaService) {

    this.device = 'browser';
    this.language = 'en_CA';

    this.platform = this.cds.deviceReady.map(() => device);

    this.googlePlus = this.cds.deviceReady.map(() => window.plugins.googleplus);

    this.signInWithApple = this.cds.deviceReady.map(() => window.cordova.plugins.SignInWithApple);

    this.firebase =  this.cds.deviceReady.map(() => cordova.plugins.firebase.messaging );

    this.networkOffline = this.cds.networkOffline.map(() => true)

    this.networkOnline = this.cds.networkOnline.map(() => navigator.network.connection.type)

    this.globalization = this.cds.deviceReady.map(() => navigator)



  }
  public getDevice() {
    return this.device
  }
  public setDevice(ndevice) {
    this.device = ndevice;
  }

  public getLanguage() {
    return this.language
  }

  public setLanguage(nLanguage) {
    this.language = nLanguage;
  }

}
