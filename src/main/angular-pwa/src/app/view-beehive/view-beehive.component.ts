import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-beehive',
  templateUrl: './view-beehive.component.html',
  styleUrls: ['./view-beehive.component.css']
})
export class ViewBeehiveComponent implements OnInit {

  id: string;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
  }


  // tslint:disable-next-line: typedef
  logout() {
    this.authService.logout();
    this.router.navigate(['/loginuser']);
  }

  weight() {
    this.router.navigate(['weight'], { relativeTo: this.route });
  }

  yield() {
    this.router.navigate(['Yield'], { relativeTo: this.route });
  }

  temp() {
    this.router.navigate(['Temperature'], { relativeTo: this.route });
  }
}
