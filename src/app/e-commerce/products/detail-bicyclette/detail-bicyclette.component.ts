import { Component, OnInit } from '@angular/core';
import { Produit } from '../../class/produit.class'
import { Commande } from '../../class/commande.class'
import { LigneCommande } from '../../class/ligneCommande.class'
import { User } from '../../class/user.class'
import { ProductServiceService } from '../product-service.service'
import { UserServicesService } from '../../services/user-services.service'
import { ActivatedRoute,Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {ImgZoomComponent} from "../img-zoom/img-zoom.component"
 import {NotificationComponent} from "../notification/notification.component"

@Component({
  selector: 'app-detail-bicyclette',
  templateUrl: './detail-bicyclette.component.html',
  styleUrls: ['./detail-bicyclette.component.css']
})
export class DetailBicycletteComponent implements OnInit {

  _id: number=-1;
  _idAuth: any
  public Produit: Produit={qteStock:0};
  public User: User={}
  public Commande: Commande={};
  public LigneCommande: LigneCommande={};
  _qte:number=1
  _url:string=""
 
  constructor(private ProductService: ProductServiceService,private UserServices: UserServicesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this._idAuth = localStorage.getItem('jwt-IDUser')
    this._id = this.route.snapshot.params['_id'];
    this.getProduits()
    this.getUserAuth()
  } 

  getProduits()
  {
    this.ProductService.getBicycletteById(this._id).subscribe(data => {
      this.Produit = data.product;
      this._url = this.Produit.Image[0]
      console.log(this.Produit)
    }, error => console.log(error));
  }

  getUserAuth(){
    this.UserServices.getUserAuth(this._idAuth).subscribe(data => {
      this.User = data.User;
    });
  }

  createCommand()
  {
    this.Commande.user=this.User
    this.ProductService.createCommande(this.Commande).subscribe( data =>{
      this.Commande=data.commandeExiste
      this.createLigneCommand()
    },
    error => console.log(error));

  }

  createLigneCommand()
  {
    this.ShowNotification("success")
    // this.LigneCommande.qte=this._qte
    // this.LigneCommande.commande=this.Commande
    // this.LigneCommande.product=this.Produit
    // this.ProductService.createLigneCommande(this.LigneCommande).subscribe( data =>{
    //   console.log(data);
    //   this.ShowNotification("success")
    //  // this.reloadComponent()
    // },
    // error => console.log(error));

  }

  plusqte()
  {
    if(this._qte < parseInt(this.Produit.qteStock+""))
    {
      this._qte=this._qte+1;
    }
    else
    {
      alert("maxxx")
    }
  }

  minqte()
  {
    if(this._qte > 1)
    {
      this._qte=this._qte-1;
    }
    else
    {
      alert("minnnnn")
    }
  }

  changeImage(url:string)
  {
    this._url=url
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

    imageZoom(url:any)
    {
      const dialogRef = this.dialog.open(ImgZoomComponent,{
        width:'70%',
        height: '400px',
        data: {img:this._url}
      });
    }

    ShowNotification(type:any)
    {
      const dialogRef = this.dialog.open(NotificationComponent,{
        width:'280px',
        height: '320px',
        data: {type:type}
      });
    }
}
