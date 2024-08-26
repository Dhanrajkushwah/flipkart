import { Component, ElementRef, Input, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  currentSlide: number = 0;
  slidesToShow: number = 4;


  @Input() searchText: string = ''; // Receive the search text from parent component
 
  productList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  images: string[] = ['https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/39b352d7d7ae094b.jpg?q=90',
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/44fe68e438b997c9.jpeg?q=90',
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/b05db66d26666a4d.jpg?q=90',
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/20a160ef30776af8.jpeg?q=90',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/17821708e64ed52d.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/4732d7a1b8921f82.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/81a6ce54a0a3230a.jpg?q=20'];
  ads: string[] = [
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/379d14b1296f8bb4.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/7e09f9adb5eae9ec.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/e959f551fe7da4bf.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/09ada0f48b8e2bb7.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/5a82189aa8558364.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/07257dd303936283.png?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/24b3a35f26a0bb4b.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/c45c807df9d7d859.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/ea6fb437742bfba8.jpg?q=20'
  ];
  index = 0;
  deviation: any;
  sliderInterval: any;

  finishesLoading: boolean | undefined;
  customerId: string | undefined;
  filteredProducts = [...this.products];
  @ViewChildren('panelItems') panelItemsRef!: QueryList<ElementRef>

  @ViewChildren('sliderImages') sliderImages!: QueryList<any>
  sliderRev: boolean | undefined;
  constructor(private productService: ProductService) { }
  prevSlide(): void {
    this.currentSlide = Math.max(this.currentSlide - 1, 0);
  }

  nextSlide1(): void {
    const maxIndex = this.products.length - this.slidesToShow;
    this.currentSlide = Math.min(this.currentSlide + 1, maxIndex);
  }

  getTransform(): string {
    return `translateX(-${this.currentSlide * (100 / this.slidesToShow)}%)`;
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log("image")
    });
    this.productService.getProducts().subscribe(products => {
      this.productList.next(products);
      this.filterProducts(this.searchText); // Initial filter based on the search text
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchText']) {
      this.filterProducts(this.searchText); // Re-filter products when searchText changes
    }
  }


  startSlider(): void {
    this.sliderInterval = window.setInterval(() => {
      if (this.index === this.sliderImages.length - 1) {
        this.deviation = { 'transform': 'translateX(0)' };
        this.index = 0;
      } else {
        const incrementWidth = 100 * (this.index + 1);
        this.deviation = { 'transform': 'translateX(-' + incrementWidth + '%)' };
        this.index++;
      }
    }, 3000);
  }


  previousSlide(): void {
    clearInterval(this.sliderInterval);
    if (this.index === 0) {
      const backWordDeviation = (this.sliderImages.length - 1) * 100;
      this.deviation = { 'transform': 'translateX(-' + backWordDeviation + '%)' };
      this.index = this.sliderImages.length - 1;
      this.sliderRev = true;
    } else {
      const incrementWidth = 100 * (this.index - 1);
      this.deviation = { 'transform': 'translateX(-' + incrementWidth + '%)' };
      this.index--;
    }
    this.startSlider();
  }

  nextSlide(): void {
    clearInterval(this.sliderInterval);
    if (this.index === this.sliderImages.length - 1) {
      this.deviation = { 'transform': 'translateX(0)' };
      this.index = 0;
    } else {
      const incrementWidth = 100 * (this.index + 1);
      this.deviation = { 'transform': 'translateX(-' + incrementWidth + '%)' };
      this.index++;
    }
    this.startSlider();
  }

  expandPanel(panelIndex: number): void {
    console.log(panelIndex);
  }
  

  filterProducts(category: string): void {
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }
}
