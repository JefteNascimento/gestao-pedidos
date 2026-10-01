import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id?: number;
  nome: string;
  preco: number;
  ativo?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private apiUrl = 'http://localhost:3333/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  editar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(
      `${this.apiUrl}/${id}`,
      produto
    );
  }

  alterarStatus(id: number, ativo: boolean): Observable<Produto> {
    return this.http.patch<Produto>(
      `${this.apiUrl}/${id}/status`,
      { ativo }
    );
  }
}