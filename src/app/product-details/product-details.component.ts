import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../cart.service';
import { CartItem } from '../models/cartItem.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe(product => {
      if (product) {
        this.product = product;
      }
    });
  }

  addToCart(): void {
    const cartItem: CartItem = {
      id: this.product.id, // Assuming CartItem id is a number
      product: this.product,
      quantity: 1,
      isSaved: false,
    };
    alert("Cart Added sucessfully")
    this.cartService.addToCart(cartItem);
    
  }
}
