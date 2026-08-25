import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseAuthService } from './firebase-auth';
import { environment } from '../../environments/environment';

export interface Story {
  id?: string;
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  category?: string;
  publishedAt?: string;
}

export interface StoryRequest {
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private http = inject(HttpClient);
  private firebaseAuth = inject(FirebaseAuthService);
  private readonly apiUrl = `${environment.apiUrl}/stories`;

  getStories(category?: string): Observable<Story[]> {
    const url = category ? `${this.apiUrl}?category=${category}` : this.apiUrl;
    return this.http.get<Story[]>(url);
  }

  getStoryById(id: string): Observable<Story> {
    return this.http.get<Story>(`${this.apiUrl}/${id}`);
  }

  createStory(story: StoryRequest): Observable<Story> {
    return from(this.firebaseAuth.obterTokenJwt()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token || ''}`
        });
        return this.http.post<Story>(this.apiUrl, story, { headers });
      })
    );
  }

  deleteStory(id: string): Observable<void> {
    return from(this.firebaseAuth.obterTokenJwt()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token || ''}`
        });
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
      })
    );
  }
}
