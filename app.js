import express from 'express';
import cors from 'cors';
import router from './router.js';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override'; 

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:5500', // Altere para a porta onde está rodando o front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: false, // Não salva sessões vazias
    cookie: {
        maxAge: 1000 * 60 * 30, // Expira em 30 minutos
        secure: false, // Altere para 'true' em produção com HTTPS
        httpOnly: true
    }
}));

app.use(methodOverride('_method'));
  
app.engine('handlebars', engine()); // Configura o mecanismo
app.set('view engine', 'handlebars'); // Define o Handlebars como template engine
app.set('views', path.join(__dirname, 'views')); // Define a pasta de views

app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos (CSS, JS, etc.)

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null; // Disponibiliza o usuário em todas as views
    next();
});


app.get("/", (req, res) => {
    res.render("index");
});

app.use(router);


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});