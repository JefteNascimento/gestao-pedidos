import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'clientes.store': { paramsTuple?: []; params?: {} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'clientes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.store': { paramsTuple?: []; params?: {} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'produtos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.alterar_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pedidos.store': { paramsTuple?: []; params?: {} }
    'pedidos.index': { paramsTuple?: []; params?: {} }
    'pedidos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pedidos.alterar_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'pedidos.index': { paramsTuple?: []; params?: {} }
    'pedidos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'pedidos.index': { paramsTuple?: []; params?: {} }
    'pedidos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'clientes.store': { paramsTuple?: []; params?: {} }
    'produtos.store': { paramsTuple?: []; params?: {} }
    'pedidos.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'clientes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'produtos.alterar_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pedidos.alterar_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}