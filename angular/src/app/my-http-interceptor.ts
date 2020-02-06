
import { throwError as observableThrowError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Injectable, Injector, InjectionToken, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/timeout';
import { UserService } from './user.service';
import { CoolLocalStorage } from '@angular-cool/storage';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private router: Router, private session: CoolLocalStorage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const timeout = Number(req.headers.get('timeout')) || 55000;
    // Clone the request to add the new header.
    const authReq = req.clone(
      {
        headers: new HttpHeaders({
          'Content-Type': 'x-application/json',
        }),
        withCredentials: true,
      }
    );


    return next.handle(authReq).timeout(timeout).catch((err: HttpErrorResponse) => {

      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
        this.router.navigate(['./ohoh'], { queryParams: { error: err.statusText } });

      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
    
        if (err.status === 401) {
          this.session.clear();
          // this.router.navigate(['./account']);
        }
        if (err.status === 0 || err.status === 500 || !err.status ) {
          this.router.navigate(['./ohoh'], { queryParams: { error: err.statusText } });

        }
      }
      return Observable.of(new HttpResponse({ body: { status: err.status } }));
      // ...optionally return a default fallback value so app can continue (pick one)
      // which could be a default value
      // return Observable.of(new HttpResponse({body: [
      //   {name: 'Default values returned by Interceptor', id: 88}
      // ]}))
      // or simply an empty observable
      // return Observable.empty<HttpEvent<any>>();
    });
  }
}
