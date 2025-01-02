import ClienteModel from "./PrismaClienteModel.js";
import AgendamentoModel from "./PrismaAgendamentoModel.js";



class AutenticacaoController {

  async index(req, res) {
    res.render("telainicial");
  }

  async home(req, res) {
    // Verifica se o usuário está logado
    if (!req.session.logado) {
        return res.redirect('/login');
    }

    // Garante que a sessão do usuário exista
    const usuario = req.session.usuario || {};
    const agendamentos = usuario.agendamentos || []; // Se não houver agendamentos, define como array vazio

    console.log(agendamentos); // Depuração para verificar os dados

    // Renderiza a tela inicial com os agendamentos
    res.render("telainicial", { agendamentos: agendamentos });
  }


  async login(req, res) {
    const { email, senha } = req.body;

    try {
        // Busca o cliente pelo email
        const cliente = await ClienteModel.findByEmail(email);

        if (!cliente) {
            // Retorna status 401 (não autorizado) e uma mensagem
            return res.status(401).json({ erro: 'Email ou senha incorretos!' });
        }

        // Verificação direta da senha (não recomendada em produção)
        if (senha !== cliente.senha) {
            return res.status(401).json({ erro: 'Email ou senha incorretos!' });
        }

        // Busca os agendamentos do cliente
        const agendamentos = await AgendamentoModel.find({
            where: { clienteId: cliente.id }
        });

        // Armazena os dados na sessão
        req.session.usuario = {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            senha: cliente.senha,
            agendamentos: agendamentos
        };

        req.session.logado = true;

        // Resposta bem-sucedida
        res.status(200).json({ sucesso: true });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ erro: 'Erro interno no servidor!' });
    }
}

}

export default new AutenticacaoController();