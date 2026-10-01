import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  Pedido,
  PedidoDetalhe,
  PedidoService
} from '../../services/pedido';

@Component({
  selector: 'app-pedidos',
  imports: [],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {

  pedidos: Pedido[] = [];

  pedidoSelecionado: PedidoDetalhe | null = null;

  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';

  constructor(
    private pedidoService: PedidoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.pedidoService.listar().subscribe({
      next: (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
        this.cdr.detectChanges();
      },
      error: (erro: unknown) => {
        console.error('Erro ao carregar pedidos:', erro);
      },
    });
  }
  verDetalhes(id: number): void {
  this.pedidoService.buscarPorId(id).subscribe({
    next: (pedido: PedidoDetalhe) => {
      this.pedidoSelecionado = pedido;
      this.cdr.detectChanges();
    },
    error: (erro: unknown) => {
      console.error('Erro ao consultar pedido:', erro);
    },
  });
}

fecharDetalhes(): void {
  this.pedidoSelecionado = null;
}
avancarStatus(pedido: Pedido): void {

  const proximoStatus: Record<string, string> = {
    PENDENTE: 'EM_PREPARACAO',
    EM_PREPARACAO: 'PRONTO',
    PRONTO: 'FINALIZADO',
  };

  const novoStatus = proximoStatus[pedido.status];

  if (!novoStatus) {
    this.mensagem = 'Este pedido não pode avançar para outro status.';
    this.tipoMensagem = 'erro';
    return;
  }

  this.pedidoService.alterarStatus(
    pedido.id,
    novoStatus
  ).subscribe({
    next: () => {
      this.mensagem = 'Status do pedido atualizado com sucesso!';
      this.tipoMensagem = 'sucesso';

      this.carregarPedidos();
    },

    error: (erro: any) => {
      this.mensagem =
        erro.error?.mensagem ||
        'Não foi possível alterar o status do pedido.';

      this.tipoMensagem = 'erro';
      this.cdr.detectChanges();
    },
  });
}

cancelarPedido(pedido: Pedido): void {

  this.pedidoService.alterarStatus(
    pedido.id,
    'CANCELADO'
  ).subscribe({
    next: () => {
      this.mensagem = 'Pedido cancelado com sucesso!';
      this.tipoMensagem = 'sucesso';

      this.carregarPedidos();
    },

    error: (erro: any) => {
      this.mensagem =
        erro.error?.mensagem ||
        'Não foi possível cancelar o pedido.';

      this.tipoMensagem = 'erro';
      this.cdr.detectChanges();
    },
  });
}
}