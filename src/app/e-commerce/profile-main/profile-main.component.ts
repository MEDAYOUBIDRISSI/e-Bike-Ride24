import { Component, OnInit } from '@angular/core';
import { User } from '../class/user.class'
import { UserServicesService } from '../services/user-services.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {

  public User: User={}

  _id: any;
  constructor(private UserService: UserServicesService,
    private router: Router) { } 

  ngOnInit(): void {
    this._id = localStorage.getItem('jwt-IDUser')
    this.getUserAuth()
  }

  getUserAuth(){
    this.UserService.getUserAuth(this._id).subscribe(data => {
      this.User = data.User;
    });
  }

  updateProfile()
  {
    console.log(this.User)
    this.UserService.updateProfile(this._id, this.User).subscribe( data =>{
      alert("Bien Update")
      window.location.reload(); 
    }, error => console.log(error));
  }

  
    selectFiles(e:any)
    {
      var reader=new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload=(event:any)=>{
        this.User.imgProfile=event.target.result
     }
    }

    delete_img()
    {
      this.User.imgProfile="assets/images/avatars/inconnu.jpg";
    } 
} 
