import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.findById(route.params["id"])
      .pipe(
        map((user: User) => {
          if (user) {
            return true;
          } else {
            this.router.navigate(["/"]);
            return false;
          }
        }),
        catchError((err) => {
          this.router.navigate(["/"]);
          return of(false);
        })
      );
  }

}
