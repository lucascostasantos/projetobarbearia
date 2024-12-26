import ClienteModel from "./PrismaClienteModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "deadpooljesusdamarvel"; // Altere para algo mais seguro!

class AutenticacaoController {
  // Página de login
  async index(req, res) {
    res.sendFile("index.html", { root: process.cwd() });
  }

  // Página de erro
  async erro(req, res) {
    res.sendFile("erro.html", { root: process.cwd() });
  }

  // Página inicial (protegida)
  async home(req, res) {
    res.sendFile("telainicial.html", { root: process.cwd() });
  }

  // Login com JWT
  async login(req, res) {
    const { email, senha } = req.body;

    // 1. Verificar se o usuário existe
    const cliente = await ClienteModel.findByEmail(email);
    if (!cliente) {
      return res.status(401).json({ error: "Usuário ou senha inválidos!" });
    }

    // 2. Verificar a senha criptografada
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Usuário ou senha inválidos!" });
    }

    // 3. Gerar o token JWT
    const token = jwt.sign(
      { id: cliente.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token válido por 1 hora
    );

    // 4. Retornar o token para o cliente
    res.json({ token });
  }

  // Middleware para proteger rotas
  verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ error: "Acesso negado!" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Armazena dados do usuário no req
      next();
    } catch (err) {
      res.status(401).json({ error: "Token inválido!" });
    }
  }

  // Página protegida
  async perfil(req, res) {
    res.json({ message: `Bem-vindo, ${req.user.email}!` });
  }
}

export default new AutenticacaoController();
