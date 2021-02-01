import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  add(userModel: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(
      'http://localhost/api/v2/user',
      userModel
    )
  }

  authenticate(credentials: any): Observable<UserModel> {
    return this.httpClient.put<any>(
      'http://localhost/api/v2/user',
      credentials
    )
  }
}
