import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = []; // Use CartItem model
  total: number = 0;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    // Load cart items from local storage
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    alert("Cart Removed sucessfully")
    this.calculateTotal();
  }
  
}
