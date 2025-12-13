import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
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
      const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      
      if (currentTime >= expirationTime) {
        // Token expired, clear storage and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url, expired: 'true' }
        });
        return false;
      }
    }

    return true;
  }
}