import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../Models/product-response';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
products : ProductResponse[] = [];

currentPage = 1;
pageSize = 10;
totalCount = 0;
searchQuery = '';
pages: number[] = [];
constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getProducts(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe({
        next: (data) => {
          console.log('Products:', data);
          this.products = data.data || [];
          this.totalCount = data.count;
          this.pages = Array.from({ length: Math.ceil(this.totalCount / this.pageSize) }, (_, i) => i + 1);
          console.log('Pages:', this.pages);
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        },
      });
  }

  onSearch():void{
    this.currentPage =1;
    this.loadProducts();
  }
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts(); 
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      },
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

}
