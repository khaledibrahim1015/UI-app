import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponsePagination } from '../Models/product-response-pagination';
import { Observable } from 'rxjs';
import { ProductResponse } from '../Models/product-response';
import { CreateProductCommand } from '../Models/create-product-command';
import { UpdateProductCommand } from '../Models/update-product-command';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:5037/api/product';  

  constructor(private httpClient: HttpClient) { }

 // Get all products with pagination and search
 
 getProducts(pageIndex: number, pageSize: number, search: string = "")
    : Observable<ProductResponsePagination> {
    const url = `${this.apiUrl}/PaginatedProducts`;
    const body = { pageIndex, pageSize, search };
    console.log('Request URL:', url); // Log the URL
    return this.httpClient.post<ProductResponsePagination>(url, body);
}
 // Get a single product by ID
getProductById(id: number):Observable<ProductResponse>{
  const url = `${this.apiUrl}/${id}`;
  return this.httpClient.get<ProductResponse>(url);
}

  // Add a new product
  addProduct(product: CreateProductCommand): Observable<ProductResponse> {
    return this.httpClient.post<ProductResponse>(this.apiUrl, product);
  }

  // Update a product
  updateProduct(product: UpdateProductCommand): Observable<void> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.httpClient.put<void>(url, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }





}
