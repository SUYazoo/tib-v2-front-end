import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsProduitsComponent } from './pages/details-produits/details-produits.component';
import { ProductsService } from './core/services/products.service';


const routes: Routes = [
  { path : '' , 
    redirectTo: '/home',
    pathMatch:'full'
  },
  { path: 'home', component: HomeComponent },
  { path : 'details-produits', component: DetailsProduitsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProductsService]
})
export class AppRoutingModule { }
