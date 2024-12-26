import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class ServicosModel {

  async find() {
    const servicos = await prisma.servicos.findMany();
    return servicos;
  }

}

export default new ServicosModel();