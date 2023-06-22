import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  private githubURL: string = environment.githubURL;
  constructor(private http: HttpClient) { }

  GetAuthPage(): Observable<string> {
    return this.http.get<string>(this.githubURL);
  }
  getAcessToken(auth_code: string) {
    return this.http.post(this.githubURL + '/getAccessToken', { code: auth_code });
  }
  getUserDetails() {
    return this.http.get(this.githubURL + '/getUserDetails');
  }
  logout() {
    return this.http.get(this.githubURL + '/logout');
  }
}
