import { Component, OnInit } from '@angular/core';
import { Produit } from '../../class/produit.class'
import { Univer } from '../../class/univer.class'
import { Categorie } from '../../class/categorie.class'
import { Marque } from '../../class/marque.class'
import { ProductServiceService } from '../product-service.service'
import { Router,ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageEvent} from '@angular/material/paginator'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../../class/user.class'
import { UserServicesService } from '../../../e-commerce/services/user-services.service'
import { ContactSupplierComponent} from '../contact-supplier/contact-supplier.component'

@Component({
  selector: 'app-searche-page',
  templateUrl: './searche-page.component.html',
  styleUrls: ['./searche-page.component.css']
})
export class SearchePageComponent implements OnInit {

  Produits: Produit[]=[];
  ProduitsDisplay: Produit[]=[];
  private pageSlice=this.Produits

  marques: Marque[]=[];
  univers: Univer[]=[];
  categories: Categorie[]=[];
  public User: User={}
  _idAuth = localStorage.getItem('jwt-IDUser')

  MinPrice:any;
  MaxPrice:any;

  _Type:any
  _MotsCles:any

  constructor(private ProductService: ProductServiceService,private UserServices: UserServicesService,
    private router: Router,private route: ActivatedRoute,public dialog: MatDialog,
    private snackBar: MatSnackBar) { } 

    ngOnInit(): void {
      this._Type = this.route.snapshot.params['_Type'];
      this._MotsCles = this.route.snapshot.params['_MotsCles'];
    this.getProduits(this._MotsCles,this._Type);
    this.getMarques()
    this.getUnivers()
    this.getCategories()
    this.getUserAuth()
  }

  getUserAuth(){
    this.UserServices.getUserAuth(this._idAuth).subscribe(data => {
      this.User = data.User;
    });
  }

  getProduits(_MotsCles:any,_Type:any){
    this.ProductService.getProductsListBySearch(_MotsCles,_Type).subscribe(data => {
      this.Produits = data.products;
      this.ProduitsDisplay=this.Produits
      this.pageSlice=this.ProduitsDisplay.slice(0,10);
      if(this.Produits.length==0)
      {
        this.ShowNotification('No Product existe, change Type Or Name','Close','8000',"custom-error-style")
      }
    }); 
  }

  sliceChange()
  {
    this.pageSlice=this.ProduitsDisplay.slice(0,10);
  }

  OnPageChange(event : PageEvent)
  {
      console.log(event)
      const startIndex = event.pageIndex * event.pageSize;
      let endIndex = startIndex + event.pageSize;
      if(endIndex > this.ProduitsDisplay.length)
      {
          endIndex = this.ProduitsDisplay.length;
      }
      this.pageSlice=this.ProduitsDisplay.slice(startIndex,endIndex);
  } 

  DetailProduct(_id: number,typeProduct:string){ 
    if(typeProduct == "Bicyclette")
    {
      this.router.navigate(['detailBicyclette', _id]);
    }
    else if(typeProduct == "AccessoireVelo")
    {
      this.router.navigate(['detailAccessoireVelo', _id]);
    }
    else if(typeProduct == "AccessoireCycliste")
    {
      this.router.navigate(['detailAccessoireCycliste', _id]);
    }
     
  } 

  getMarques()
    {
      this.ProductService.getMarquesList().subscribe(data => {
        this.marques = data.Marque;
      }, error => console.log(error));
    }

    getUnivers()
    {
      this.ProductService.getUniversList().subscribe(data => {
        this.univers = data.univers;
      }, error => console.log(error));
    }

    getCategories(){
      this.ProductService.getCategoriesList().subscribe(data => {
        this.categories = data.categories;
      }); 
    }


    OnChange(event: any) {
      this.ProduitsDisplay = [];

      for (var i = 0; i < this.selectedBrand.length; i++) {
        var lst = this.Produits.filter(x => x.Marque?.libelle == this.selectedBrand[i].libelle);
        for (var j = 0; j < lst.length; j++) {
          this.ProduitsDisplay.push(lst[j]);
        }
      }

      if (this.selectedBrand.length > 0) {
        if (this.selectedOS.length > 0) {
          var tempProductlst = this.ProduitsDisplay;
          this.ProduitsDisplay = [];
          for (var i = 0; i < this.selectedOS.length; i++) {
            //Filtering the same list which was filtered in brand list
            var lst = tempProductlst.filter(x => x.Univer?.libelle == this.selectedOS[i].libelle);
            for (var j = 0; j < lst.length; j++) {
              this.ProduitsDisplay.push(lst[j]);
            }
          }
        }
      }
      else {
        for (var i = 0; i < this.selectedOS.length; i++) {
          //filtering the original product list
          var lst = this.Produits.filter(x => x.Univer?.libelle == this.selectedOS[i].libelle);
          for (var j = 0; j < lst.length; j++) {
            this.ProduitsDisplay.push(lst[j]);
          }
        }
      }


      if (this.selectedBrand.length > 0 || this.selectedOS.length > 0) {
        if (this.selectedNetwork.length > 0) {
          var tempProductlst = this.ProduitsDisplay;
          this.ProduitsDisplay = [];
          for (var i = 0; i < this.selectedNetwork.length; i++) {
            //filtering from the same list filtered in Brand and OS
            var lst = tempProductlst.filter(x => x.categorie?.libelle == this.selectedNetwork[i].libelle);
            for (var j = 0; j < lst.length; j++) {
              this.ProduitsDisplay.push(lst[j]);
            }
          }
        }
      }
      else {
        for (var i = 0; i < this.selectedNetwork.length; i++) {
          //filtering from original product list
          var lst = this.Produits.filter(x => x.categorie?.libelle == this.selectedNetwork[i].libelle);
          for (var j = 0; j < lst.length; j++) {
            this.ProduitsDisplay.push(lst[j]);
          }
        }
      }
  
      //If no checkbox is selected assign original product list to display product list
      if (this.selectedBrand.length == 0 && this.selectedOS.length == 0 && this.selectedNetwork.length == 0) {
        this.ProduitsDisplay = this.Produits;
      }

      //Price Filter
      if(this.MaxPrice!=undefined && this.MinPrice!=undefined)
      {
        this.filterByPrice()
      }

      this.sliceChange()

    }

    get selectedBrand() {
      //Get all the selected brands
      return this.marques.filter(opt => opt.Checked)
    }

    get selectedOS() {
      //Get all the selected Operating systems
      return this.univers.filter(opt => opt.Checked)
    }
  
    get selectedNetwork() {
      //Get all the selected networks
      return this.categories.filter(opt => opt.Checked)
    }


    filterByPrice()
    {
        this.ProduitsDisplay = this.ProduitsDisplay.filter(item => parseFloat(item.prixVent+"") >= this.MinPrice && parseFloat(item.prixVent+"")<=this.MaxPrice);
        this.sliceChange()
    }

    sort(event: any) {
      switch (event.target.value) {
        case "Low":
          {
            this.ProduitsDisplay = this.ProduitsDisplay.sort((low, high) => low.prixVent - high.prixVent);
            this.sliceChange()
            break;
          }
  
        case "High":
          {
            this.ProduitsDisplay = this.ProduitsDisplay.sort((low, high) => high.prixVent - low.prixVent);
            this.sliceChange()
            break;
          }
  
        default: {
           this.getProduits()
          break;
        }
  
      }
      return this.ProduitsDisplay;
  
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

}
