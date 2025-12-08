const express = require('express');
const router = express.Router();
const pool = require('../db'); // ajuste para seu arquivo de conexão

// ========================================================
// 1. PEGAR DETALHES DO EVENTO
// ========================================================
router.get('/detalhes/:idevento', async (req, res) => {
try {
const { idevento } = req.params;

const evento = await pool.query(
`SELECT id_evento, titulo, descricao, data, horario, local, cidade, uf, imagem
FROM eventos
WHERE id_evento = ?`,
[idevento]
);

if (evento.length === 0) {
return res.status(404).json({ message: "Evento não encontrado" });
}

res.status(200).json(evento[0]);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

// ========================================================
// 2. PEGAR OS INGRESSOS DO EVENTO
// ========================================================
router.get('/detalhes/:idevento/ingressos', async (req, res) => {
try {
const { idevento } = req.params;

const ingressos = await pool.query(
`SELECT id_ingresso, nome, preco, lote, quantidade_total, quantidade_disponivel
FROM ingressos
WHERE id_evento = ?`,
[idevento]
);

res.status(200).json(ingressos);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

// ========================================================
// 3. ATUALIZAR EVENTO
// ========================================================
router.put('/detalhes/:idevento/update', async (req, res) => {
try {
const { idevento } = req.params;
const { titulo, descricao, data, horario, local, cidade, uf, imagem } = req.body;

await pool.query(
`UPDATE eventos
SET titulo=?, descricao=?, data=?, horario=?, local=?, cidade=?, uf=?, imagem=?
WHERE id_evento=?`,
[titulo, descricao, data, horario, local, cidade, uf, imagem, idevento]
);

res.status(200).json({ message: "Evento atualizado com sucesso" });
} catch (error) {
res.status(500).json({ error: error.message });
}
});

// ========================================================
// 4. DELETAR EVENTO
// ========================================================
router.delete('/detalhes/:idevento', async (req, res) => {
try {
const { idevento } = req.params;

await pool.query("DELETE FROM eventos WHERE id_evento = ?", [idevento]);

res.status(200).json({ message: "Evento deletado com sucesso" });
} catch (error) {
res.status(500).json({ error: error.message });
}
});

module.exports = router;