// import type { HttpContext } from '@adonisjs/core/http'

import { clienteValidator } from '#validators/cliente';
import type { HttpContext } from '@adonisjs/core/http'
import { ClienteService } from '#services/cliente_service'

export default class ClientesController {

async store({ request, response }: HttpContext) {

   const { nome, telefone } = await request.validateUsing(clienteValidator);

    const clienteService = new ClienteService();

    const cliente = await clienteService.cadastrar(nome, telefone);

    return response.created(cliente);
}

async index({ response }: HttpContext) {

  const clienteService = new ClienteService()

  const clientes = await clienteService.listar()

  return response.ok(clientes)
}

async update({ params, request, response }: HttpContext) {
  const { nome, telefone } = request.only(['nome', 'telefone'])

  const clienteService = new ClienteService()

  const cliente = await clienteService.editar(
    params.id,
    nome,
    telefone
  )

  return response.ok(cliente)
}

}