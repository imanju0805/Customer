import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AddressSelectionService } from "../address-selection/address-selection.service";
import { UploadPrescriptionService } from "../upload-prescription/upload-prescription.service";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.page.html",
  styleUrls: ["./order-summary.page.scss"],
})
export class OrderSummaryPage implements OnInit {
  private addressId: any;
  public deliveryAddress: any;
  public imageArray: Array<any> = [];
  public medicinList: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressSelectionService,
    private uploadPriscription: UploadPrescriptionService,
    private router: Router
  ) {}

  ngOnInit() {
    let medicinList = [];
    let uploadStatus: any = this.route.snapshot.paramMap.get("uploadType");
    if (uploadStatus == 1 || uploadStatus == 2) {
      medicinList = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    }
    let imageArray = [];
    if (uploadStatus != 1) {
      imageArray = localStorage.getItem("prescriptions")
        ? JSON.parse(localStorage.getItem("prescriptions"))
        : [];
    }
    this.imageArray = imageArray;
    this.medicinList = medicinList;
    this.getAddressDetails();
  }

  getAddressDetails() {
    this.addressId = this.route.snapshot.paramMap.get("addressId");
    this.addressService.getCustomerAddressList(9).subscribe((res: any) => {
      this.deliveryAddress = res
        .filter((item) => item.AddressId == this.addressId)
        .reduce((data, item) => {
          data = item;
          return data;
        }, {});
    });
  }

  get AddressLabel() {
    return this.deliveryAddress && this.deliveryAddress.AddLabel
      ? this.deliveryAddress.AddLabel
      : "";
  }

  get Address() {
    return this.deliveryAddress && this.deliveryAddress.Address
      ? this.deliveryAddress.Address
      : "";
  }

  confirmOrder() {
    let uploadStatus: any = this.route.snapshot.paramMap.get("uploadType");
    let medicinList = [{ Id: 169507, count: 1 }];
    if (uploadStatus == 1 || uploadStatus == 2) {
      medicinList = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [{ Id: 169507, count: 1 }];
    }
    this.uploadPriscription
      .createOrder(medicinList, this.deliveryAddress.AddressId)
      .subscribe((res) => {
        console.log(res);
        if (this.imageArray.length && uploadStatus != 1) {
          this.uploadPriscription
            .uploadPrescriptions(this.imageArray, res.orderId)
            .subscribe((response) => {
              localStorage.removeItem("prescriptions");
              localStorage.removeItem("cart");
              this.router.navigate([
                "transaction/order-status",
                res.notifiedMerCount,
              ]);
            });
        } else {
          localStorage.removeItem("cart");
          this.router.navigate([
            "transaction/order-status",
            res.notifiedMerCount,
          ]);
        }
      });
  }
}
