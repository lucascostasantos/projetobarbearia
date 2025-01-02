import { Router } from "express";
import ClienteController from "./ClienteController.js";
import ServicoController from "./ServicoControllers.js";
import AutenticacaoController from "./AutenticacaoController.js";
import { auth } from "./auth.js";

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

router.put('/usuarios/:id', ClienteController.update);

router.delete('/usuarios/:id', ClienteController.destroy);

//Rota para Serviços
router.get('/servicos', ServicoController.index);

//Rotas de Autenticação
router.get('/login', AutenticacaoController.index);

router.post('/login', AutenticacaoController.login);

router.get('/home', auth, AutenticacaoController.home);

router.get('/perfil', (req, res) => {
    console.log(req.session.usuario);
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