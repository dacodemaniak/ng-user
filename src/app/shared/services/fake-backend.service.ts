import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null).pipe(
      mergeMap(handleRoute),
      materialize(),
      delay(500),
      dematerialize()
    );

    function handleRoute(): Observable<HttpEvent<any>> {
      const userRegex: RegExp = /\api\/v2\/user+$/;
      const userFindRegex: RegExp = /\api\/v2\/user\/d+$/;
      const userByNameRegex: RegExp = /\api\/v2\/user\/w+$/;

      switch (true) {
        case userRegex.test(url) && method === 'GET':
          return all();
        case userByNameRegex.test(url) && method === 'GET':
            return findByName();
        case userRegex.test(url) && method ==='POST':
          return add(request);
        case userRegex.test(url) && method ==='PUT':
            return authenticate(request);
        case userFindRegex.test(url) && method === 'GET':
          return;
        case userFindRegex.test(url) && method === 'DELETE' :
          return;
        default:
          return next.handle(request);
      }

      function add(request: HttpRequest<any>): Observable<HttpResponse<any>> {
        let nextId: number;
        if (users.length) {
          nextId = users[users.length - 1].id + 1;
        } else {
          nextId = 1;
        }
        request.body.id = nextId;
        users.push(request.body);
        localStorage.setItem('users', JSON.stringify(users));
        return of(new HttpResponse({status: 200, body: request.body}))
      }

      function authenticate(request): Observable<HttpResponse<any>> {

        const user: any = users.find((obj: any) => obj.email === request.body.login && obj.password === request.body.password);
        
        console.log(`${JSON.stringify(user)} found with ${request.body.password}`);

        if (user !== undefined) {
          return of(new HttpResponse<any>({status: 200, body: user}))
        }
        throwError({status: 403, error: {message: 'Unauthorized'}});
      }

      function all(): Observable<HttpResponse<any>> {
        return of(new HttpResponse({status: 200, body: users}))
      }

      function findByName() {
        const user: any = users.find((obj: any) => obj.username === idFromUrl());
        if (user !== undefined) {
          return of(new HttpResponse<any>({status: 200, body: user}))
        }
        throwError({status: 403, error: {message: 'Unauthorized'}});
      }

      function get(): Observable<HttpResponse<any>> {
        const data: any = users.find((obj: any) => obj.id === idFromUrl());
        return of(new HttpResponse({status: 200, body: data}))
      }

      function idFromUrl(): number | string {
        const urlParts = url.split('/');
        const suffix: number = +urlParts[urlParts.length - 1];

        if (!isNaN(suffix)) {
          return suffix;
        }
        urlParts[urlParts.length - 1];

      }
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
}
