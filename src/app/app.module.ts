import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HomeComponent } from './home/home.component';
import { ApiDataService } from './services/api-data.service';
import { SlideShowComponent } from './modules/slide-show/slide-show.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { WineListComponent } from './modules/wine-list/wine-list.component';
import { WineCardComponent } from './components/wine-card/wine-card.component';
import { SelectionMenuComponent } from './modules/selection-menu/selection-menu.component';
import { OtherProductsTeaserComponent } from './modules/other-products-teaser/other-products-teaser.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SupportComponent } from './modules/support/support.component';
import { ShopListComponent } from './modules/shop-list/shop-list.component';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from './services/shopping-cart.service';
import { WineDetailDialog } from './modules/detail-dialog/wine-detail-dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { OliveOillComponent } from './modules/olive-oill/olive-oill.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { TagComponent } from './components/tag/tag.component';
import { LikeurenComponent } from './modules/likeuren/likeuren.component';
import { BewarenComponent } from './modules/bewaren/bewaren.component';
import { CharcuterieComponent } from './modules/charcuterie/charcuterie.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SlideShowComponent,
    SidenavListComponent,
    WineListComponent,
    WineCardComponent,
    SelectionMenuComponent,
    OtherProductsTeaserComponent,
    FooterComponent,
    SupportComponent,
    WineDetailDialog,
    ShopListComponent,
    ConfirmDialogComponent,
    OliveOillComponent,
    TagComponent,
    LikeurenComponent,
    BewarenComponent,
    CharcuterieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCarouselModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ApiDataService, WineDetailDialog, ConfirmDialogComponent, ShoppingCartService, CookieService,
              {provide: LocationStrategy, useClass: HashLocationStrategy}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
