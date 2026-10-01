import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto, ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produtos',
  imports: [FormsModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {

  produtos: Produto[] = [];

  novoProduto: Produto = {
    nome: '',
    preco: 0,
  };

  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';

  produtoEditandoId: number | null = null;

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (produtos: Produto[]) => {
        this.produtos = produtos;
        this.cdr.detectChanges();
      },
      error: (erro: unknown) => {
        console.error('Erro ao carregar produtos:', erro);
      },
    });
  }

  salvarProduto(): void {

  this.mensagem = '';
  this.tipoMensagem = '';

  if (!this.novoProduto.nome.trim()) {
    this.mensagem = 'Informe o nome do produto.';
    this.tipoMensagem = 'erro';
    return;
  }

  if (this.novoProduto.nome.trim().length < 2) {
    this.mensagem = 'O nome deve possuir pelo menos 2 caracteres.';
    this.tipoMensagem = 'erro';
    return;
  }

  if (
    this.novoProduto.preco === null ||
    this.novoProduto.preco === undefined ||
    Number(this.novoProduto.preco) <= 0
  ) {
    this.mensagem = 'Informe um preço maior que zero.';
    this.tipoMensagem = 'erro';
    return;
  }

  if (this.produtoEditandoId !== null) {

      this.produtoService.editar(
        this.produtoEditandoId,
        this.novoProduto
      ).subscribe({
        next: () => {

        this.mensagem = 'Produto atualizado com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.limparFormulario();
        this.carregarProdutos();
        },
        error: (erro: unknown) => {
          console.error('Erro ao editar produto:', erro);
        },
      });

    } else {

      this.produtoService.cadastrar(this.novoProduto).subscribe({
       next: () => {
        this.mensagem = 'Produto cadastrado com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.limparFormulario();
        this.carregarProdutos();
      },
        error: (erro: unknown) => {
         console.error('Erro ao salvar produto:', erro);
         this.mensagem =
        'Não foi possível salvar o produto. Verifique os dados e tente novamente.';
         this.tipoMensagem = 'erro';
         this.cdr.detectChanges();
       },
      });
    }
  }
  editarProduto(produto: Produto): void {
    this.produtoEditandoId = produto.id!;

    this.novoProduto = {
      nome: produto.nome,
      preco: produto.preco,
    };
  }

  limparFormulario(): void {
    this.produtoEditandoId = null;

    this.novoProduto = {
      nome: '',
      preco: 0,
    };
  }
  alterarStatus(produto: Produto): void {

  if (produto.id === undefined) {
    return;
  }

  const novoStatus = !produto.ativo;

  this.produtoService.alterarStatus(
    produto.id,
    novoStatus
  ).subscribe({
   next: () => {
     this.mensagem = novoStatus
      ? 'Produto ativado com sucesso!'
      : 'Produto desativado com sucesso!';

     this.tipoMensagem = 'sucesso';
     this.carregarProdutos();
    },
    error: (erro: unknown) => {
     console.error('Erro ao alterar status do produto:', erro);
     this.mensagem = 'Não foi possível alterar o status do produto.';
     this.tipoMensagem = 'erro';
     this.cdr.detectChanges();
    },
  });
}
}