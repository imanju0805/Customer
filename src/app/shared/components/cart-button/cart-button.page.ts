import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cart-button",
  templateUrl: "./cart-button.page.html",
  styleUrls: ["./cart-button.page.scss"],
})
export class CartButtonPage implements OnInit {
  @Input() medicin: any;

  @Output() cartChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();

  @Input() addToCartButtonDisplay: boolean;

  @Input() removeButtonDisplayStatus: boolean;

  @Output() removeFromCart: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    //console.log(this.medicin)
  }

  cartActions(status: boolean) {
    if (status)
      this.medicin.count < 25 ? this.medicin.count++ : this.medicin.count;
    else this.medicin.count > 0 ? this.medicin.count-- : this.medicin.count;
    this.medicin.cartStatus=false;
    //this.cartChange.emit(this.medicin);
  }
  addToCartAction() {
    this.medicin.cartStatus = true;
    this.addToCart.emit(this.medicin);
  }
  
  addMore(){
    this.medicin.count++;
    this.addToCart.emit(this.medicin);
  }

  removeItemFromCart() {
    this.removeFromCart.emit(this.medicin);
  }
}
