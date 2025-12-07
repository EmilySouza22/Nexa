// ============================================
// BACKEND - ROTAS DE EDIÇÃO DE EVENTOS
// ============================================

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ============================================
// 1. GET - Buscar dados de um evento específico
// ============================================
router.get('/:idevento', async (req, res) => {
  const { idevento } = req.params;

  try {
    const query = `
      SELECT 
        e.idevento,
        e.nome,
        e.idcategoria_evento,
        ce.nome as nome_categoria,
        e.assunto_principal,
        e.classificacao,
        e.data_inicio,
        e.data_termino,
        e.imagem,
        e.idconta,
        en.local,
        en.rua,
        en.complemento,
        en.bairro,
        en.cidade,
        en.estado,
        en.cep,
        en.numero
      FROM eventos e
      LEFT JOIN categoria_evento ce ON e.idcategoria_evento = ce.idcategoria_evento
      LEFT JOIN endereco en ON e.idendereco = en.idendereco
      WHERE e.idevento = ?
    `;

    const [rows] = await db.query(query, [idevento]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar evento:', error);
    res.status(500).json({ error: 'Erro ao buscar evento' });
  }
});

// ============================================
// 2. GET - Buscar ingressos de um evento
// ============================================
router.get('/:idevento/ingressos', async (req, res) => {
  const { idevento } = req.params;

  try {
    const query = `
      SELECT 
        i.idingresso,
        i.titulo,
        i.idtipo_ingresso,
        ti.nome as tipo_ingresso_nome,
        i.quantidade,
        i.valor_unitario,
        i.data_inicio,
        i.data_termino,
        i.max_qtd_por_compra
      FROM ingressos i
      LEFT JOIN tipo_ingresso ti ON i.idtipo_ingresso = ti.idtipo_ingresso
      WHERE i.idevento = ?
      ORDER BY i.idingresso
    `;

    const [rows] = await db.query(query, [idevento]);

    res.json({ ingressos: rows });
  } catch (error) {
    console.error('Erro ao buscar ingressos:', error);
    res.status(500).json({ error: 'Erro ao buscar ingressos' });
  }
});

// ============================================
// 3. PUT - Atualizar evento completo
// ============================================
router.put('/:idevento/update', async (req, res) => {
  const { idevento } = req.params;
  const {
    nome,
    idcategoria_evento,
    assunto_principal,
    classificacao,
    data_inicio,
    data_termino,
    idconta,
    imagem,
    endereco,
    ingressos
  } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // ============================================
    // 3.1 - Buscar idendereco do evento
    // ============================================
    const [eventoAtual] = await connection.query(
      'SELECT idendereco FROM eventos WHERE idevento = ?',
      [idevento]
    );

    if (eventoAtual.length === 0) {
      throw new Error('Evento não encontrado');
    }

    const idendereco = eventoAtual[0].idendereco;

    // ============================================
    // 3.2 - Atualizar dados do endereço
    // ============================================
    if (idendereco) {
      await connection.query(
        `UPDATE endereco SET
          local = ?,
          rua = ?,
          complemento = ?,
          bairro = ?,
          cidade = ?,
          estado = ?,
          cep = ?,
          numero = ?
        WHERE idendereco = ?`,
        [
          endereco.local,
          endereco.rua,
          endereco.complemento || '',
          endereco.bairro,
          endereco.cidade,
          endereco.estado,
          endereco.cep,
          endereco.numero || '',
          idendereco
        ]
      );
    }

    // ============================================
    // 3.3 - Atualizar dados do evento
    // ============================================
    await connection.query(
      `UPDATE eventos SET
        nome = ?,
        idcategoria_evento = ?,
        assunto_principal = ?,
        classificacao = ?,
        data_inicio = ?,
        data_termino = ?,
        imagem = ?
      WHERE idevento = ?`,
      [
        nome,
        idcategoria_evento,
        assunto_principal,
        classificacao,
        data_inicio,
        data_termino,
        imagem,
        idevento
      ]
    );

    // ============================================
    // 3.4 - Gerenciar ingressos (atualizar/inserir/deletar)
    // ============================================
    
    // Buscar ingressos existentes
    const [ingressosExistentes] = await connection.query(
      'SELECT idingresso FROM ingressos WHERE idevento = ?',
      [idevento]
    );

    const idsExistentes = ingressosExistentes.map(i => i.idingresso);
    const idsRecebidos = ingressos
      .filter(i => i.idingresso)
      .map(i => i.idingresso);

    // Deletar ingressos que não foram enviados
    const idsParaDeletar = idsExistentes.filter(id => !idsRecebidos.includes(id));
    
    if (idsParaDeletar.length > 0) {
      await connection.query(
        'DELETE FROM ingressos WHERE idingresso IN (?)',
        [idsParaDeletar]
      );
    }

    // Atualizar ou inserir ingressos
    for (const ingresso of ingressos) {
      if (ingresso.idingresso && idsExistentes.includes(ingresso.idingresso)) {
        // ATUALIZAR ingresso existente
        await connection.query(
          `UPDATE ingressos SET
            titulo = ?,
            idtipo_ingresso = ?,
            quantidade = ?,
            valor_unitario = ?,
            data_inicio = ?,
            data_termino = ?,
            max_qtd_por_compra = ?
          WHERE idingresso = ?`,
          [
            ingresso.titulo,
            ingresso.idtipo_ingresso,
            ingresso.quantidade,
            ingresso.valor_unitario,
            ingresso.data_inicio,
            ingresso.data_termino,
            ingresso.max_qtd_por_compra,
            ingresso.idingresso
          ]
        );
      } else {
        // INSERIR novo ingresso
        await connection.query(
          `INSERT INTO ingressos (
            idevento,
            titulo,
            idtipo_ingresso,
            quantidade,
            valor_unitario,
            data_inicio,
            data_termino,
            max_qtd_por_compra
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            idevento,
            ingresso.titulo,
            ingresso.idtipo_ingresso,
            ingresso.quantidade,
            ingresso.valor_unitario,
            ingresso.data_inicio,
            ingresso.data_termino,
            ingresso.max_qtd_por_compra
          ]
        );
      }
    }

    await connection.commit();

    res.json({
      success: true,
      message: 'Evento atualizado com sucesso',
      idevento
    });

  } catch (error) {
    await connection.rollback();
    console.error('Erro ao atualizar evento:', error);
    res.status(500).json({
      error: 'Erro ao atualizar evento',
      details: error.message
    });
  } finally {
    connection.release();
  }
});

// ============================================
// 4. DELETE - Deletar evento (OPCIONAL)
// ============================================
router.delete('/:idevento', async (req, res) => {
  const { idevento } = req.params;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Buscar idendereco antes de deletar
    const [evento] = await connection.query(
      'SELECT idendereco FROM eventos WHERE idevento = ?',
      [idevento]
    );

    if (evento.length === 0) {
      throw new Error('Evento não encontrado');
    }

    const idendereco = evento[0].idendereco;

    // Deletar ingressos primeiro (foreign key)
    await connection.query('DELETE FROM ingressos WHERE idevento = ?', [idevento]);

    // Deletar evento
    await connection.query('DELETE FROM eventos WHERE idevento = ?', [idevento]);

    // Deletar endereço (se existir)
    if (idendereco) {
      await connection.query('DELETE FROM endereco WHERE idendereco = ?', [idendereco]);
    }

    await connection.commit();

    res.json({
      success: true,
      message: 'Evento deletado com sucesso'
    });

  } catch (error) {
    await connection.rollback();
    console.error('Erro ao deletar evento:', error);
    res.status(500).json({
      error: 'Erro ao deletar evento',
      details: error.message
    });
  } finally {
    connection.release();
  }
});

module.exports = router;