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
    const clonedReq = req.clone({
      setHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(clonedReq);
  }
}
