const express = require('express');
const mysql = require('mysql2');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const banco = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'bercario'
});

banco.connect((erro) => {
    if (erro) {
        console.log('Erro na conexão');
    } else {
        console.log('Banco conectado!');
    }
});

app.get('/', (req, res) => {
    res.render('inicio');
});


app.get('/bebes', (req, res) => {
    banco.query('SELECT * FROM bebes', (erro, resultado) => {
        res.render('bebes', { bebes: resultado });
    });
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

app.post('/cadastro', (req, res) => {
    const { nome, nascimento, responsavel, sala } = req.body;

    banco.query(
        'INSERT INTO bebes (nome, nascimento, responsavel, sala) VALUES (?, ?, ?, ?)',
        [nome, nascimento, responsavel, sala],
        (erro) => {
            if (erro) {
                return res.send('Erro ao cadastrar bebê');
            }

            res.redirect('/bebes');
        }
    );
});

app.listen(3000, () => {
    console.log('Sistema funcionando!');
});


