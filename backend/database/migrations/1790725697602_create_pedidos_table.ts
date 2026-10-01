import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
      .integer('cliente_id')
      .unsigned()
      .references('id')
      .inTable('clientes')
      .notNullable()

      table.string('status').notNullable().defaultTo('PENDENTE')

      table.decimal('valor_total', 10, 2).notNullable().defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}