import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from './register-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../e-commerce/class/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public User: User={nom:"",prenom:"",typeUser:"Client",etat:true}
  public passwordRepeate:string="";

  constructor(private RegisterService: RegisterServiceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveUser()
    {
      if(this.User.password == this.passwordRepeate)
      {
        this.RegisterService.createClient(this.User).subscribe( data =>{
          this.RegisterService.login(data.User).subscribe( data =>{
            //console.log(data);
            localStorage.setItem("jwt-Token",data.jwt);
            localStorage.setItem("jwt-IDUser",data.payload.id);
            console.log(localStorage.getItem("jwt-Token"))
          },
          error => console.log(error));
          this.goToIndex()
        },
        error => console.log(error));
      }
      else{
        alert("password differents")
      }
      
    }

    goToIndex(){
      this.router.navigate(['index']);
    }

    urls:string="assets/images/avatars/inconnu.jpg";
    selectFiles(e:any)
    {
      this.urls=""
      var reader=new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload=(event:any)=>{
        this.urls=event.target.result;
        this.User.imgProfile=this.urls
        console.log(this.urls)
     }
    }

    delete_img()
    {
        this.urls="assets/images/avatars/inconnu.jpg";
    }

}
