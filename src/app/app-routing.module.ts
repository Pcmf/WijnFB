import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BewarenComponent } from './modules/bewaren/bewaren.component';
import { CharcuterieComponent } from './modules/charcuterie/charcuterie.component';
import { LikeurenComponent } from './modules/likeuren/likeuren.component';
import { OliveOillComponent } from './modules/olive-oill/olive-oill.component';
import { ShopListComponent } from './modules/shop-list/shop-list.component';
const routes: Routes = [
  {path: 'bewaren', component: BewarenComponent},
  {path: 'charcuterie', component: CharcuterieComponent},
  {path: 'likeuren', component: LikeurenComponent},
  {path: 'oliveoil', component: OliveOillComponent},
  {path: 'shopcart', component: ShopListComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
