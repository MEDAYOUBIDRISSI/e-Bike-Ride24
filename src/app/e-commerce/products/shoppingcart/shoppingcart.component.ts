import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Produit } from '../../../e-commerce/class/produit.class'
import { Commande } from '../../../e-commerce/class/commande.class'
import { LigneCommande } from '../../../e-commerce/class/ligneCommande.class'
import { User } from '../../../e-commerce/class/user.class'
import { Coupon } from '../../../e-commerce/class/coupon.class'
import { ProductServiceService } from '../../../e-commerce/products/product-service.service'
import { UserServicesService } from '../../../e-commerce/services/user-services.service'
import { ActivatedRoute,Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { PaymentComponent } from '../payment/payment.component'
  
@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  _ligneCommandeCharge:boolean=false
  _qte:number=0
  _totalePrice:number=0
  _discount:number=0
  _total:number=0
  _coupon:string=""
  _couponText:string="Have coupon?"
  _couponVerified:boolean=false
  _idAuth = localStorage.getItem('jwt-IDUser')
  public Produit: Produit={};
  public User: User={}
  public Coupon: Coupon={pourcentage:0}
  public Commande: Commande={};
  public LigneCommandes: LigneCommande[]=[];

  public payPalConfig ? : IPayPalConfig;

  constructor(private ProductService: ProductServiceService,private UserServices: UserServicesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog){}

  ngOnInit(): void {
    // this.initConfig();
    this.getUserAuth()
    this.getCommandeByUser()
  }

  makePurchase(): void {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width:'100%',
      height: '450px',
      data: this._total.toString()
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.commandePayee()
      }
    });
  }

  getCommandeByUser()
  {
      this.ProductService.getCommandeByUser(this._idAuth).subscribe(data => {
        this.Commande=data.commande
        this.Commande
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
      console.log(this.LigneCommandes.length)
      if(this.LigneCommandes.length!=0)
      {
        this._ligneCommandeCharge=true
      }
      this.totalPrice()
      this.Total()
  }, error => console.log(error));
  }

  deleteLigneCommande(_id: number){
    this.ProductService.deleteLigneCommande(_id).subscribe( data => {
      this.getCommandeByUser()
    }, error => console.log(error));
  }

  addQuantity(_idlignecommande:number,LigneCommande:LigneCommande)
  {
    this.ProductService.LigneCommandeAddQte(_idlignecommande, LigneCommande).subscribe( data =>{
      this.ngOnInit()
      this.TotalAfterSearche()
    }, error => console.log(error));
  }

  minusQuantity(_idlignecommande:number,LigneCommande:LigneCommande)
  {
    this.ProductService.LigneCommandeMinusQte(_idlignecommande, LigneCommande).subscribe( data =>{
      this.ngOnInit()
      this.TotalAfterSearche()
    }, error => console.log(error));
  }

  reloadComponent() 
  {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
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

  TotalAfterSearche()
  {
    this._total = this._totalePrice - this._discount
    this.CouponSearch()
  }


  // private initConfig(): void {
  //   this.payPalConfig = {
  //   currency: 'USD',
  //   clientId: 'AbgZQT_pay2Z8HH9najEqmextGJbNsoUtF_9Izunbu2zBvxDjHA6lklqAZW1sak5NZsHr2yGm1b2RA_g',
  //   createOrderOnClient: (data) => <ICreateOrderRequest>{
  //     intent: 'CAPTURE',
  //     purchase_units: [
  //       {
  //         amount: {
  //           currency_code: 'USD',
  //           value: this._total.toString(),
  //           breakdown: {
  //             item_total: {
  //               currency_code: 'USD',
  //               value: this._total.toString()
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   },
  //   advanced: {
  //     commit: 'true'
  //   },
  //   style: {
  //     label: 'paypal',
  //     layout: 'vertical'
  //   },
  //   onApprove: (data, actions) => {
  //     console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //     actions.order.get().then(details => {
  //       console.log('onApprove - you can get full order details inside onApprove: ', details);
  //     });
  //   },
  //   onClientAuthorization: (data) => {
  //     console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
  //     this.showSuccess = true;
  //     this.commandePayee()

  //   },
  //   onCancel: (data, actions) => {
  //     console.log('OnCancel', data, actions);
  //   },
  //   onError: err => {
  //     console.log('OnError', err);
  //   },
  //   onClick: (data, actions) => {
  //     console.log("click wa9ila")
  //     console.log('onClick', data, actions);
  //   },
  // };
  // }

  commandePayee()
  {
    this.ProductService.updateCommande(this.Commande._id,this.Commande).subscribe(data => {
      alert("commande Validee")
      this.ngOnInit()
    }, error => console.log(error));
  }

  CouponSearch()
  {
    if(this._couponVerified==true)
      {
        this._couponText="You have used capon before"
      }
      else
      {
        this.ProductService.getCouponByCoudeCoupon(this._coupon).subscribe(data => {
          this.Coupon = data.Coupon;
          this._discount=this._total-(this._total-(this._total*(this.Coupon.pourcentage/100)))
          this._discount=this._discount.toFixed(2)
          this._total-=this._discount
          this._total=this._total.toFixed(2)
          this._couponText="Coupon "+this.Coupon.libelle+" is valide "
          this._couponVerified=true
          // this._coupon=""
          console.log(this._discount)
        }, error => this._couponText="Coupon expired or Not Valide");this._coupon="";
      }
  }

  ContinueShopping()
  {
    this.router.navigate(['all-products']);
  }

}
