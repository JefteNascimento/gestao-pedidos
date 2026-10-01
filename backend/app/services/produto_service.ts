import Produto from '#models/produto'

export class ProdutoService {

  async cadastrar(nome: string, preco: number) {
    const produto = await Produto.create({
      nome,
      preco,
      ativo: true,
    })

    return produto
  }

  async listar() {
    return await Produto.all()
  }

  async editar(id: number, nome: string, preco: number) {
    const produto = await Produto.findOrFail(id)

    produto.nome = nome
    produto.preco = preco

    await produto.save()

    return produto
  }

  async alterarStatus(id: number, ativo: boolean) {
    const produto = await Produto.findOrFail(id)

    produto.ativo = ativo

    await produto.save()

    return produto
  }
}