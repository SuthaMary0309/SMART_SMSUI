import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private tokenKey = "authToken";
  private roleKey = "role";

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);

    const payload = this.parseJwt(token);

    const role =
      payload?.role ??
      payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
      "";

    localStorage.setItem(this.roleKey, role);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getRole() {
    return localStorage.getItem(this.roleKey);
  }

  isLoggedIn() {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is expired
    const tokenData = this.parseJwt(token);
    if (tokenData && tokenData.exp) {
      const expirationTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      return currentTime < expirationTime;
    }
    
    return true;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('token');
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem('role');
    localStorage.removeItem('studentID');
    localStorage.removeItem('name');
    localStorage.removeItem('parentName');
  }

  parseJwt(token: string | null): any {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    try {
      const payload = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(decodeURIComponent(escape(payload)));
    } catch {
      return null;
    }
  }
}
