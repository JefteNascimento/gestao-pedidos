import Pedido from '#models/pedido'
import ItemPedido from '#models/item_pedido'
import Cliente from '#models/cliente'
import Produto from '#models/produto'
import db from '@adonisjs/lucid/services/db';

type ItemRequest = {
  produtoId: number
  quantidade: number
}

export class PedidoService {

  async cadastrar(clienteId: number, itens: ItemRequest[]) {

  const cliente = await Cliente.findOrFail(clienteId);

  if (!itens || itens.length === 0) {
    throw new Error('O pedido deve possuir pelo menos um produto');
  }

  const trx = await db.transaction();

  try {

    const pedido = new Pedido();

    pedido.clienteId = cliente.id;
    pedido.status = 'PENDENTE';
    pedido.valorTotal = 0;

    pedido.useTransaction(trx);

    await pedido.save();

    let valorTotal = 0;

   for (const item of itens) {

  if (item.quantidade < 1) {
    throw new Error(
      'A quantidade mínima de cada item é 1'
    );
  }

  const produto = await Produto.query({
    client: trx,
  })
    .where('id', item.produtoId)
    .firstOrFail();

  if (!produto.ativo) {
    throw new Error(
      `O produto ${produto.nome} está inativo`
    );
  }

  const precoUnitario = Number(produto.preco);

  const totalItem =
    precoUnitario * item.quantidade;

  const itemPedido = new ItemPedido();

  itemPedido.pedidoId = pedido.id;
  itemPedido.produtoId = produto.id;
  itemPedido.quantidade = item.quantidade;
  itemPedido.precoUnitario = precoUnitario;
  itemPedido.totalItem = totalItem;

  itemPedido.useTransaction(trx);

  await itemPedido.save();

  valorTotal += totalItem;
}

    pedido.valorTotal = valorTotal;

    await pedido.save();

    await trx.commit();

    return pedido;

  } catch (erro) {

    await trx.rollback();

    throw erro;
  }
}
  async listar() {
  
  const pedidos = await Pedido.all();
  const pedidosResponse = [];

  for (const pedido of pedidos) {
    const cliente = await Cliente.findOrFail(
      Number(pedido.clienteId)
    );

    pedidosResponse.push({
      id: pedido.id,
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
    },
      dataCriacao: pedido.createdAt,
      valorTotal: pedido.valorTotal,
      status: pedido.status,
    });
  }

  return pedidosResponse;
}

  async buscarPorId(id: number) {
  
    const pedido = await Pedido.findOrFail(id);

    const cliente = await Cliente.findOrFail(Number(pedido.clienteId));

    const itens = await ItemPedido.query().where('pedido_id', pedido.id);

    const itensComProduto = [];

    for (const item of itens) {
      const produto = await Produto.findOrFail(Number(item.produtoId));

    itensComProduto.push({
      id: item.id,
      produto: {
        id: produto.id,
        nome: produto.nome,
      },
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      totalItem: item.totalItem,
    });
  }

    return {
      id: pedido.id,
      cliente: {
       id: cliente.id,
       nome: cliente.nome,
       telefone: cliente.telefone,
     },
    status: pedido.status,
    valorTotal: pedido.valorTotal,
    dataCriacao: pedido.createdAt,
    itens: itensComProduto,
  };
}

  async alterarStatus(id: number, novoStatus: string) {
   const pedido = await Pedido.findOrFail(id);

  if (pedido.status === 'CANCELADO') {
    throw new Error('Pedido cancelado não pode ter o status alterado');
  }

  const transicoes: Record<string, string> = {
    PENDENTE: 'EM_PREPARACAO',
    EM_PREPARACAO: 'PRONTO',
    PRONTO: 'FINALIZADO',
  };

  if (novoStatus === 'CANCELADO') {
    pedido.status = 'CANCELADO';
  } else {
    const proximoStatus = transicoes[pedido.status];

    if (proximoStatus !== novoStatus) {
      throw new Error('Transição de status inválida');
    }

    pedido.status = novoStatus;
  }

  await pedido.save();

  return pedido;
}
}