import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginResponse } from 'src/models/login-response';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${environment.urlBase}/auth`;
  private header: any = {
    "Content-Type": "application/json"
  };

  constructor(private http: HttpClient) {}


  public signIn(email:string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, {"email": email, "password": password}, {headers: this.header});
  }

  public signUp(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user, {
      headers: this.header
    });
  }

}
