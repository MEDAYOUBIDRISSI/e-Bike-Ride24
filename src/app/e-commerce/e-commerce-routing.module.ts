import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { IndexPageComponent } from './pages/index-page/index-page.component'
import { AllProductsPageComponent } from './pages/all-products-page/all-products-page.component'
import { DetailBicycletteComponent } from './products/detail-bicyclette/detail-bicyclette.component'
import { DetailAccessoireCyclisteComponent } from './products/detail-accessoire-cycliste/detail-accessoire-cycliste.component'
import { DetailAccessoireVeloComponent } from './products/detail-accessoire-velo/detail-accessoire-velo.component'
import { ShoppingcartComponent } from './products/shoppingcart/shoppingcart.component'
import { ListBicycletteByParamsComponent } from './products/list-bicyclette-by-params/list-bicyclette-by-params.component'

const routes: Routes = [
  {
    path:'index',
    component:IndexPageComponent,
    children:[
      {
        path:'',
        component:IndexPageComponent
      }
    ] 
  },
  {
    path:'profile',
    component:ProfilePageComponent,
    children:[
      {
        path:'',
        component:ProfilePageComponent
      }
    ] 
  },
  {
    path:'all-products',
    component:AllProductsPageComponent,
    children:[
      {
        path:'',
        component:AllProductsPageComponent
      }
    ] 
  },
  {
    path:'detailBicyclette/:_id',
    component:DetailBicycletteComponent,
    children:[
      {
        path:'',
        component:DetailBicycletteComponent
      }
    ] 
  },
  {
    path:'detailAccessoireCycliste/:_id',
    component:DetailAccessoireCyclisteComponent,
    children:[
      {
        path:'',
        component:DetailAccessoireCyclisteComponent
      }
    ] 
  },
  {
    path:'detailAccessoireVelo/:_id',
    component:DetailAccessoireVeloComponent,
    children:[
      {
        path:'',
        component:DetailAccessoireVeloComponent
      }
    ] 
  },
  {
    path:'shoping-cart',
    component:ShoppingcartComponent,
    children:[
      {
        path:'',
        component:ShoppingcartComponent
      }
    ] 
  },
  {
    path:'list-bikes/:feature/:_id',
    component:ListBicycletteByParamsComponent,
    children:[
      {
        path:'',
        component:ListBicycletteByParamsComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
