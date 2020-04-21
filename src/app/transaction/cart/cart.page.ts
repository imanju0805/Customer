import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public medicinList:Array<any>;
  constructor(private router:Router) {
   }

  ngOnInit() {
    this.medicinList=[];
    this.getCartItems();
  }

  getCartItems(){
    this.medicinList=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    console.log(this.medicinList);
  }

  removeFromCart(medicin){
    this.medicinList=this.medicinList.filter(item=>medicin.Id!=item.Id);
    localStorage.setItem('cart',JSON.stringify(this.medicinList))
  }


  medicinCountUpdate(medicin){
    this.medicinList=this.medicinList.map(item=>{
      if(item.Id==medicin.Id)
      item=medicin;
      return item;
    });
    localStorage.setItem('cart',JSON.stringify(this.medicinList))
  }

  goToAddressSelection(){
    let isPrescriptionRequired= this.medicinList.filter(item=>(item.PresRequired&&item.PresRequired==1));
    if(isPrescriptionRequired.length>0)
    this.router.navigate(['transaction/upload-prescription',1]);
    else
    this.router.navigate(['transaction/address-selection',1]);
  }

  uploadPrescription(){
    this.router.navigate(['transaction/upload-prescription',1]);
  }

  get cartCount(){
    let medicinList= localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
    return medicinList.length;
  }

  get uploadCardData(){
    return {
      title:"If you have any prescription, please upload here",
    }
  }
}
