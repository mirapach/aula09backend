const express = require('express');
const cors = require('cors');
const supabase = require('./supabase'); // Importa o cliente do Supabase
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware essenciais
app.use(cors()); // Permite que o forntend acesse este backend sem erros de cors
app.use(express.json()); // Permite que o Express entenda requisições com corpo em JSON

// Passo 1 - Memória Ram do servidor (simulando um banco de dados)
let produtos = [
    {id:1, nome: 'Teclado Mecânico RGD', preco: 150.00},
    {id:2, nome: 'Mouse Gamer 3200 DPI', preco: 85.50},
];

// Rota GET
app.get('/produtos', async (req, res) => {
    console.log('[GET] /produtos Enviando produtos em memória...'); 
    // res.json(produtos);
    const {data, error} = await supabase
    .from('produtos')
    .select('*')
    .order('id', {ascending: true});
    if (error) {
        return res.status(500).json({erro: error.message});
    }
    res.json(data);
});

// Rota POST
app.post('/produtos', (req, res) => {
    const {nome, preco} = req.body;

    if(!nome || !preco) {
        return res.status(400).json({error: 'Nome e preço são obrigatórios'});
    }

    const novoProduto = {
        id:Date.now(), // Gera um id temporário baseado no timestamp
        nome,
        preco: parseFloat(preco)
    };

    produtosEmMemoria.push(novoProduto);
    console.log(`[POST /produtos] Produto adicionado na RAM: ${novoProduto.nome}`);

    res.status(201).json(novoProduto);
});

// Rota PUT: alterar um produto existente
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.body;
  const produto = produtosEmMemoria.find((item) => item.id === id);

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado." });
  }
  if(typeof nome !== 'string' || nome.trim() === '' || !Number.isFinite(Number(preco))) {
    return res.status(400).json({ mensagem: "Informe um nome e preço válidos." });
  }

  produto.nome = nome.trim();
  produto.preco = parseFloat(preco);

  res.json(produto);
});

// Rota DELETE: remover um produto existente
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = produtos.findIndex((produto) => produto.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const [produtoRemovido] = produtos.splice(indice, 1);
    res.json(produtoRemovido);
});

// Listen (ouvir a porta 3000)
app.listen(PORT, () =>{
    console.log('=========================================================');
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Rota de produtos ativa em: http://localhost:3000/produtos');
    console.log('Status: MODO MEMÓRIA RAM ATIVO');
    console.log('=========================================================');
});