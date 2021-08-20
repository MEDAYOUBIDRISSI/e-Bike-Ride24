import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { SectionMainComponent } from './index/section-main/section-main.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { DealBannerComponent } from './index/deal-banner/deal-banner.component';
import { TrendingComponent } from './index/trending/trending.component';
import { ItemsRecommendedComponent } from './index/items-recommended/items-recommended.component';
import { TradeServicesComponent } from './index/trade-services/trade-services.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { AllProductsPageComponent } from './pages/all-products-page/all-products-page.component';
import { DetailBicycletteComponent } from './products/detail-bicyclette/detail-bicyclette.component';
import { DetailAccessoireVeloComponent } from './products/detail-accessoire-velo/detail-accessoire-velo.component';
import { DetailAccessoireCyclisteComponent } from './products/detail-accessoire-cycliste/detail-accessoire-cycliste.component';
import { ShoppingcartComponent } from './products/shoppingcart/shoppingcart.component';
import { NgxPayPalModule } from 'ngx-paypal';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ListBicycletteByParamsComponent } from './products/list-bicyclette-by-params/list-bicyclette-by-params.component';
import { ChatBootComponent } from './supporArea/chat-boot/chat-boot.component';
import { AllCmdComponent } from './products/all-cmd/all-cmd.component';
import { ListAccessoireByParamsComponent } from './products/list-accessoire-by-params/list-accessoire-by-params.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ServiceAtHomePageComponent } from './pages/service-at-home-page/service-at-home-page.component';
import { PaymentComponent } from './products/payment/payment.component';


@NgModule({
  declarations: [ProfileMainComponent, SectionMainComponent, IndexPageComponent, DealBannerComponent, TrendingComponent, ItemsRecommendedComponent, TradeServicesComponent, ProfilePageComponent, AllProductsComponent, AllProductsPageComponent, DetailBicycletteComponent, DetailAccessoireVeloComponent, DetailAccessoireCyclisteComponent, ShoppingcartComponent, ListBicycletteByParamsComponent, ChatBootComponent, AllCmdComponent, ListAccessoireByParamsComponent, ReviewPageComponent, ServiceAtHomePageComponent, PaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ECommerceRoutingModule,
    TranslateModule,
    NgxPayPalModule,
    MatPaginatorModule
  ]
}) 
export class ECommerceModule { }
