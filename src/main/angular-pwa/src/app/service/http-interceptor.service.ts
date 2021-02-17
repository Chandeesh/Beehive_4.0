import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interceptor works");
    if (sessionStorage.getItem('JWT')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('JWT')
        }
      })
    }

    return next.handle(req);

  }
}