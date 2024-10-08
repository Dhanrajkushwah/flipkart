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

  images1 = [
    { src: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sweater/s/n/c/-original-imah3q6ukffhvvgm.jpeg?q=70', alt: 'Discount 1' },
    { src: 'https://rukminim2.flixcart.com/image/612/612/xif0q/snack-savourie/d/r/v/-original-imaghfn8j2vrwfcy.jpeg?q=70', alt: 'Discount 2' },
    { src: 'https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/f/d/p/s-no-sc24-csmawjk016-campus-sutra-original-imahy7hddc3z9tww.jpeg?q=70', alt: 'Discount 3' },
    { src: 'https://rukminim2.flixcart.com/image/612/612/xif0q/edible-seed/n/a/y/1-raw-chia-seeds-for-weight-loss-management-with-omega-3-and-original-imagmnxymrd4fpbq.jpeg?q=70', alt: 'Discount 4' },
    { src: 'https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/1/h/o/46-482-m1-stew-android-ios-cellecor-yes-original-imah3j6juthzgsz9.jpeg?q=70', alt: 'Discount 5' },
    { src: 'https://rukminim2.flixcart.com/image/612/612/l071d3k0/tv-entertainment-unit/m/0/o/-original-imagcfhne9zbhema.jpeg?q=70', alt: 'Discount 6' },
    { src: 'https://rukminim2.flixcart.com/image/612/612/xif0q/slipper-flip-flop/f/m/j/-original-imah2c46afnnp8ye.jpeg?q=70', alt: 'Discount 7' },
  ];
  
 
  @Input() searchText: string = ''; // Receive the search text from parent component
 
  productList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  images: string[] = ['https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/39b352d7d7ae094b.jpg?q=90',
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/44fe68e438b997c9.jpeg?q=90',
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/b05db66d26666a4d.jpg?q=90',
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/20a160ef30776af8.jpeg?q=90',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/cc633426b89ad841.png?q=20',
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
  
  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.filterProducts1();
  }

  filterProducts1(): void {
    if (this.searchText) {
      this.filteredProducts = this.products.filter(product =>
        product.category.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
  filterProducts(category: string): void {
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }
  getTransform2(): string {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  prevSlide2(): void {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.images.length - 1;
  }

  nextSlide2(): void {
    this.currentSlide = (this.currentSlide < this.images.length - 1) ? this.currentSlide + 1 : 0;
  }
}
