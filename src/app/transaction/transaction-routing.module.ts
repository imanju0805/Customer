import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "tabs",
    pathMatch: "full",
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./cart/cart.module").then((m) => m.CartPageModule),
  },
  {
    path: "cart/:orderType?",
    loadChildren: () =>
      import("./cart/cart.module").then((m) => m.CartPageModule),
  },
  {
    path: "upload-prescription/:status",
    loadChildren: () =>
      import("./upload-prescription/upload-prescription.module").then(
        (m) => m.UploadPrescriptionPageModule
      ),
  },
  {
    path: "prescription-confirm",
    loadChildren: () =>
      import("./prescription-confirm/prescription-confirm.module").then(
        (m) => m.PrescriptionConfirmPageModule
      ),
  },
  {
    path: "address-selection/:uploadType",
    loadChildren: () =>
      import("./address-selection/address-selection.module").then(
        (m) => m.AddressSelectionPageModule
      ),
  },
  {
    path: "order-summary/:uploadType/:addressId",
    loadChildren: () =>
      import("./order-summary/order-summary.module").then(
        (m) => m.OrderSummaryPageModule
      ),
  },
  {
    path: "order-status/:merchantCount",
    loadChildren: () =>
      import("./order-status/order-status.module").then(
        (m) => m.OrderStatusPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
