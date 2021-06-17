import { Component, OnInit } from '@angular/core';

import { Produit } from '../../../e-commerce/class/produit.class'
import { Commande } from '../../../e-commerce/class/commande.class'
import { LigneCommande } from '../../../e-commerce/class/ligneCommande.class'
import { User } from '../../../e-commerce/class/user.class'
import { ProductServiceService } from '../../../e-commerce/products/product-service.service'
import { UserServicesService } from '../../../e-commerce/services/user-services.service'
import { SocialAuthService } from "angularx-social-login"; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-nave-bare',
  templateUrl: './nave-bare.component.html',
  styleUrls: ['./nave-bare.component.css']
})
export class NaveBareComponent implements OnInit {

  lang:any;
  isLoging:boolean=false;
  _numberofpurchases:number=0
  _totalePrice:number=0
  _discount:number=0
  _total:number=0
  _idAuth = localStorage.getItem('jwt-IDUser')
  public Produit: Produit={};
  public User: User={}
  public Commande: Commande={};
  public LigneCommandes: LigneCommande[]=[];
  constructor(private authService: SocialAuthService,private ProductService: ProductServiceService,
  private UserServices: UserServicesService,private router: Router){}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    if(!localStorage.getItem("jwt-Token"))
    {
      this.isLoging=true;
    }

    this.getUserAuth()
    this.getCommandeByUser()
  }
  changeLang(lang:any)
  {
    localStorage.setItem("lang",lang.target.value);
    window.location.reload();
  }

  changeLanguageToEnglish()
  {
    localStorage.setItem("lang","en");
    window.location.reload();
  }
  changeLanguageToFrensh()
  {
    localStorage.setItem("lang","fr");
    window.location.reload();
  }

  getCommandeByUser()
  {
      this.ProductService.getCommandeByUser(this._idAuth).subscribe(data => {
        this.Commande=data.commande
        this.getLigneCommandeByCommande(this.Commande._id)
    }, error => console.log(error));
  }

  getUserAuth(){
    this.UserServices.getUserAuth(this._idAuth).subscribe(data => {
      this.User = data.User;
    });
  }

  getLigneCommandeByCommande(commandeId:any)
  {
    this.ProductService.getCommandeByCommande(commandeId).subscribe(data => {
      this.LigneCommandes=data.LigneCommande
      this._numberofpurchases=this.LigneCommandes.length
      this.totalPrice()
      this.Total()
  }, error => console.log(error));
  }

  deleteLigneCommande(_id: number){
    this.ProductService.deleteLigneCommande(_id).subscribe( data => {
      console.log(data);
      this.getCommandeByUser()
    }, error => console.log(error));
  }

  signOut():void{
    this.authService.signOut().then().catch(err => console.log(err));
    this.signOutFromLocalStorage()
  }

  signOutFromLocalStorage()
  {
    localStorage.removeItem('jwt-Token');
    localStorage.removeItem('jwt-IDUser');
    this.reloadComponent()
  }


  reloadComponent() 
  {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  addQuantity(_idlignecommande:number,LigneCommande:LigneCommande)
  {
    this.ProductService.LigneCommandeAddQte(_idlignecommande, LigneCommande).subscribe( data =>{
      this.ngOnInit()
    }, error => console.log(error));
  }

  minusQuantity(_idlignecommande:number,LigneCommande:LigneCommande)
  {
    this.ProductService.LigneCommandeMinusQte(_idlignecommande, LigneCommande).subscribe( data =>{
      this.ngOnInit()
    }, error => console.log(error));
  }

  totalPrice()
  {
    this._totalePrice=0
    for (var productPrice of this.LigneCommandes) {
      this._totalePrice = this._totalePrice+(productPrice.product?.prixVent * productPrice.qte)
    }
  }

  Total()
  {
    this._total = this._totalePrice - this._discount
  }
}
