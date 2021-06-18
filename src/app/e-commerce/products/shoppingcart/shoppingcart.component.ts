import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Produit } from '../../../e-commerce/class/produit.class'
import { Commande } from '../../../e-commerce/class/commande.class'
import { LigneCommande } from '../../../e-commerce/class/ligneCommande.class'
import { User } from '../../../e-commerce/class/user.class'
import { ProductServiceService } from '../../../e-commerce/products/product-service.service'
import { UserServicesService } from '../../../e-commerce/services/user-services.service'
import { ActivatedRoute,Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  _qte:number=0
  _totalePrice:number=0
  _discount:number=0
  _total:number=0
  _idAuth = localStorage.getItem('jwt-IDUser')
  public Produit: Produit={};
  public User: User={}
  public Commande: Commande={};
  public LigneCommandes: LigneCommande[]=[];

  public payPalConfig ? : IPayPalConfig;

  constructor(private ProductService: ProductServiceService,private UserServices: UserServicesService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.initConfig();
    this.getUserAuth()
    this.getCommandeByUser()
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
    }, error => console.log(error));
  }

  minusQuantity(_idlignecommande:number,LigneCommande:LigneCommande)
  {
    this.ProductService.LigneCommandeMinusQte(_idlignecommande, LigneCommande).subscribe( data =>{
      this.ngOnInit()
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
    this._total = this._totalePrice + this._discount
  }


  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AbgZQT_pay2Z8HH9najEqmextGJbNsoUtF_9Izunbu2zBvxDjHA6lklqAZW1sak5NZsHr2yGm1b2RA_g',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

}
