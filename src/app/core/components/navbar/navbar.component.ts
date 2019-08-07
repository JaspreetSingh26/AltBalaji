import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { faShoppingCart, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  shoppingCartItemCount: number;
  faShoppingCart = faShoppingCart;
  faSignInAlt = faSignInAlt;
  public isCollapsed = false;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {}

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
