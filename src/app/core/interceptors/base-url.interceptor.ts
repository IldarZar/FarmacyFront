import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "@app/public/catalog/models/product";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = request.clone({ url: 'http://localhost:8888/apteka-api' + request.url });
    return next.handle(newReq);
  }
}
