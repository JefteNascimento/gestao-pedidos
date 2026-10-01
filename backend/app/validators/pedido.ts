import vine from '@vinejs/vine'

export const pedidoValidator = vine.compile(
  vine.object({
    clienteId: vine.number().positive(),

    itens: vine.array(
      vine.object({
        produtoId: vine.number().positive(),
        quantidade: vine.number().min(1),
      })
    ).minLength(1),
  })
);