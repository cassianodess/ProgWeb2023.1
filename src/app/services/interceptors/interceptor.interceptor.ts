import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  
  constructor() {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${sessionStorage.getItem("token") as string || "" }`)
    });

    return next.handle(authRequest);
  }
}
