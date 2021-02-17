import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToasterService } from '../toaster/toaster.service';
import { User } from '../model/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css', '../../assets/css/style.css']
})
export class UserFormComponent implements OnInit {

  user: User;
  state: string;

  constructor(private route: ActivatedRoute, private router: Router, private toaster: ToasterService, private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.state=localStorage.getItem("dis");
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    if (this.user.password === this.user.confirmpassword) {
      this.userService.save(this.user).subscribe(
        (data) => {
          this.gotoUserList(data);
        },
        (error) => {
          this.gotoUserList(error);
        });
    } else {
      this.toaster.showToast('Failure', 'Passwords dont match', 'failure');
    }
  }

  // tslint:disable-next-line: typedef
  gotoUserList(response: HttpResponse<Object>) {
    if (response.status == 200) {
      this.toaster.showToast('Success', 'Mail sent', 'success');
      this.toaster.showToast('Success', 'Account registered', 'success');
      this.router.navigate(['/loginuser'])
    } else {
      this.toaster.showToast('Failure', 'UserName already exists', 'failure');
    }
  }

  cancel() {
    this.state = 'none';
  }

  updateState() {
    this.state = 'block';
  }

  tologin() {
    localStorage.setItem("dis","block");
  }
}
