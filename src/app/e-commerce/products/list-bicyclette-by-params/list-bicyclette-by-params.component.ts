import { Component, OnInit } from '@angular/core';
import { Produit } from '../../class/produit.class'
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
  private pageSlice=this.Produits

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
    
  }

  getBicyclettesByCategorie(){
    this.ProductService.getBicycletteByCategorie(this._id).subscribe(data => {
      this.Produits = data.products;
      this.pageSlice=this.Produits.slice(0,10);
      console.log(this.Produits)
    }); 
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



}
