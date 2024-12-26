import { Router } from "express";
import ClienteController from "./ClienteController.js";
import ServicoController from "./ServicoControllers.js";
import AutenticacaoController from "./AutenticacaoController.js";
import { auth } from "./auth.js";

const router = Router();

router.get("/telainicial", (req, res) => {
    res.sendFile("telainicial.html", { root: process.cwd() });
});

router.get("/telainicial/agendamento", (req, res) => {
    res.sendFile("agendamento.html", { root: process.cwd() });
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

router.get('/erro', AutenticacaoController.erro);

export default router;