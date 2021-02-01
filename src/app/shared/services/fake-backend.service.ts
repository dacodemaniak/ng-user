import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

      switch (true) {
        case userRegex.test(url) && method === 'GET':
          return all();
        case userRegex.test(url) && method ==='POST':
          return add(request);
        case userFindRegex.test(url) && method === 'GET':
          return;
        case userFindRegex.test(url) && method === 'DELETE' :
          return;
        default:
          return next.handle(request);
      }

      function add(request: HttpRequest<any>): Observable<HttpResponse<any>> {
        users.push(request.body);
        localStorage.setItem('users', JSON.stringify(users));
        return of(new HttpResponse({status: 200}))
      }

      function all(): Observable<HttpResponse<any>> {
        return of(new HttpResponse({status: 200, body: users}))
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
