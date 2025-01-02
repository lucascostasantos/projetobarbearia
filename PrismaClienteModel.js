import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class ClienteModel {

  async find() {
    const clientes = await prisma.clientes.findMany();
    return clientes;
  }

  async findById(id) {
    const cliente = prisma.clientes.findUnique({
      where: {
        id: Number(id)
      }
    })
    return cliente;
  }

  async findByEmail(email) {
    const cliente = prisma.clientes.findUnique({
      where: {
        email: email
      }
    })
    return cliente;
  }

  async create(cliente) {
    const clientes = await prisma.clientes.create({
      data: {
        nome: cliente.nome,
        email: cliente.email,
        senha: cliente.senha,
        telefone: cliente.telefone
      }
    })
    return clientes;
  }

  async update(cliente) {
    console.log(cliente);
    const clientes = await prisma.clientes.update({
      where: {
        id: Number(cliente.id)
      },
      data: {
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        senha: cliente.senha
      }
    })
    return clientes;
  }

  async delete(id) {
    const clientes = await prisma.clientes.delete({
      where: {
        id: Number(id)
      }
    })
    return clientes;
  }
}

export default new ClienteModel();