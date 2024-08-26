import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'signupform', component: RegisterComponent },
  { path: 'loginform', component: LoginComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '', component: ProductListComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
