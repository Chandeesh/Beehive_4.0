import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToasterService } from '../toaster/toaster.service';
import { UserLogin } from '../model/userlogin';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css', '../../assets/css/style.css']
})
export class LoginUserComponent implements OnInit {

  userlogin: UserLogin;
  state: string;

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/viewbeehive']);
    }
    this.state = localStorage.getItem("dis")
  }

  // tslint:disable-next-line: max-line-length
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToasterService,
    private authService: AuthService,
    private userService: UserService,
    private authenticate: AuthenticationService) {
    this.userlogin = new UserLogin();
  }

  onSubmit() {
    this.userService.authenticate(this.userlogin.email, this.userlogin.password).subscribe((data) => {
      sessionStorage.setItem('JWT', "Bearer " + JSON.stringify(data.body.token).replace("\"", "").replace("\"", ""));
      console.log("Waiting");
      console.log("authenticated API");
      
    });
    this.postLogin();

  }

  async postLogin() {
    await this.delay(1000);
    this.userService.loginuser(this.userlogin).subscribe(
      (data) => {
        this.success(data);
      },
      (error) => {
        this.success(error);
      });
  }

  success(response: HttpResponse<UserLogin>) {
    if (response.status == 200) {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', this.userlogin.email);
      this.router.navigate(['/viewbeehive']);
    } else {
      this.toaster.showToast('Failure', 'Incorrect Credentials', 'failure');
    }
  }

  cancel() {
    this.state = 'none';
    console.log(this.state);
  }

  updateState() {
    console.log('state asd');
    this.state = 'block';
  }

  toregister() {
    localStorage.setItem("dis", "block");
  }

private delay(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

}
