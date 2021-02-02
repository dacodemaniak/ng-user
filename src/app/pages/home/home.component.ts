import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from 'src/app/core/modules/user/services/user.service';
import { UserModel } from 'src/app/shared/models/user-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: Observable<UserModel[]>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.all();
  }

  public remove(user: UserModel): void {
    this.userService.remove(user).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.users = this.users.pipe(
          take(1),
          map((users: UserModel[]) => users.filter((obj: UserModel) => obj.getId() !== user.getId()))
        );
      }
    })

  }

}
