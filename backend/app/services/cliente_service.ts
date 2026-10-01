
import Cliente from "#models/cliente";

export class ClienteService {
  
  async cadastrar(nome : string,telefone: string){

    const cliente = await Cliente.create({
      nome: nome,
      telefone: telefone
    })
    
    return cliente;
  }

  async listar() {
  return await Cliente.all()
}

async editar(id: number, nome: string, telefone: string) {
  const cliente = await Cliente.findOrFail(id)

  cliente.nome = nome
  cliente.telefone = telefone

  await cliente.save()

  return cliente
}


}