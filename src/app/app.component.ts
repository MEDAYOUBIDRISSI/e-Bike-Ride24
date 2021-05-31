import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-Bike-Ride24';
  constructor(public translate:TranslateService)
  {
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en')
  }
}
