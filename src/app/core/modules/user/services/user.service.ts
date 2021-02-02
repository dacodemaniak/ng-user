import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  all(): Observable<UserModel[]> {
    return this.httpClient.get<any>(
      'http://localhost:4200/api/v2/user'
    ).pipe(
      take(1),
      map((users) => users.map((user: any) => new UserModel().deserialize(user)))
    );
  }

  add(userModel: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(
      'http://localhost:4200/api/v2/user',
      userModel
    )
  }

  remove(user: UserModel): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(
      'http://localhost:4200/api/v2/user/' + user.getId(),
      {
        observe: 'response'
      }
    );
  }

  authenticate(credentials: any): Observable<UserModel> {
    return this.httpClient.put<any>(
      'http://localhost:4200/api/v2/user',
      credentials
    ).pipe(
      tap(() => {
        console.log(`Tap Observable before notifying`)
        sessionStorage.setItem('authenticate', 'true');
      })
    )
  }

  find(username: string): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(
      'http://localhost:4200/api/v2/user/' + username,
      {
        observe: 'response'
      }
    );
  }
}
