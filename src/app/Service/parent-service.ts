import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParentService {
  private base = 'https://smartsms.runasp.net/api/parent';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.base}/all`);
  }

  add(payload: any) {
    return this.http.post(`${this.base}/add`, payload);
  }

  update(id: string, payload: any) {
    return this.http.put(`${this.base}/update/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/delete/${id}`);
  }
}
