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
    // (function(d, m){
    //   var kommunicateSettings = {"appId":"6a86750404bbb5c3cef3affcfb9b33b6","popupWidget":true,"automaticChatOpenOnNavigation":true};
    //   var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    //   s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    //   var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    //   (window as any).kommunicate = m; m._globals = kommunicateSettings;
    // })(document, (window as any).kommunicate || {});
  }
  

}
