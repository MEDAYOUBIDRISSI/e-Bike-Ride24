import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login"; 
import { GoogleLoginProvider } from "angularx-social-login"
import { User } from "../../e-commerce/class/user.class"
import { LoginServiceService } from './login-service.service'
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: SocialAuthService,private LoginService: LoginServiceService,
    private router: Router) { }

  userGoogle:any;
  public User:User={}

  ngOnInit(): void {
  }

  signInWithGoogle(platform:string): void {
    platform=GoogleLoginProvider.PROVIDER_ID
    
    this.authService.signIn(platform).then((response)=>{
      this.userGoogle=response
      console.log(response)
      this.User.nom=this.userGoogle.firstName
      this.User.prenom=this.userGoogle.lastName
      this.User.imgProfile=this.userGoogle.photoUrl
      this.User.email=this.userGoogle.email

      this.LoginService.login(this.User).subscribe( data =>{
        localStorage.setItem("jwt-Token",data.jwt);
        localStorage.setItem("jwt-IDUser",data.payload.id);
        this.goToIndex();
      },
      error => console.log(error));
    })
    

  }

  signOut():void {
    alert("log methode")
    this.authService.signOut().then().catch(err => console.log(err));
  }

  saveLogin(){
    this.LoginService.login(this.User).subscribe( data =>{
      //console.log(data);
      localStorage.setItem("jwt-Token",data.jwt);
      localStorage.setItem("jwt-IDUser",data.payload.id);
      this.goToIndex();
    },
    error => console.log(error));
  }

  goToIndex(){
    this.router.navigate(['index']);
  }
}
