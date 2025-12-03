import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const userRole = localStorage.getItem("role");
    const allowedRoles = route.data['roles'] as Array<string>;

    if (allowedRoles.includes(userRole!)) {
      return true; // Role allowed
    }

    this.router.navigate(['/not-authorized']);
    return false;
  }
}
