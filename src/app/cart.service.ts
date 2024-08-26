import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(cartItem: CartItem): void {
    const existingItem = this.cartItems.find(item => item.product.id === cartItem.product.id);

    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      this.cartItems.push(cartItem);
    }

    this.cartItemsSubject.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Other cart methods like remove, clear, etc.
}
