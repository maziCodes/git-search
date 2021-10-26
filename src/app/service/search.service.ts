import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'https://api.github.com/search/users';

  constructor(
    private http: HttpClient
  ) { }

  searchUsers(url: string): Observable<Search> {
    
    return this.http.get<Search>(`${this.baseUrl}${url}`, {
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    });
  }
}
