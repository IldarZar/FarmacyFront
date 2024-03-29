import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = request.clone({
      url:
        'https://apteka-api-apteka-service.azuremicroservices.io/apteka-api' +
        request.url,
    });
    return next.handle(newReq);
  }
}
