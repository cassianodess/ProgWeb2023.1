import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { UserService } from '../user.service';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let id: string = sessionStorage.getItem("userId") as string;
    if (id != null) {
      return this.userService.findById(id)
        .pipe(
          map((user: User) => {
            if (user) {
              this.router.navigate(["/home", user.id]);
              return false;
            } else {
              return true;
            }
          }),
          catchError((err) => {
            this.router.navigate(["/home", id]);
            return of(false);
          }
          )
        );
    }
    sessionStorage.clear();
    return true;
  }

}
