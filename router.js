import { Router } from "express";
import { inserirCliente } from "./produtoModel.js";

const router = Router();

router.get("/telainicial", (req, res) => {
    res.sendFile("telainicial.html", { root: process.cwd() });
});

router.get("/telainicial/agendamento", (req, res) => {
    res.sendFile("agendamento.html", { root: process.cwd() });
});

router.post("/", (req, res)=>{
    const { nomeCompleto, email, telefone, senha } = req.body;

    inserirCliente(nomeCompleto, email, telefone, senha, (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send('Erro ao inserir cliente.');
        }
        console.log(resultado);
        res.send('Cliente inserido com sucesso!');
        res.end();
    });
});

export default router;