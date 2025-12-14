import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // First check if user is authenticated
    const token = this.authService.getToken();
    
    if (!token) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    // Check if token is expired
    const tokenData = this.authService.parseJwt(token);
    if (tokenData && tokenData.exp) {
      const expirationTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      
      if (currentTime >= expirationTime) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url, expired: 'true' }
        });
        return false;
      }
    }

    // Check role
    const userRole = this.authService.getRole();
    const allowedRoles = route.data['roles'] as Array<string>;

    if (!allowedRoles || allowedRoles.length === 0) {
      // No role restriction, just check authentication
      return true;
    }

    if (userRole && allowedRoles.includes(userRole)) {
      return true; // Role allowed
    }

    // Role not allowed - redirect based on user's role
    if (userRole) {
      switch(userRole) {
        case 'Admin':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'Teacher':
          this.router.navigate(['/teacher/dashboard']);
          break;
        case 'Student':
          this.router.navigate(['/student-dashboard']);
          break;
        case 'Parent':
          this.router.navigate(['/parent-dashboard']);
          break;
        default:
          this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    
    return false;
  }
}
