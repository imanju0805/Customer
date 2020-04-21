import { Component, OnInit } from '@angular/core';
import { AddressSelectionService } from './address-selection.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address-selection',
  templateUrl: './address-selection.page.html',
  styleUrls: ['./address-selection.page.scss'],
})
export class AddressSelectionPage implements OnInit {

  addressList:Array<any>;
  selectedAddress:any;

  constructor(private addressSelectionService:AddressSelectionService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.addressSelectionService.getCustomerAddressList(9).subscribe((res:any)=>{
      console.log(res);
      this.addressList=res;
    })
  }


  gotoOrderSummary(selectedAddress){
    console.log(selectedAddress);
    this.router.navigate(['/transaction/order-summary',this.route.snapshot.paramMap.get("uploadType"),selectedAddress])

  }

}
