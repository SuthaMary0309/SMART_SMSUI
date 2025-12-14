import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatResponse {
  response: string; // Gemini API response
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private baseUrl = 'http://localhost:5283/api/chat'; // Gemini backend URL

  constructor(private http: HttpClient) {}

  askAI(message: string): Observable<ChatResponse> {
    // Backend expects { message: "user message" }
    return this.http.post<ChatResponse>(`${this.baseUrl}/send`, { message });
  }
}
