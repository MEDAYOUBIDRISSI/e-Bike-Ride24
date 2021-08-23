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
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactSupplierComponent} from '../contact-supplier/contact-supplier.component'

@Component({
  selector: 'app-detail-accessoire-velo',
  templateUrl: './detail-accessoire-velo.component.html',
  styleUrls: ['./detail-accessoire-velo.component.css']
})
export class DetailAccessoireVeloComponent implements OnInit {

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
    private router: Router,
    private snackBar: MatSnackBar) { }

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
    this.LigneCommande.qte=this._qte
    this.LigneCommande.commande=this.Commande
    this.LigneCommande.product=this.Produit
    this.ProductService.createLigneCommande(this.LigneCommande).subscribe( data =>{
      console.log(data);
      this.ShowNotification('Panier success','Close','4000',"custom-success-style")
      this.reloadComponent()
    },
    error => this.ShowNotification(error,'Close','4000',"custom-error-style"));

  }

  plusqte()
  {
    if(this._qte < parseInt(this.Produit.qteStock+""))
    {
      this._qte=this._qte+1;
    }
    else
    {
      this.ShowNotification('There is no more in the Stock','Close','4000',"custom-plus-mins-style")
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
      this.ShowNotification('1 is the smallest amount possible','Close','4000',"custom-plus-mins-style")
    }
  }

  changeImage(url:string)
  {
    this._url=url
  }

  reloadComponent() 
  {
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

    ShowNotification(content:any, action:any, duration:any,type:any)
    {
      let sb = this.snackBar.open(content, action, {
        duration: duration,
        panelClass: [type]
      });
      sb.onAction().subscribe(() => {
        sb.dismiss();
      });
    }

    SendMail(produit:Produit) {
      var img:any=produit.Image[0]
      const dialogRef = this.dialog.open(ContactSupplierComponent,{
        width:'40%',
        height: '400px',
        data: {email:this.User.email,imgProduct:img,libelle:produit.libelle,
          product_id:produit._id,fullName:this.User.nom+" "+this.User.prenom}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.ShowNotification('Email send we will respond soon','Close','4000',"custom-success-style")
      });
    }
    
}
