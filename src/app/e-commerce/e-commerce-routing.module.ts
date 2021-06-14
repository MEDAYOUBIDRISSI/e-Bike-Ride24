import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { IndexPageComponent } from './pages/index-page/index-page.component'
import { AllProductsPageComponent } from './pages/all-products-page/all-products-page.component'

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
