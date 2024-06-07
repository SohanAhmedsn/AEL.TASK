import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/models/constants/app-constant';
import { Book } from 'src/app/models/data/book';

@Injectable({
  providedIn: 'root',
})
export class BookServices {
  constructor(private http: HttpClient) {}
  get(): Observable<Book[]> {
    return this.http.get<Book[]>(`${apiUrl}/api/book`);
    //return this.http.get<Book[]>(`http://localhost:5124/api/book`);
    //http://localhost:5124/api/book
  }
  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${apiUrl}/api/book/${id}`);
  }
  post(data: Book): Observable<Book> {
    return this.http.post<Book>(`${apiUrl}/api/book`, data);
  }
  put(data: Book): Observable<any> {
    return this.http.put<any>(`${apiUrl}/api/book/${data.id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.get<Book>(`${apiUrl}/api/book/${id}`);
  }
}
