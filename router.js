import { Router } from "express";
import ClienteController from "./ClienteController.js";

const router = Router();

router.get("/telainicial", (req, res) => {
    res.sendFile("telainicial.html", { root: process.cwd() });
});

router.get("/telainicial/agendamento", (req, res) => {
    res.sendFile("agendamento.html", { root: process.cwd() });
});

router.get('/usuarios', ClienteController.index);

router.get('/usuarios/:id/', ClienteController.show);

router.post('/usuarios', ClienteController.store);

router.put('/usuarios/:id', ClienteController.update);

router.delete('/usuarios/:id', ClienteController.destroy);

export default router;