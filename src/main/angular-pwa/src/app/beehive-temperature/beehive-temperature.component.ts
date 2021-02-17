import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beehive-temperature',
  templateUrl: './beehive-temperature.component.html',
  styleUrls: ['../login-user/login-user.component.css']
})
export class BeehiveTemperatureComponent implements OnInit {

  state:string;
  constructor() { }

  ngOnInit(): void {
    this.state="block"
  }

  cancel() {
    this.state="none";
  }
}
