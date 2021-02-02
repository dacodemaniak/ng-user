import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Popable } from 'src/app/shared/modules/ui/interfaces/popable';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, Popable {

  public close: Subject<null> = new Subject();

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  public closeLogout(): void {
    this.close.next();
  }
}
