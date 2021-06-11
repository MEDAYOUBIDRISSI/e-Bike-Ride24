import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../class/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private baseURL = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }

  getUserAuth(_id: any): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/user/auth/${_id}`);
  }
  updateProfile(_id: number, User: User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/user/update?UserID=${_id}`, User);
  }
}
