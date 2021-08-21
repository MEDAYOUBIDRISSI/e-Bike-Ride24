import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Produit } from '../../../e-commerce/class/produit.class'
import { Commande } from '../../../e-commerce/class/commande.class'
import { LigneCommande } from '../../../e-commerce/class/ligneCommande.class'
import { User } from '../../../e-commerce/class/user.class'
import { ProductServiceService } from '../../../e-commerce/products/product-service.service'
import { UserServicesService } from '../../../e-commerce/services/user-services.service'
import { ActivatedRoute,Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {PrintCommandeComponent} from "../print-commande/print-commande.component"

@Component({
  selector: 'app-all-cmd',
  templateUrl: './all-cmd.component.html',
  styleUrls: ['./all-cmd.component.css']
})
export class AllCmdComponent implements OnInit {

  _idAuth = localStorage.getItem('jwt-IDUser')
  _ligneCommandeCharge:boolean=false
  public Produit: Produit={};
  public User: User={}
  public Commande: Commande={};
  public LigneCommandes: any[]=[];

  constructor(private ProductService: ProductServiceService,private UserServices: UserServicesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router){}

  ngOnInit(): void {
    this.getUserAuth()
    this.getLigneCommandeByUser()
  }

  getUserAuth(){
    this.UserServices.getUserAuth(this._idAuth).subscribe(data => {
      this.User = data.User;
    });
  }

  getLigneCommandeByUser()
  {
      this.ProductService.getAllLigneCommandesByUser(this._idAuth).subscribe(data => {
        this.LigneCommandes=data.LigneCommandes
        if(this.LigneCommandes.length!=0)
          {
            this._ligneCommandeCharge=true
          }
        console.log(this.LigneCommandes)
    }, error => console.log(error));
  }

  // printPage() {
  //   window.print();
  // }
  printPage(cmd:any)
    {
      const dialogRef = this.dialog.open(PrintCommandeComponent,{
        width:'100%',
        height: '100%',
        data:{cmd:cmd}
      });
    }

}
