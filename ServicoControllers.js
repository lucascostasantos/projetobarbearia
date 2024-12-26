import ServicosModel from "./PrismaServicosModel.js";


class ServicoController {

  async index(req, res) {
    const servicos = await ServicosModel.find();
    res.json(servicos);
  }

}

export default new ServicoController();