import { PrismaClient } from '@prisma/client';
import HorarioDisponivelModel from "./PrismaHorarioDisponivelModel.js";

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

  async findByClienteId(clienteId) {
    const agendamentos = await prisma.agendamento.findMany({
      where: { clienteId: clienteId },
      orderBy: { data: 'desc' } // Ordena pela data em ordem decrescente
    });
    return agendamentos;
  }

  async create(agendamento) {
    const novoAgendamento = await prisma.agendamento.create({
      data: {
        clienteId: agendamento.clienteId,
        servicoId: agendamento.servicoId,
        status: agendamento.status,
        data: agendamento.data,
        horario: agendamento.horario
      }
    });
    return novoAgendamento;
  }
  

  async updateAgendamento(agendamento) {
    const agendamentoAtualizado = await prisma.agendamento.update({
      where: {
        id: Number(agendamento.id)
      },
      data: {
        clienteId: agendamento.clienteId,
        servicoId: agendamento.servicoId,
        status: agendamento.status,
        data: agendamento.data,
        horario: agendamento.horario
      }
    });
    return agendamentoAtualizado;
  }
  

  async cancelarAgendamento(id) {

    try {

      // Busca o agendamento para obter o horário associado
      const agendamento = await prisma.agendamento.findUnique({
        where: { id: Number(id) }
      });

      if (!agendamento) {
        return null; // Retorna null se o agendamento não for encontrado
      }

      // Atualiza o status do agendamento para "cancelado"
      await prisma.agendamento.update({
        where: { id: Number(id) },
        data: { status: 'cancelado' }
      });

      // Atualiza o horário correspondente para "disponível"
      await prisma.horarioDisponivel.updateMany({
        where: { dataHora: agendamento.horario },
        data: { disponivel: true }
      });

      return agendamento; // Retorna o agendamento atualizado
    } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        throw error; // Lança o erro para o controller tratar
    }
  }
  
}

export default new AgendamentoModel();