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
import { ListAccessoireByParamsComponent } from './products/list-accessoire-by-params/list-accessoire-by-params.component'
import { AllCmdComponent } from './products/all-cmd/all-cmd.component'
import { ReviewPageComponent } from './pages/review-page/review-page.component'
import { ServiceAtHomePageComponent } from './pages/service-at-home-page/service-at-home-page.component'
import { SearchePageComponent } from './products/searche-page/searche-page.component'

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
    path:'review',
    component:ReviewPageComponent,
    children:[
      {
        path:'',
        component:ReviewPageComponent
      }
    ] 
  },
  {
    path:'service-at-home',
    component:ServiceAtHomePageComponent,
    children:[
      {
        path:'',
        component:ServiceAtHomePageComponent
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
  // {
  //   path:'payement',
  //   component:PaymentComponent,
  //   children:[
  //     {
  //       path:'',
  //       component:PaymentComponent
  //     }
  //   ] 
  // },
  {
    path:'list-bikes/:_feature/:_id',
    component:ListBicycletteByParamsComponent,
    children:[
      {
        path:'',
        component:ListBicycletteByParamsComponent
      }
    ] 
  },
  {
    path:'list-Accessoires/:_feature/:_id',
    component:ListAccessoireByParamsComponent,
    children:[
      {
        path:'',
        component:ListAccessoireByParamsComponent
      }
    ] 
  },
  {
    path:'shoping-all',
    component:AllCmdComponent,
    children:[
      {
        path:'',
        component:AllCmdComponent
      }
    ] 
  },
  {
    path:'Searche/:_MotsCles/:_Type',
    component:SearchePageComponent,
    children:[
      {
        path:'',
        component:SearchePageComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
