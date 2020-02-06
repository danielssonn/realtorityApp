
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoolLocalStorage } from '@angular-cool/storage';
import { environment } from '../environments/environment';




import { Observable, Subject } from 'rxjs';
import { DeviceService } from 'app/device.service';



@Injectable()
export class UserService {


  private logonUrl;
  private logoutUrl;
  private signupUrl;
  private resetUrl;
  private updateUrl;

  private pushTokenRegUrl;
  private pushToken;


  private oauthUrl;
  private httpOptions;
  private userSubject = new Subject<any>();



  // tslint:disable-next-line:max-line-length
  constructor(@Inject('windowObject') private window: Window, private http: HttpClient, private session: CoolLocalStorage, private deviceService: DeviceService) {

    this.logonUrl = environment.serverURL + '/signin';
    this.signupUrl = environment.serverURL + '/signup';

    this.logoutUrl = environment.serverURL + '/signout';

    this.oauthUrl = environment.serverURL + '/auth/oauth2';
    this.resetUrl = environment.serverURL + '/forgot';
    this.pushTokenRegUrl = environment.serverURL + '/registerPushToken';
    this.updateUrl = environment.serverURL + '/updateUserDetails';
  }

  public isAuthenticated(): boolean {
    if (this.session.getItem('user') === 'true' && this.session.getItem('userName')) {
      return true;
    }
    return false;
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  setUser(user){
    this.userSubject.next(user);
  }

  logon(body): Observable<any> {

    return this.http.post(this.logonUrl, JSON.stringify(body)).pipe(map(response => {
      console.log('logon response', response)
      return response;

    }))


  }

  logout() {
    return this.http.post(this.logoutUrl, JSON.stringify({})).subscribe(
      response => {
        this.session.setItem('user', null);
        this.session.setItem('userName', null);
      }
    );
  }

  signup(user): Observable<any> {

    return this.http.post(this.signupUrl, JSON.stringify(user)).pipe(map(response => {
      return response;
    }))

  }

  reset(user): Observable<any> {
    return this.http.post(this.resetUrl, JSON.stringify(user)).pipe(map(response => {
      return response;

    }))

  }

  update(user): Observable<any> {
    console.log('svc lets update the client details', user );
    return this.http.post(this.updateUrl, JSON.stringify(user)).pipe(map(response => {
      return response;

    }))
   }

  registerPushToken(token?): Observable<any> {
    if (token) {
      this.pushToken = token;
    }



    const tokenReg = {
      deviceId: this.deviceService.getDevice().uuid,
      token: this.pushToken,
      language: this.deviceService.getLanguage()
    };
    return this.http.post(this.pushTokenRegUrl, JSON.stringify(tokenReg)).pipe(map(response => {
      return response;

    }))

  }
  oAuth(profiles): Observable<any> {
    const profile = { profile: profiles };
    return this.http.post(this.oauthUrl, JSON.stringify(profile)).pipe(map(response => {
      if (response) {
        this.session.setItem('user', 'true');
        return response;
      } else {
        return null;
      }
    }))


  }


}
