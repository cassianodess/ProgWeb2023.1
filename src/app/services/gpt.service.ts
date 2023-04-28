import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { GPTResponse } from 'src/models/gpt-response';


@Injectable({
  providedIn: 'root'
})
export class GPTService {
  
  url: string = `${environment.urlBase}/ask-me`;

  constructor(private http: HttpClient) {}

  public askMe(question: string): Observable<GPTResponse> {
    return this.http.post<GPTResponse>(this.url, {"question": question}, {
      headers: {
        "Authorization": `Bearer ${environment.secret}`
      }
    });
  }

  public clearCache(): Observable<boolean> {
    return this.http.get<boolean>( `${environment.urlBase}/clear-cache`, {
      headers: {
        "Authorization": `Bearer ${environment.secret}`
      }
    });
  }



}