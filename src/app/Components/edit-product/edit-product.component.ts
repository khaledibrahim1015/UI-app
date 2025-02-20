import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { ProductResponse } from '../../Models/product-response';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateProductCommand } from '../../Models/update-product-command';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productForm :FormGroup;
  productId!: number;
  constructor(
    private route:ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router : Router
  ) { 
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(1)]],
    });

  }


  ngOnInit(): void {
   this.productId =  +this.route.snapshot.paramMap.get('id')!;
   this.loadProduct();
  }
  loadProduct() {
    // Call the service to get the product by ID
    this.productService.getProductById(this.productId)
    .subscribe({
      next: (product: ProductResponse) => {
        this.productForm.patchValue(product); // Populate form with product data

      },
      error: err => console.error('Error loading product:', err)
    })
  }


  onSubmit(){
    if(this.productForm.valid){
      const updatedProduct = { ...this.productForm.value, id: this.productId };
      this.productService.updateProduct(updatedProduct as UpdateProductCommand)
      .subscribe({  
        next: () => {
          console.log('Product updated successfully');
          this.router.navigate(['/products']);
        },
        error: err => console.error('Error updating product:'),
      });

  }
}
}