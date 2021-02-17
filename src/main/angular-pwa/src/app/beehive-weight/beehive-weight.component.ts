import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beehive-weight',
  templateUrl: './beehive-weight.component.html',
  styleUrls: ['../login-user/login-user.component.css']
})
export class BeehiveWeightComponent implements OnInit {

  state:string;
  constructor() { }

    ngOnInit(): void {
    this.state="block"
  }

  cancel() {
    this.state="none";
  }

}
