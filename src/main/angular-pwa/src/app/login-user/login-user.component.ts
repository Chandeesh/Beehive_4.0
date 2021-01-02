import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToasterService } from '../toaster/toaster.service';
import { UserLogin } from '../model/userlogin';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit{

  userlogin: UserLogin;

  ngOnInit(){
    if(localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/viewbeehive']);
    }
  }

  // tslint:disable-next-line: max-line-length
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToasterService,
    private authService: AuthService,
    private userService: UserService) {
    this.userlogin = new UserLogin();
  }

  onSubmit() {
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
}
