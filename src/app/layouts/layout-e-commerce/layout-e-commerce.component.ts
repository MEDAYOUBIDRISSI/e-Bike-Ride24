import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-e-commerce',
  template: `
    <app-nave-bare></app-nave-bare>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./layout-e-commerce.component.css']
})
export class LayoutECommerceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
