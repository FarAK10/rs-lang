import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export default class HeaderInterceptor implements HttpInterceptor {
  content = 'Content-Type';
  type = 'application/json';

  constructor(
    private authorizationService: AuthorizationService,
    private data: DataService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authorizationService.getToken();
    this.data.token = token;
    let clonedReq;
    if (token) {
      clonedReq = req.clone({ withCredentials: true });
      clonedReq.headers.set('Authorization', `Bearer ${token}`);
    } else {
      clonedReq = req.clone();
    }
    clonedReq.headers.set('Content-Type', 'application/json');
    clonedReq.headers.set('Accept', 'application/json');
    return next.handle(req);
  }
}
