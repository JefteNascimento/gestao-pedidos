import type { HttpContext } from '@adonisjs/core/http'
import { ProdutoService } from '#services/produto_service'
import { produtoValidator } from '#validators/produto';

export default class ProdutosController {

  async store({ request, response }: HttpContext) {
   const { nome, preco } = await request.validateUsing(produtoValidator);

    const produtoService = new ProdutoService()

    const produto = await produtoService.cadastrar(nome, preco)

    return response.created(produto)
  }

  async index({ response }: HttpContext) {
    const produtoService = new ProdutoService()

    const produtos = await produtoService.listar()

    return response.ok(produtos)
  }

  async update({ params, request, response }: HttpContext) {
    const { nome, preco } = request.only(['nome', 'preco'])

    const produtoService = new ProdutoService()

    const produto = await produtoService.editar(
      params.id,
      nome,
      preco
    )

    return response.ok(produto)
  }

  async alterarStatus({ params, request, response }: HttpContext) {
    const { ativo } = request.only(['ativo'])

    const produtoService = new ProdutoService()

    const produto = await produtoService.alterarStatus(
      params.id,
      ativo
    )

    return response.ok(produto)
  }
}