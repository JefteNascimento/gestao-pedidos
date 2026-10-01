import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id: number;

  cliente: {
    id: number;
    nome: string;
  };

  dataCriacao: string;
  valorTotal: number;
  status: string;
}
export interface ItemPedido {
  id: number;

  produto: {
    id: number;
    nome: string;
  };

  quantidade: number;
  precoUnitario: number;
  totalItem: number;
}

export interface PedidoDetalhe {
  id: number;

  cliente: {
    id: number;
    nome: string;
    telefone: string;
  };

  status: string;
  valorTotal: number;
  dataCriacao: string;
  itens: ItemPedido[];
}

export interface ItemPedidoRequest {
  produtoId: number;
  quantidade: number;
}

export interface PedidoRequest {
  clienteId: number;
  itens: ItemPedidoRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  private apiUrl = 'http://localhost:3333/pedidos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

 buscarPorId(id: number): Observable<PedidoDetalhe> {
  return this.http.get<PedidoDetalhe>(
    `${this.apiUrl}/${id}`
  );
}
  alterarStatus(id: number, status: string): Observable<Pedido> {
    return this.http.patch<Pedido>(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  }
  cadastrar(pedido: PedidoRequest): Observable<Pedido> {
  return this.http.post<Pedido>(
    this.apiUrl,
    pedido
  );
}
}