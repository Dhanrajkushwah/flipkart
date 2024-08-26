import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }
    //Register User----------------------------------->
  signup(obj:any) {
      return this._http.post<any>(environment._api + "/api/user/signup", obj)
  }
    //login User----------------------------------->
    login(obj :any) {
      return this._http.post<any>(environment._api + "/api/user/login", obj)
    }
}
