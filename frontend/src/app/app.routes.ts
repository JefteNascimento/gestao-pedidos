import { Routes } from '@angular/router';
import { Produtos } from './pages/produtos/produtos';
import { Clientes } from './pages/clientes/clientes';
import { Pedidos } from './pages/pedidos/pedidos';
import { NovoPedido } from './pages/novo-pedido/novo-pedido';

export const routes: Routes = [
  {
    path: 'produtos',
    component: Produtos,
  },
  {
    path: 'clientes',
    component: Clientes,
  },
  {
    path: 'pedidos/novo',
    component: NovoPedido,
  },
  {
    path: 'pedidos',
    component: Pedidos,
  },
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full',
  },
];