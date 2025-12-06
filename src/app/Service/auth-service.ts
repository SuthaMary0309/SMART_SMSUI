// auth-service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  tokenKey = 'authToken';
  roleKey = 'role';

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    const payload = this.parseJwt(token);
  
    const role =
      payload?.role ??
      payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
      '';
  
    localStorage.setItem(this.roleKey, role);
  }
  

  getToken() { return localStorage.getItem(this.tokenKey); }
  getRole() { return localStorage.getItem(this.roleKey); }
  isLoggedIn() { return !!this.getToken(); }

  parseJwt(token: string | null): any {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      const payload = atob(parts[1].replace(/-/g,'+').replace(/_/g,'/'));
      return JSON.parse(decodeURIComponent(escape(payload)));
    } catch { return null; }
  }
  
  }
  

