import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../../e-commerce/class/user.class';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private baseURL = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }

  createClient(User: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/user/create`, User);
  }
  
  login(Auth: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/user/login/ecommerce`, Auth);
  }
}
