import AgendamentoModel from "./PrismaAgendamentoModel.js";
import HorarioDisponivelModel from "./PrismaHorarioDisponivelModel.js";


class AgendamentoController {

  async index(req, res) {
    const agendamentos = await AgendamentoModel.find();
    res.json(agendamentos);
  }

  async listar(req, res) {
    const clienteId = req.session.usuario?.id; // Supondo que o ID do cliente esteja armazenado na sessão após o login

    if (!clienteId) {
      return res.status(401).json({ error: "Não autorizado!" });
    }

    try {
      const agendamentos = await AgendamentoModel.findByClienteId(clienteId);
      res.json(agendamentos);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  async store(req, res) {

    const clienteId = req.session.usuario?.id;

    const { servicoId, data, horario } = req.body;

    console.log(data);

    let horarioDisponivel = await HorarioDisponivelModel.findByDateTime(data);

        // Se o horário não existir, cria um novo
    if (!horarioDisponivel) {
        horarioDisponivel = await HorarioDisponivelModel.create(data);
    }

    // Verifica se o horário já foi reservado
    if (!horarioDisponivel || !horarioDisponivel.disponivel) {
      return res.status(400).json({ erro: 'Horário não disponível!' });
    }
  
  
    const agendamento = await AgendamentoModel.create({
        clienteId: clienteId,
        servicoId,
        status: "agendado", // Valor padrão
        data,
        horario
    });

    await HorarioDisponivelModel.updateDisponibilidade(horarioDisponivel.id, false);
  
    res.redirect('/telainicial');

  }

  async show(req, res) {
    const id = Number(req.params.id);
    const agendamento = await AgendamentoModel.findById(id);

    if (!agendamento) {
        return res.status(404).json({ error: "Agendamento não encontrado." });
    }

    res.json(agendamento);

  }

  async update(req, res) {

    const id = Number(req.params.id);
    const { clienteId, servicoId, horarioId, status } = req.body;
  
    const agendamento = await AgendamentoModel.update({
        where: { id },
        data: {
        clienteId,
        servicoId,
        horarioId,
        status,
        },
    });
  
    res.json(agendamento);

  }

  async destroy(req, res) {

    const { id } = req.params; // O ID do agendamento

    console.log(id);
    try {
        const agendamento = await AgendamentoModel.cancelarAgendamento(id);

        if (agendamento) {
            res.json(agendamento); // Retorna o agendamento atualizado
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        res.status(500).json({ message: 'Erro ao atualizar o status do agendamento' });
    }
  }
}

export default new AgendamentoController();