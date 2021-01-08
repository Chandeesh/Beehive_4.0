import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { HttpResponse } from '@angular/common/http';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {

  tok: string;
  
  constructor(private router: Router, private route: ActivatedRoute, private userservice: UserService, private toaster: ToasterService) {
    this.route.queryParams.subscribe(data=> {this.tok=data.token});
   }

  ngOnInit(): void {
    this.userservice.confirmuser(this.tok).subscribe(
      (data) => {
        this.success(data);
      },
      (error) => {
        this.success(error);
      });
  }

  success(response: HttpResponse<object>) {
    if (response.status == 200) {
      this.router.navigate(['/loginuser']);
    } else {
      this.toaster.showToast('Failure', 'Token Expired', 'failure');
      this.router.navigate(['/adduser']);
    }
  }

}
