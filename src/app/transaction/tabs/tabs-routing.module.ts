import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/home/home.module').then(m => m.HomeModule)
          }
        ]
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/order/order.module').then(m => m.OrderModule)
          }
        ]
      },

      {
        path: 'subscription',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/subscription/subscription.module').then(m => m.SubscriptionModule)
          }
        ]
      },

      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/account/account.module').then(m => m.AccountModule)
          }
        ]
      },
      {
        path: 'wallet',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/wallet/wallet.module').then(m => m.WalletModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
