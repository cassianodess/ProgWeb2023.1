import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = `${environment.urlBase}/users`;

  constructor(private http: HttpClient) { }

  public findById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }
}
