import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Example method to check if the user is authenticated
  isAuthenticated(): boolean {
    // Implement your logic to check authentication, e.g., token check
    return !!localStorage.getItem('token'); // Example using localStorage
  }
}
