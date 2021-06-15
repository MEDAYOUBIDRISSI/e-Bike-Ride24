import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { IndexPageComponent } from './pages/index-page/index-page.component'
import { AllProductsPageComponent } from './pages/all-products-page/all-products-page.component'
import { DetailBicycletteComponent } from './products/detail-bicyclette/detail-bicyclette.component'
import { DetailAccessoireCyclisteComponent } from './products/detail-accessoire-cycliste/detail-accessoire-cycliste.component'
import { DetailAccessoireVeloComponent } from './products/detail-accessoire-velo/detail-accessoire-velo.component'

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
