import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente';
import { Produto, ProdutoService } from '../../services/produto';
import { PedidoRequest, PedidoService } from '../../services/pedido';

interface ItemTela {
  produto: Produto;
  quantidade: number;
}

@Component({
  selector: 'app-novo-pedido',
  imports: [FormsModule],
  templateUrl: './novo-pedido.html',
  styleUrl: './novo-pedido.css',
})
export class NovoPedido implements OnInit {

  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  itens: ItemTela[] = [];

  clienteId: number | null = null;
  produtoId: number | null = null;
  quantidade: number = 1;

  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';

  constructor(
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarProdutos();
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.cdr.detectChanges();
      },
      error: (erro: unknown) => {
        console.error('Erro ao carregar clientes:', erro);
      },
    });
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (produtos: Produto[]) => {
        this.produtos = produtos.filter(
          (produto: Produto) => Boolean(produto.ativo)
        );

        this.cdr.detectChanges();
      },
      error: (erro: unknown) => {
        console.error('Erro ao carregar produtos:', erro);
      },
    });
  }

  adicionarProduto(): void {

  if (this.produtoId === null) {
    this.mensagem = 'Selecione um produto antes de adicionar.';
    this.tipoMensagem = 'erro';
    return;
  }

  if (this.quantidade < 1) {
    this.mensagem = 'A quantidade deve ser de pelo menos 1.';
    this.tipoMensagem = 'erro';
    return;
  }

  const produto = this.produtos.find(
    (produto: Produto) => produto.id === Number(this.produtoId)
  );

  if (!produto) {
    this.mensagem = 'Produto não encontrado.';
    this.tipoMensagem = 'erro';
    return;
  }

  this.itens.push({
    produto,
    quantidade: this.quantidade,
  });

  this.mensagem = '';
  this.tipoMensagem = '';

  this.produtoId = null;
  this.quantidade = 1;
}

  removerProduto(index: number): void {
    this.itens.splice(index, 1);
  }

  calcularTotalItem(item: ItemTela): number {
    return Number(item.produto.preco) * item.quantidade;
  }

  calcularTotalPedido(): number {
    return this.itens.reduce(
      (total: number, item: ItemTela) =>
        total + this.calcularTotalItem(item),
      0
    );
  }

  finalizarPedido(): void {

    if (this.clienteId === null) {
    this.mensagem = 'Selecione um cliente antes de finalizar o pedido.';
    this.tipoMensagem = 'erro';
    return;
  }

  if (this.itens.length === 0) {
    this.mensagem = 'Adicione pelo menos um produto ao pedido.';
    this.tipoMensagem = 'erro';
    return;
  }

    const pedido: PedidoRequest = {
      clienteId: Number(this.clienteId),

      itens: this.itens.map((item: ItemTela) => ({
        produtoId: item.produto.id!,
        quantidade: item.quantidade,
      })),
    };

   this.pedidoService.cadastrar(pedido).subscribe({
  next: () => {
    this.mensagem = 'Pedido cadastrado com sucesso!';
    this.tipoMensagem = 'sucesso';

    this.clienteId = null;
    this.produtoId = null;
    this.quantidade = 1;
    this.itens = [];

    this.cdr.detectChanges();
  },

  error: (erro: any) => {
    this.mensagem =
      erro.error?.mensagem ||
      'Não foi possível cadastrar o pedido. Verifique os dados e tente novamente.';

    this.tipoMensagem = 'erro';

    this.cdr.detectChanges();
  },
});
  }
}