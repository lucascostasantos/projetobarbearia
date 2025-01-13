import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

class ClienteModel {

  async find() {
    const clientes = await prisma.clientes.findMany();
    return clientes;
  }

  async findById(id) {
    const cliente = prisma.clientes.findUnique({
      where: {
        id: Number(id)
      }
    })
    return cliente;
  }

  async findByEmail(email) {
    const cliente = prisma.clientes.findUnique({
      where: {
        email: email
      }
    })
    return cliente;
  }

  async create(cliente) {
      try {
          // Validação básica
          if (!cliente.nome || !cliente.email || !cliente.senha || !cliente.telefone) {
              throw new Error('Todos os campos são obrigatórios.');
          }

          // Valida o formato do e-mail
          const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailValido.test(cliente.email)) {
              throw new Error('E-mail inválido.');
          }

          // Verifica se o e-mail já está cadastrado
          const emailExistente = await prisma.clientes.findUnique({
              where: {
                  email: cliente.email
              }
          });

          if (emailExistente) {
              throw new Error('E-mail já cadastrado. Por favor, use outro e-mail.');
          }

          // Criptografa a senha antes de salvar
          const senhaHash = await bcrypt.hash(cliente.senha, 10);

          // Cria o cliente no banco de dados
          const novoCliente = await prisma.clientes.create({
              data: {
                  nome: cliente.nome,
                  email: cliente.email,
                  senha: senhaHash,
                  telefone: cliente.telefone
              }
          });

          return novoCliente; // Retorna os dados criados

      } catch (error) {
          throw new Error(error.message); // Repassa o erro para tratamento no front-end
      }
  }



  async update(cliente) {
    const clientes = await prisma.clientes.update({
      where: {
        id: Number(cliente.id)
      },
      data: {
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        senha: cliente.senha
      }
    })
    return clientes;
  }

  async delete(id) {
    const clientes = await prisma.clientes.delete({
      where: {
        id: Number(id)
      }
    })
    return clientes;
  }
}

export default new ClienteModel();