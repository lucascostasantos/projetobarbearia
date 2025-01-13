import { Router } from "express";
import ClienteController from "./ClienteController.js";
import ServicoController from "./ServicoControllers.js";
import AutenticacaoController from "./AutenticacaoController.js";
import { auth } from "./auth.js";
import AgendamentoController from "./AgendamentoController.js";
import ClienteModel from "./PrismaClienteModel.js";
import ServicosModel from "./PrismaServicosModel.js";
import HorariosController from "./HorariosController.js";

const router = Router();

router.get("/telainicial", (req, res) => {
    res.render("telainicial"); // Renderiza o arquivo telainicial.ejs
});

router.get("/telainicial/agendamento", (req, res) => {
    res.render("agendamento"); // Renderiza o arquivo agendamento.ejs
});

//Rotas para Usuários

router.get('/usuarios', ClienteController.index);

router.get('/usuarios/:id/', ClienteController.show);

router.post('/usuarios', ClienteController.store);

//router.put('/usuarios/:id', ClienteController.update);

router.delete('/usuarios/:id', ClienteController.destroy);

//Rota para Serviços
router.get('/servicos', ServicoController.index);

router.get('/servicos/:id', async (req, res) => {
    const { id } = req.params; // Usando a desestruturação
    try {
        const servico = await ServicosModel.findById(id);

        if (servico) {
            res.json(servico);
        } else {
            res.status(404).json({ message: 'Serviço não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar serviço:', error);
        res.status(500).json({ message: 'Erro interno ao buscar serviço' });
    }
});

router.get('/horarios-indisponiveis', HorariosController.getHorariosDisponiveis);

//Rotas para Agendamentos

router.get('/meus-agendamentos', AgendamentoController.listar);

router.get('/agendamentos/:id/', AgendamentoController.show);

router.post('/agendamentos', AgendamentoController.store);

router.patch('/usuarios/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    const {nome, email, telefone, senha} = req.body;

    try{
        const dadosAtualizados = await ClienteModel.update({ id, nome, email, telefone, senha });
        res.status(200).json(dadosAtualizados);
    }catch(error){
        console.error("Erro ao atualizar os dados: ", error.message);
        res.status(500).json({message: "Erro ao atualizar os dados", error:error.message})
    }
});

router.put('/agendamentos/:id', AgendamentoController.destroy);


//Rotas de Autenticação
router.get('/login', AutenticacaoController.index);

router.post('/login', AutenticacaoController.login);

router.get('/home', auth, AutenticacaoController.home);

router.get('/perfil', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/home'); // Redireciona para o login
    }

    const usuario = req.session.usuario;
    // Já está disponível globalmente via middleware, então só renderiza
    res.render('perfilCliente', {usuario}); 
});

router.get('/logout', (req, res) => {
    // Destroi a sessão do usuário
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar sessão:', err);
            return res.status(500).json({ erro: 'Erro ao encerrar sessão!' });
        }

        // Redireciona para a página de login após o logout
        res.redirect('/');
    });
});


export default router;