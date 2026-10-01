import vine from '@vinejs/vine'

export const clienteValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(2),
    telefone: vine.string().trim().minLength(8),
  })
);