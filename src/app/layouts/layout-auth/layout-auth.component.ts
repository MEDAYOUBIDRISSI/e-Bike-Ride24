import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-auth',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./layout-auth.component.css']
})
export class LayoutAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
