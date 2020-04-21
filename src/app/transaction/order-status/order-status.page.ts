import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class OrderStatusPage implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  onClick(){
    this.router.navigate(['transaction/tabs/home'])
  }

  get marchentCount(){
    console.log(this.route.snapshot.paramMap.get("merchantCount"));
    return  this.route.snapshot.paramMap.get("merchantCount")?this.route.snapshot.paramMap.get("merchantCount"):0;
  }

}
