import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Chat } from 'src/models/chat';
import { GPTResponse } from 'src/models/gpt-response';
import { GPTRequestBody } from 'src/models/gpt-response-body';
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

  public askMe(GPTResquestBody: GPTRequestBody): Observable<Chat> {
    return this.http.post<Chat>(`${this.url}/${sessionStorage.getItem("userId") as string}/gpt`, GPTResquestBody);
  }

  public deleteChat(chatId: string): Observable<Chat[]> {
    return this.http.delete<Chat[]>(`${this.url}/${sessionStorage.getItem("userId") as string}/delete/${chatId}`);
  }

  public clearCache(): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/clear-cache`);
  }
}
