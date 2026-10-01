import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Cliente,
  ClienteService
} from '../../services/cliente';

@Component({
  selector: 'app-clientes',
  imports: [FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {
  clientes: Cliente[] = [];

  novoCliente: Cliente = {
    nome: '',
    telefone: '',
  };

  clienteEditandoId: number | null = null;
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
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

  salvarCliente(): void {
    
  this.mensagem = '';
  this.tipoMensagem = '';

  if (!this.novoCliente.nome.trim()) {
    this.mensagem = 'Informe o nome do cliente.';
    this.tipoMensagem = 'erro';
    return;
}

  if (!this.novoCliente.telefone.trim()) {
    this.mensagem = 'Informe o telefone do cliente.';
    this.tipoMensagem = 'erro';
    return;
}

  if (this.novoCliente.nome.trim().length < 2) {
    this.mensagem = 'O nome deve possuir pelo menos 2 caracteres.';
    this.tipoMensagem = 'erro';
    return;
}

  if (this.novoCliente.telefone.trim().length < 8) {
    this.mensagem = 'Informe um telefone válido.';
    this.tipoMensagem = 'erro';
    return;
}

    if (this.clienteEditandoId !== null) {        

      this.clienteService.editar(
        this.clienteEditandoId,
        this.novoCliente
      ).subscribe({
        next: () => {
          this.mensagem = this.clienteEditandoId !== null
          ? 'Cliente atualizado com sucesso!'
          : 'Cliente cadastrado com sucesso!';

          this.tipoMensagem = 'sucesso';
          this.limparFormulario();
          this.carregarClientes();
        },
        error: (erro: unknown) => {
          this.mensagem =
          'Não foi possível salvar o cliente. Verifique os dados e tente novamente.';
          this.tipoMensagem = 'erro';
          this.cdr.detectChanges();
        },
      });

    } else {

      this.clienteService.cadastrar(
        this.novoCliente
      ).subscribe({
        next: () => {
          this.mensagem = this.clienteEditandoId !== null
          ? 'Cliente atualizado com sucesso!'
          : 'Cliente cadastrado com sucesso!';
          this.tipoMensagem = 'sucesso';
          this.limparFormulario();
          this.carregarClientes();
        },
        error: (erro: unknown) => {
          console.error('Erro ao cadastrar cliente:', erro);
        },
      });

    }
  }

  editarCliente(cliente: Cliente): void {
    if (cliente.id === undefined) {
      return;
    }

    this.clienteEditandoId = cliente.id;

    this.novoCliente = {
      nome: cliente.nome,
      telefone: cliente.telefone,
    };
  }
  
  limparFormulario(): void {
    this.clienteEditandoId = null;

    this.novoCliente = {
      nome: '',
      telefone: '',
    };
  }
}