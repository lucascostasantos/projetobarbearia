import express from 'express';
import cors from 'cors';
import router from './router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: process.cwd() });
});

app.use(router);


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});