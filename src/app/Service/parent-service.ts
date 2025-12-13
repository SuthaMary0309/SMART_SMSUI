import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParentService {
  private http = inject(HttpClient);
  private base = 'https://smartsms.runasp.net/api/parent';

  private getAuthOptions() {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }) : new HttpHeaders({ 'Content-Type': 'application/json' });
    return { headers };
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.base}/all`, this.getAuthOptions());
  }

  add(payload: any) {
    return this.http.post(`${this.base}/add`, payload, this.getAuthOptions());
  }

  update(id: string, payload: any) {
    return this.http.put(`${this.base}/update/${id}`, payload, this.getAuthOptions());
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/delete/${id}`, this.getAuthOptions());
  }
}
