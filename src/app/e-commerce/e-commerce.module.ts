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


@NgModule({
  declarations: [ProfileMainComponent, SectionMainComponent, IndexPageComponent, DealBannerComponent, TrendingComponent, ItemsRecommendedComponent, TradeServicesComponent, ProfilePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ECommerceRoutingModule,
    TranslateModule
  ]
})
export class ECommerceModule { }
