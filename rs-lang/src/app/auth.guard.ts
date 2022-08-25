import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthorizationService } from "./services/authorization.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(
        private authorizationService: AuthorizationService,
        private router: Router
    ){}

canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean {
   return this.authorizationService.isAuth,
   this.router.navigate(['/autorization/login']);

   }
}
