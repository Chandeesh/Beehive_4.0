import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToasterService } from '../toaster/toaster.service';
import { User } from '../model/user';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private toaster: ToasterService, private userService: UserService) {
    this.user = new User();
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
      this.router.navigate(['/checkmail'])
    } else {
      this.toaster.showToast('Failure', 'UserName already exists', 'failure');
    }
  }
}
