import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'; // Import map operator
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products'; // Update to your API URL if needed
  public search=new BehaviorSubject<string>("");
    public productList=new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

 
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productList.next(products))
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) => products.find((product: Product) => product.id === id)!)
    );
  }
}
