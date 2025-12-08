// routes/eventsView.js - Rotas de VISUALIZAÇÃO de eventos
import express from 'express';
import db from '../src/config/database.js';

const router = express.Router();

// =========================================================
// BUSCAR TODOS OS EVENTOS ATIVOS (PARA LISTAGEM)
// =========================================================
router.get('/', async (req, res) => {
    try {
        console.log(' Buscando todos os eventos ativos...');

        const [eventos] = await db.query(
            `SELECT 
                e.idevento,
                e.nome,
                e.assunto_principal,
                e.classificacao,
                e.data_inicio,
                e.data_termino,
                e.imagem,
                cat.nome as categoria_nome,
                c.nome as organizador_nome,
                end.local,
                end.cidade,
                end.estado
            FROM evento e
            LEFT JOIN categoria_evento cat ON e.categoria_eventoid = cat.idcategoria_evento
            LEFT JOIN conta c ON e.conta_id = c.idconta
            LEFT JOIN endereco_evento end ON e.endereco_eventoid = end.idendereco_evento
            WHERE e.evento_ativo = TRUE
            ORDER BY e.data_inicio DESC`
        );

        console.log(` ${eventos.length} eventos encontrados`);

        res.json({
            success: true,
            data: eventos
        });

    } catch (error) {
        console.error(' Erro ao buscar eventos:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar eventos',
            error: error.message
        });
    }
});

// =========================================================
// BUSCAR EVENTO COMPLETO POR ID
// ⚠️ Esta rota DEVE ficar por ÚLTIMO!
// =========================================================
router.get('/:id', async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        const { id } = req.params;
        console.log(` Buscando evento ID: ${id}`);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID do evento inválido'
            });
        }

        const [eventos] = await connection.query(
            `SELECT 
                e.idevento,
                e.nome,
                e.assunto_principal,
                e.classificacao,
                e.data_inicio,
                e.data_termino,
                e.evento_ativo,
                e.imagem,
                e.categoria_eventoid,
                cat.nome as categoria_nome,
                c.idconta as organizador_id,
                c.nome as organizador_nome,
                c.email as organizador_email,
                c.descricao as organizador_descricao,
                end.idendereco_evento,
                end.local,
                end.rua,
                end.complemento,
                end.bairro,
                end.cidade,
                end.estado,
                end.cep,
                end.numero
            FROM evento e
            LEFT JOIN categoria_evento cat ON e.categoria_eventoid = cat.idcategoria_evento
            LEFT JOIN conta c ON e.conta_id = c.idconta
            LEFT JOIN endereco_evento end ON e.endereco_eventoid = end.idendereco_evento
            WHERE e.idevento = ?`,
            [id]
        );

        if (eventos.length === 0) {
            console.log(`⚠️ Evento ID ${id} não encontrado`);
            return res.status(404).json({
                success: false,
                message: 'Evento não encontrado'
            });
        }

        console.log(` Evento encontrado: ${eventos[0].nome}`);

        console.log(` Buscando ingressos do evento...`);
        const [ingressos] = await connection.query(
            `SELECT 
                i.idingresso,
                i.titulo,
                i.quantidade,
                i.vendidos,
                i.valor_unitario,
                i.data_inicio,
                i.data_termino,
                i.max_qtd_por_compra,
                i.tipo_ingressoid,
                ti.nome as tipo_nome,
                (i.quantidade - COALESCE(i.vendidos, 0)) as disponiveis
            FROM ingresso i
            LEFT JOIN tipo_ingresso ti ON i.tipo_ingressoid = ti.idtipo_ingresso
            WHERE i.evento_id = ?
            ORDER BY i.valor_unitario ASC`,
            [id]
        );

        console.log(` ${ingressos.length} ingressos encontrados`);

        const evento = eventos[0];
        evento.ingressos = ingressos;

        res.json({
            success: true,
            data: evento
        });

    } catch (error) {
        console.error(' Erro ao buscar evento:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar dados do evento',
            error: error.message
        });
    } finally {
        connection.release();
    }
});

export default router;