import { Component, OnInit, ViewChild } from "@angular/core";
import { SearchService } from "./search.service";
import { count } from "rxjs/operators";
import { ModalController, IonInfiniteScroll, IonContent } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  medicinList: Array<any>;
  unFilteredMedicinList: Array<any>;
  showMedicin: Array<any>;
  accordianMedicinId: number = 0;
  selectedMedicinArray: Array<any> = [];

  numbers: Array<any> = [];
  paginationCount: number = 0;
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;
  constructor(
    private searchService: SearchService,
    private modalController: ModalController,
    private router:Router
  ) {}

  ngOnInit() {
    this.medicinList = [];
  }

  searchMedicin(searchText: string) {
    let cart: any = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    this.searchService.searchMedicin(searchText).subscribe((res) => {
      console.log(res);
      let medicinList = res.map((item) => {
        if (!item.count) {
          if (cart.length) {
            item.count = cart.reduce((data, medicin) => {
              if (medicin && item.Id == medicin.Id) {
                data = medicin.count;
                item.cartStatus = true;
              }
              return data;
            }, 1);
          } else {
            item.count = 1;
          }
        }
        return item;
      });
      this.medicinList = [...medicinList];
      this.unFilteredMedicinList = [...medicinList];
      this.paginationCount = 0;
      this.showMedicin = medicinList.splice(0, 10);
    });
  }

  onSearchChange($event) {
    let searchValue = $event.detail.value;
    this.toggleInfiniteScroll();
    if (searchValue.length == 3) {
      if (!this.medicinList.length) this.searchMedicin(searchValue);
    }
    if (searchValue.length > 3) {
      if (this.unFilteredMedicinList.length) {
        this.medicinList = this.unFilteredMedicinList.filter((item) => {
          return item.SearchResult.search(new RegExp(searchValue, "i")) > -1;
        });
        this.showMedicin = this.medicinList.splice(0, 10);
      }
    }
    if (searchValue.length < 3) {
      this.medicinList = [];
      this.unFilteredMedicinList = [];
      this.showMedicin = [];
    }
  }

  addMedicin(medicin) {
    this.accordianMedicinId = medicin.Id;
  }

  selectedType(medicin: any) {
    console.log(medicin);
  }

  addToCart(medicin) {
    let cart: any = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    this.unFilteredMedicinList = this.unFilteredMedicinList.map((item) => {
      if (item.Id == medicin.Id) item = medicin;
      return item;
    });
    if (cart.length) {
      if (cart.filter((item) => item.Id == medicin.Id).length) {
        cart = cart.map((item) => {
          if (item.Id == medicin.Id) item = medicin;
          return item;
        });
      } else cart.push(medicin);
    } else cart.push(medicin);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  closeModal(status) {
    this.modalController.dismiss({ status: status });
  }

  loadData(event) {
    console.log(event);
    this.paginationCount++;
    let start = this.paginationCount * 10;
    let end = start + 10;
    let newShowMedicin = this.medicinList.slice(start, end);
    this.showMedicin = [...this.showMedicin, ...newShowMedicin];
    console.log(this.medicinList.length);
    console.log(this.showMedicin);

    if (this.medicinList.length <= end) {
      event.target.disabled = true;
      event.target.complete();
    } else {
      event.target.complete();
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = false;
  }

  uploadPrescription(){
    this.modalController.dismiss()
    this.router.navigate(['transaction/upload-prescription',0]);
  }

  goToCart(){
    this.modalController.dismiss();
    this.router.navigate(['transaction/cart'])
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
      discount:10,
    }
  }
}
