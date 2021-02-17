import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beehive-yield',
  templateUrl: './beehive-yield.component.html',
  styleUrls: ['../login-user/login-user.component.css']
})
export class BeehiveYieldComponent implements OnInit {

  state: string;
  constructor() { }

  ngOnInit(): void {
    this.state = "block"
  }

  cancel() {
    this.state = "none";
  }
}
