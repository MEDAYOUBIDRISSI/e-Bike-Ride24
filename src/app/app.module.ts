import { BrowserModule } from '@angular/platform-browser';
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
