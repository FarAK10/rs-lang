import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export default class HeaderInterceptor implements HttpInterceptor {
  content = 'Content-Type';

  type = 'application/json';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = req.clone();
    clonedReq.headers.set('Content-Type', 'application/json');
    clonedReq.headers.set('Accept', 'application/json');
    return next.handle(req);
  }
}
