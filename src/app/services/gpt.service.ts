import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { GPTResponse } from 'src/models/gpt-response';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class GPTService {

  url: string = `${environment.urlBase}`;

  constructor(private http: HttpClient) { }

  public askMe(question: string): Observable<GPTResponse> {
    return this.http.post<GPTResponse>(`${this.url}/ask-me`, { "question": question }, {
      headers: {
        "Authorization": `Bearer ${environment.secret}`
      }
    });
  }

  public clearCache(): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/clear-cache`, {
      headers: {
        "Authorization": `Bearer ${environment.secret}`
      }
    });
  }



}
