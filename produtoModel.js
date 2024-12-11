import Database from './database.js';

const db = new Database();

export async function listartimes() {
    const sql = 'SELECT * FROM timesfutebol';
    const produtos = await db.query(sql);
    console.log(produtos);
    return produtos;
}

export function inserirCliente(nome, email, telefone, senha, callback) {
    const sql = 'INSERT INTO clientes (nome, email, telefone, senha) VALUES ($1, $2, $3, $4)';
    db.query(sql, [nome, email, telefone, senha], (erro, resultado) => {
        if (erro) return callback(erro, null);
        callback(null, resultado);
    });
}