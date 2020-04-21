import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SearchPage } from "../../../../shared/components/search/search.page";
import { Router } from "@angular/router";


@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  imageArray: Array<any> = [];
  constructor(
    private modalController: ModalController,
    private router: Router,
  ) {}

  ngOnInit() {}

  uploadPrescription() {
    this.router.navigate(['transaction/upload-prescription',0])
  }


  /**
   * Open search modal
   */
  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchPage
    });
    modal.onDidDismiss().then(res => {
      let data = res.data;
      if (data&&data.status) this.router.navigate(["transaction/cart"]);
    });
    return await modal.present();
  }

  get cartCount(){
    let medicinList= localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
    return medicinList.length;
  }

  get uploadCardData(){
    return {
      message:"Upload prescription and tell us what you need. we do the rest",
      discount:10
    }
  }

 
}
