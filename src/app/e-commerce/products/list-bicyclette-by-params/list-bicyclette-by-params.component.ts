import { Component, OnInit } from '@angular/core';
import { Produit } from '../../class/produit.class'
import { Univer } from '../../class/univer.class'
import { Categorie } from '../../class/categorie.class'
import { Marque } from '../../class/marque.class'
import { ProductServiceService } from '../product-service.service'
import {PageEvent} from '@angular/material/paginator'; 
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-list-bicyclette-by-params',
  templateUrl: './list-bicyclette-by-params.component.html',
  styleUrls: ['./list-bicyclette-by-params.component.css']
})
export class ListBicycletteByParamsComponent implements OnInit {

  _id: number=-1
  _feature:string=""
  Produits: Produit[]=[];
  ProduitsDisplay: Produit[]=[];
  private pageSlice=this.Produits

  marques: Marque[]=[];
  univers: Univer[]=[];
  categories: Categorie[]=[];

  MinPrice:any;
  MaxPrice:any;

  constructor(private ProductService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params['_id'];
    this._feature = this.route.snapshot.params['_feature'];
    if(this._feature == "ByCategorie")
    {
        this.getBicyclettesByCategorie();
    }
    else{
      this.Produits = []
    }

    this.getMarques()
    this.getUnivers()
    this.getCategories()
    
  }

  getBicyclettesByCategorie(){
    this.ProductService.getBicycletteByCategorie(this._id).subscribe(data => {
      this.Produits = data.products;
      this.ProduitsDisplay=this.Produits
      this.pageSlice=this.ProduitsDisplay.slice(0,10);
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
      if(endIndex > this.Produits.length)
      {
          endIndex = this.Produits.length;
      }
      this.pageSlice=this.Produits.slice(startIndex,endIndex);
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



}
