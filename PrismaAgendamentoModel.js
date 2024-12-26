import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class AgendamentoModel {

  async find() {
    const agendamento = await prisma.agendamento.findMany();
    return agendamento;
  }

  async findById(id) {
    const agendamento = prisma.agendamento.findUnique({
      where: {
        id: Number(id)
      }
    })
    return agendamento;
  }

  async create(agendamento) {
    const agendamento = await prisma.agendamento.create({
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
    const clientes = await prisma.cliente.update({
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