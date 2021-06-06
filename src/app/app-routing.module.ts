import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutECommerceComponent } from './layouts/layout-e-commerce/layout-e-commerce.component'
import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component'
import { ECommerceModule } from './e-commerce/e-commerce.module'
import { AuthModule } from './auth/auth.module'

const routes: Routes = [
  {
    path:'',
    component:LayoutECommerceComponent,
    children:[
      {
        path:'',
        redirectTo:'',
        pathMatch:'full'
      },
      {
        path:'',
        loadChildren:() => import('./e-commerce/e-commerce.module').then(m => m.ECommerceModule)
      }
    ]
  },
  {
    path:'',
    component:LayoutAuthComponent,
    children:[
      {
        path:'',
        redirectTo:'/auth',
        pathMatch:'full'
      },
      {
        path:'auth',
        loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
