import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductListComponent } from './Components/product-list/product-list.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},  // redirect to `home`
    {path: 'home', component: HomeComponent},
    { path: 'products', component: ProductListComponent },
    {path:"add-product", component: AddProductComponent},
    { path: 'edit-product/:id', component: EditProductComponent },
    {path: '**', component: NotFoundComponent}  // Wildcard route for a 404 page
];
