import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/style.css']
})
export class AppComponent implements OnInit {

  title: string;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.title = 'Spring Boot - Angular Application';
    localStorage.setItem('dis', 'none');
  }
  
  ngOnInit() {
	  this.router.navigate(['/loginuser'])
  }
}
