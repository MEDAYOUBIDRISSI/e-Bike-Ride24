import { Component, OnInit } from '@angular/core';

import { Produit } from '../../../e-commerce/class/produit.class'
import { Commande } from '../../../e-commerce/class/commande.class'
import { LigneCommande } from '../../../e-commerce/class/ligneCommande.class'
import { User } from '../../../e-commerce/class/user.class'
import { Categorie } from '../../../e-commerce/class/categorie.class';
import { Marque } from '../../../e-commerce/class/marque.class';
import { Univer } from '../../../e-commerce/class/univer.class';
import { ProductServiceService } from '../../../e-commerce/products/product-service.service'
import { UserServicesService } from '../../../e-commerce/services/user-services.service'
import { SocialAuthService } from "angularx-social-login"; 
import { Router } from '@angular/router';
declare var jQuery:any;
declare var $:any;

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
  public Categories: Categorie[]=[];
  public CategoriesOfBike: Categorie[]=[];
  public CategoriesOfAccessoireOfBikes: Categorie[]=[];
  public CategoriesOfAccessoireOfBikers: Categorie[]=[];

  Univers: Univer[]=[];
  MarqueOfBike: Marque[]=[];
  MarqueOfAccessoire: Marque[]=[];
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
    this.getCategories()
    this.getUnivers()
    this.getCategoriesOfBike()
    this.getCategoriesOfAccessoiresOfBikers()
    this.getCategoriesOfAccessoiresOfBike()
    this.getMarqueOfAccessoire()
    this.getMarqueOfBike()
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
  
  toggle(){
    $('.offcanvas-collapse').toggleClass('open');
  }

  getCategories(){
    this.ProductService.getCategoriesList().subscribe(data => {
      this.Categories = data.categories;
    }); 
  }

  getCategoriesOfBike(){
    this.ProductService.getCategoriesListOfBike().subscribe(data => {
      this.CategoriesOfBike = data.categories;
    }); 
  }

  getCategoriesOfAccessoiresOfBike(){
    this.ProductService.getCategoriesListOfAccessoiresOfBike().subscribe(data => {
      this.CategoriesOfAccessoireOfBikes = data.categories;
    }); 
  }

  getCategoriesOfAccessoiresOfBikers(){
    this.ProductService.getCategoriesListOfAccessoiresOfBikers().subscribe(data => {
      this.CategoriesOfAccessoireOfBikers = data.categories;
    }); 
  }

  getMarqueOfBike(){
    this.ProductService.getMarquesListOfBike().subscribe(data => {
      this.MarqueOfBike = data.Marques;
    }); 
  }

  getMarqueOfAccessoire(){
    this.ProductService.getMarqueListOfAccessoires().subscribe(data => {
      this.MarqueOfAccessoire = data.Marques;
    }); 
  }

  getUnivers(){
    this.ProductService.getUniversList().subscribe(data => {
      this.Univers = data.univers;
    }); 
  } 

  anotherReloadComponent(_url:any) 
  {
    let currentUrl = _url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  BikesByUser(_id:number)
  {
    this.router.navigate(['list-bikes',"ByUniver", _id]);
    this.anotherReloadComponent("list-bikes/ByUniver/"+_id)

  }

  BikesByCategorie(_id:number)
  {
    this.router.navigate(['list-bikes',"ByCategorie", _id]);
    this.anotherReloadComponent("list-bikes/ByCategorie/"+_id)
  }

  BikesByMarque(_id:number)
  {
    this.router.navigate(['list-bikes',"ByMarque", _id]);
    this.anotherReloadComponent("list-bikes/ByMarque/"+_id)
  }

  AccessorieByMarque(_id:number)
  {
    this.router.navigate(['list-Accessoires',"ByMarque", _id]);
    this.anotherReloadComponent("list-Accessoires/ByMarque/"+_id)
  }

  BikesByAccessorieOfBike(_id:number)
  {
    this.router.navigate(['list-Accessoires',"ByAccessorieOfBike", _id]);
    this.anotherReloadComponent("list-Accessoires/ByAccessorieOfBike/"+_id)
  }

  BikesByAccessorieOfBikers(_id:number)
  {
    this.router.navigate(['list-Accessoires',"ByAccessorieOfBikers", _id]);
    this.anotherReloadComponent("list-Accessoires/ByAccessorieOfBikers/"+_id)
  }
}
