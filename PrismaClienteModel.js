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

  async findByUsername(nome) {
    const cliente = prisma.clientes.findUnique({
      where: {
        nome: nome
      }
    })
    return cliente;
  }

  async create(cliente) {
    const clientes = await prisma.clientes.create({
      data: {
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        password: cliente.password
      }
    })
    return clientes;
  }

  async update(cliente) {
    const clientes = await prisma.clientes.update({
      where: {
        id: Number(cliente.id)
      },
      data: {
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        password: cliente.password
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