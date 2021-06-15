import { Component, OnInit } from '@angular/core';
import { Produit } from '../../class/produit.class'
import { ProductServiceService } from '../product-service.service'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageEvent} from '@angular/material/paginator'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

   Produits: Produit[]=[];
  private pageSlice=this.Produits

  constructor(private ProductService: ProductServiceService,
    private router: Router,public dialog: MatDialog) { } 

    ngOnInit(): void {
    this.getProduits();
  }

  getProduits(){
    this.ProductService.getBicyclettesList().subscribe(data => {
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
