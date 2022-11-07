import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BewarenComponent } from './modules/bewaren/bewaren.component';
import { CharcuterieComponent } from './modules/charcuterie/charcuterie.component';
import { LikeurenComponent } from './modules/likeuren/likeuren.component';
import { OliveOillComponent } from './modules/olive-oill/olive-oill.component';
import { ShopListComponent } from './modules/shop-list/shop-list.component';
import { FavoritsComponent } from './modules/favorits/favorits.component';
import { UnderAgeComponent } from './modules/under-age/under-age.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AboutComponent } from './modules/about/about.component';

const routes: Routes = [
  {path: 'under', component: UnderAgeComponent},
  {path: 'favorits', component: FavoritsComponent, canActivate: [AuthGuardService]},
  {path: 'bewaren', component: BewarenComponent, canActivate: [AuthGuardService]},
  {path: 'charcuterie', component: CharcuterieComponent, canActivate: [AuthGuardService]},
  {path: 'likeuren', component: LikeurenComponent, canActivate: [AuthGuardService]},
  {path: 'oliveoil', component: OliveOillComponent, canActivate: [AuthGuardService]},
  {path: 'shopcart', component: ShopListComponent, canActivate: [AuthGuardService]},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuardService]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],



exports: [RouterModule]
})
export class AppRoutingModule { }
