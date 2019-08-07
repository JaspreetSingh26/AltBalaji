import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = [];
  filteredProducts = [];
  category: string;
  subscription: Subscription;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

    // productService.getAllObs().pipe(switchMap(products => {
    //   this.products = products;
    //   return route.queryParamMap;
    // })).subscribe(params => {
    //   this.category = params.get('category');

    //   this.filteredProducts = (this.category) ?
    //     this.products.filter(p => p.payload.val().category === this.category) :
    //     this.products;
    // });
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }
  private populateProducts() {
    this.subscription = this.productService
      .getAllObs().pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });

  }
  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.payload.val().category === this.category) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
