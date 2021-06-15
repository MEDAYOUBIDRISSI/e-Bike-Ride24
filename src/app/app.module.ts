import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component';
import { LayoutECommerceComponent } from './layouts/layout-e-commerce/layout-e-commerce.component';
import { NaveBareComponent } from './layouts/masterPage/nave-bare/nave-bare.component';
import { FooterComponent } from './layouts/masterPage/footer/footer.component';
import { HttpClientModule , HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TranslateModule , TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { LnguageInterceptor } from './interceptors/language.interceptors';
import { SocialLoginModule, SocialAuthServiceConfig,GoogleLoginProvider } from 'angularx-social-login';

 //////import material Designe

import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';


export function HttpLoaderFactory(http:HttpClient)
{
  return new TranslateHttpLoader(http);
}
 
@NgModule({
  declarations: [ 
    AppComponent,
    LayoutAuthComponent,
    LayoutECommerceComponent,
    NaveBareComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BrowserAnimationsModule
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  exports: [ TranslateModule],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: LnguageInterceptor,
    multi:true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '362308681769-enrdkku2v20m8uhk9miijb49l0q627kv.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  },
  HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
