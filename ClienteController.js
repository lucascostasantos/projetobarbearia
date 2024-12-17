import ClienteModel from "./PrismaClienteModel.js";


class ClienteController {

  async index(req, res) {
    const clientes = await ClienteModel.find();
    res.json(clientes);
  }

  async store(req, res) {

    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const password = req.body.password;
    const cliente = await ClienteModel.create({ nome, email, telefone, password });
    res.json(cliente);

  }

  async show(req, res) {
    const id = req.params.id;
    const cliente = await ClienteModel.findById(id);
    res.json(cliente);
  }

  async update(req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const password = req.body.password;
    const cliente = await ClienteModel.update({ nome, email, telefone, password });
    res.json(cliente);
  }

  async destroy(req, res) {
    const id = req.params.id;
    const cliente = await ClienteModel.delete(id);
    res.json(cliente);
  }
}

export default new ClienteController();