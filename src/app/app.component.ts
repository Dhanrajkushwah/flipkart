import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from './models/cartItem.model';
import { Product } from './models/product.model';
import { ProductService } from './product.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Login';
  showFiller = false;
  cart: CartItem[] = [];
  totalQuantity: number = 0;
  searchText: string = '';
  products: Product[] = []; 
  filteredProducts: Product[] = []; 

  public totalItem: number = 0;

  constructor(private router: Router, private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products; // Initialize filteredProducts with all products
      this.totalItem = products.length;
    });

    this.cartService.cartItems$.subscribe((cartItems: CartItem[]) => {
      this.cart = cartItems;
      this.totalQuantity = this.calculateTotalQuantity();
    });
  }

  calculateTotalQuantity(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  calculateTotalPrice(): number {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.searchText) {
      this.filteredProducts = this.products.filter(product =>
        product.category.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
