import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ServicosModel {
  // Método para encontrar todos os serviços
  async find() {
    const servicos = await prisma.servicos.findMany(); // Corrigir o nome da tabela para 'servico'
    return servicos;
  }

  // Método para encontrar um serviço pelo ID
  async findById(id) {
    const servico = await prisma.servicos.findUnique({
      where: {
        id: parseInt(id), // Certifique-se de que o id está sendo tratado como um número
      },
    });
    return servico;
  }
}

export default new ServicosModel();
