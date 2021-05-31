import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileMainComponent } from './profile-main/profile-main.component'
import { IndexPageComponent } from './pages/index-page/index-page.component'

const routes: Routes = [
  {
    path:'index',
    component:IndexPageComponent,
    children:[
      {
        path:'bikeride',
        component:IndexPageComponent
      }
    ] 
  },
  {
    path:'profile',
    component:ProfileMainComponent,
    children:[
      {
        path:'bikeride',
        component:ProfileMainComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
