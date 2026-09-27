import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs', component: TabsPage,
    children: [
      { path: 'clientes', loadComponent: () => import('../tab1/tab1.page').then((m) => m.Tab1Page) },
      { path: 'categorias', loadComponent: () => import('../tab2/tab2.page').then((m) => m.Tab2Page) },
      { path: 'productos', loadComponent: () => import('../tab3/tab3.page').then((m) => m.Tab3Page) },
      { path: '', redirectTo: '/tabs/clientes', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabs/clientes', pathMatch: 'full' },
];
