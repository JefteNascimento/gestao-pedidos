import vine from '@vinejs/vine'

export const produtoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(2),
    preco: vine.number().positive(),
  })
);