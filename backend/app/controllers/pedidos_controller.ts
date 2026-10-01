import type { HttpContext } from '@adonisjs/core/http';
import { PedidoService } from '#services/pedido_service';
import { pedidoValidator } from '#validators/pedido';

export default class PedidosController {

  async store({ request, response }: HttpContext) {
    try {

      const { clienteId, itens } =
        await request.validateUsing(pedidoValidator);

      const pedidoService = new PedidoService();

      const pedido = await pedidoService.cadastrar(
        clienteId,
        itens
      );

      return response.created(pedido);

    } catch (erro) {

      if (
        erro instanceof Error &&
        erro.message.includes('está inativo')
      ) {
        return response.badRequest({
          mensagem: erro.message,
        });
      }

      throw erro;
    }
  }

  async index({ response }: HttpContext) {
    const pedidoService = new PedidoService();

    const pedidos = await pedidoService.listar();

    return response.ok(pedidos);
  }

  async show({ params, response }: HttpContext) {
    const pedidoService = new PedidoService();

    const pedido = await pedidoService.buscarPorId(
      Number(params.id)
    );

    return response.ok(pedido);
  }

  async alterarStatus({
    params,
    request,
    response,
  }: HttpContext) {

    try {

      const { status } = request.only(['status']);

      const pedidoService = new PedidoService();

      const pedido = await pedidoService.alterarStatus(
        Number(params.id),
        status
      );

      return response.ok(pedido);

    } catch (erro) {

      if (erro instanceof Error) {

        if (
          erro.message === 'Transição de status inválida' ||
          erro.message ===
            'Pedido cancelado não pode ter o status alterado'
        ) {

          return response.badRequest({
            mensagem: erro.message,
          });

        }

      }

      throw erro;
    }
  }
}