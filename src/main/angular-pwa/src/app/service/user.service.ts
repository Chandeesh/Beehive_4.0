import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../model/user';
import { UserLogin } from '../model/userlogin';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private login: string;
  private register: string;
  private confirm: string;
  
  constructor(private http: HttpClient) {
    this.login = 'http://localhost:8080/beehives/login';
    this.register = 'http://localhost:8080/beehives/registeruser';
    this.confirm = 'http://localhost:8080/beehives/confirmuser?token=';
  }

  // tslint:disable-next-line: typedef
  public save(user: User) {
    return this.http.put<User>(this.register, user, {observe: 'response'}).pipe(map(response => {
      return response; }));
  }

  // tslint:disable-next-line: typedef
  public loginuser(userlogin: UserLogin) {
    return this.http.post<UserLogin>(this.login, userlogin, {observe: 'response'}).pipe(map(response => {
      return response; }));
  }

   // tslint:disable-next-line: typedef
  public confirmuser(token: string) {
    return this.http.get(this.confirm + token, {observe: 'response'}).pipe(map(response => {
      return response; }));
  }
}
