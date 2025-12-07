import express from 'express';
import db from '../src/config/database.js';

const router = express.Router();

// == CRIANDO O EVENTO == // 
router.post('/create', async (req, res) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const {
            nome,
            idcategoria_evento,
            assunto_principal,
            classificacao,
            data_inicio,
            data_termino,
            idconta,
            endereco,
            ingressos,
            imagem
        } = req.body;

        // Validações básicas do evento
        if (!nome || !idcategoria_evento || !data_inicio || !data_termino || !idconta) {
            return res.status(400).json({
                error: 'Campos obrigatórios: nome, idcategoria_evento, data_inicio, data_termino e idconta'
            });
        }

        // Validar se a data de término é posterior à data de início
        if (new Date(data_termino) <= new Date(data_inicio)) {
            return res.status(400).json({
                error: 'A data de término deve ser posterior à data de início'
            });
        }

        // Verificar se a conta existe e é organizador
        const [contaExistente] = await connection.query(
            'SELECT idconta, tipo_contaid FROM conta WHERE idconta = ?',
            [idconta]
        );

        if (contaExistente.length === 0) {
            return res.status(404).json({
                error: 'Conta não encontrada'
            });
        }

        if (contaExistente[0].tipo_contaid !== 2) {
            return res.status(403).json({
                error: 'Apenas organizadores podem criar eventos'
            });
        }

        // VALIDAÇÃO: Verificar se já possui 5 eventos ativos
        const [eventosAtivos] = await connection.query(
            `SELECT COUNT(*) as total 
             FROM evento 
             WHERE conta_id = ? 
             AND evento_ativo = TRUE 
             AND data_termino >= CURDATE()`,
            [idconta]
        );

        if (eventosAtivos[0].total >= 5) {
            return res.status(400).json({
                error: 'Você já possui 5 eventos ativos. Aguarde um evento terminar ou delete um evento existente para criar um novo.'
            });
        }

        // Verificar se a categoria existe
        const [categoriaExistente] = await connection.query(
            'SELECT idcategoria_evento FROM categoria_evento WHERE idcategoria_evento = ?',
            [idcategoria_evento]
        );

        if (categoriaExistente.length === 0) {
            return res.status(404).json({
                error: 'Categoria de evento não encontrada'
            });
        }

        let idendereco_evento = null;

        // Inserir endereço se fornecido
        if (endereco) {
            const [resultadoEndereco] = await connection.query(
                `INSERT INTO endereco_evento (local, rua, complemento, bairro, cidade, estado, cep, numero)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    endereco.local || null,
                    endereco.rua || null,
                    endereco.complemento || null,
                    endereco.bairro || null,
                    endereco.cidade || null,
                    endereco.estado || null,
                    endereco.cep ? endereco.cep.replace(/\D/g, '') : null,
                    endereco.numero || null
                ]
            );
            idendereco_evento = resultadoEndereco.insertId;
        }

        // Inserir evento
        const [resultadoEvento] = await connection.query(
            `INSERT INTO evento (nome, categoria_eventoid, assunto_principal, classificacao, 
                                data_inicio, data_termino, evento_ativo, conta_id, endereco_eventoid, imagem)
             VALUES (?, ?, ?, ?, ?, ?, TRUE, ?, ?, ?)`,
            [
                nome,
                idcategoria_evento,
                assunto_principal || null,
                classificacao || null,
                data_inicio,
                data_termino,
                idconta,
                idendereco_evento,
                imagem || null
            ]
        );

        const idevento = resultadoEvento.insertId;

        // Inserir ingressos se fornecidos
        if (ingressos && Array.isArray(ingressos) && ingressos.length > 0) {
            for (const ingresso of ingressos) {
                const {
                    titulo,
                    idtipo_ingresso,
                    quantidade,
                    valor_unitario,
                    data_inicio: ingresso_data_inicio,
                    data_termino: ingresso_data_termino,
                    max_qtd_por_compra
                } = ingresso;

                // Validações do ingresso
                if (!titulo || !idtipo_ingresso || !quantidade || valor_unitario === undefined) {
                    await connection.rollback();
                    return res.status(400).json({
                        error: 'Dados incompletos no ingresso: título, tipo, quantidade e valor são obrigatórios'
                    });
                }

                // Verificar se o tipo de ingresso existe (1=Pago, 2=Gratuito)
                const [tipoExistente] = await connection.query(
                    'SELECT idtipo_ingresso FROM tipo_ingresso WHERE idtipo_ingresso = ?',
                    [idtipo_ingresso]
                );

                if (tipoExistente.length === 0) {
                    await connection.rollback();
                    return res.status(404).json({
                        error: `Tipo de ingresso ${idtipo_ingresso} não encontrado. Use 1 para Pago ou 2 para Gratuito`
                    });
                }

                await connection.query(
                    `INSERT INTO ingresso (titulo, tipo_ingressoid, quantidade, valor_unitario, 
                                          data_inicio, data_termino, max_qtd_por_compra, evento_id)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        titulo,
                        idtipo_ingresso,
                        quantidade,
                        valor_unitario,
                        ingresso_data_inicio || null,
                        ingresso_data_termino || null,
                        max_qtd_por_compra || quantidade,
                        idevento
                    ]
                );
            }
        }

        await connection.commit();

        res.status(201).json({
            message: 'Evento criado com sucesso!',
            idevento: idevento
        });

    } catch (error) {
        await connection.rollback();
        console.error('Erro ao criar evento:', error);
        res.status(500).json({
            error: 'Erro ao criar evento',
            details: error.message
        });
    } finally {
        connection.release();
    }
});

// == BUSCAR RESUMO DO DASHBOARD DO ORGANIZADOR == //
router.get('/organizador/:idconta/dashboard', async (req, res) => {
    try {
        const { idconta } = req.params;

        if (!idconta || idconta === 'undefined' || idconta === 'null') {
            return res.status(400).json({
                error: 'ID da conta inválido'
            });
        }

        // Buscar próximo evento
        const [proximoEvento] = await db.query(
            `SELECT e.idevento, e.nome, e.data_inicio, e.data_termino,
                    DATEDIFF(e.data_inicio, NOW()) as dias_restantes
             FROM evento e
             WHERE e.conta_id = ? AND e.evento_ativo = 1 AND e.data_inicio >= CURDATE()
             ORDER BY e.data_inicio ASC
             LIMIT 1`,
            [idconta]
        );

        let totalIngressos = 0;
        let totalVendidos = 0;
        let totalRestantes = 0;

        // Se existe um próximo evento, buscar os ingressos SOMENTE desse evento
        if (proximoEvento.length > 0) {
            const [ingressosEvento] = await db.query(
                `SELECT 
                    COALESCE(SUM(i.quantidade), 0) as total_ingressos,
                    COALESCE(SUM(i.vendidos), 0) as total_vendidos
                 FROM ingresso i
                 WHERE i.evento_id = ?`,
                [proximoEvento[0].idevento]
            );

            totalIngressos = Number(ingressosEvento[0]?.total_ingressos) || 0;
            totalVendidos = Number(ingressosEvento[0]?.total_vendidos) || 0;
            totalRestantes = totalIngressos - totalVendidos;
        }

        res.json({
            proximo_evento: proximoEvento[0] || null,
            ingressos: {
                total_vendidos: totalVendidos,
                total_restantes: totalRestantes,
                total_ingressos: totalIngressos
            }
        });
    } catch (error) {
        console.error('Erro ao buscar dashboard:', error);
        res.status(500).json({
            error: 'Erro ao buscar dados do dashboard',
            details: error.message
        });
    }
});

// == BUSCAR EVENTOS DO ORGANIZADOR == // 
router.get('/organizador/:idconta', async (req, res) => {
    try {
        const { idconta } = req.params;

        if (!idconta || idconta === 'undefined' || idconta === 'null') {
            return res.status(400).json({
                error: 'ID da conta inválido'
            });
        }

        const [eventos] = await db.query(
            `SELECT e.idevento, e.nome, e.data_inicio, e.data_termino, 
                    e.evento_ativo, e.imagem, e.assunto_principal,
                    c.nome as nome_categoria, 
                    end.local, end.rua, end.numero, end.complemento, 
                    end.bairro, end.cidade, end.estado, end.cep,
                    DATEDIFF(e.data_inicio, NOW()) as dias_restantes
             FROM evento e
             LEFT JOIN categoria_evento c ON e.categoria_eventoid = c.idcategoria_evento
             LEFT JOIN endereco_evento end ON e.endereco_eventoid = end.idendereco_evento
             WHERE e.conta_id = ? AND e.evento_ativo = TRUE AND e.data_termino >= CURDATE()
             ORDER BY e.data_inicio ASC`,
            [idconta]
        );

        res.json(eventos);
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).json({
            error: 'Erro ao buscar eventos',
            details: error.message
        });
    }
});

// == BUSCAR DETALHES DE UM EVENTO ESPECÍFICO == //
router.get('/:idevento', async (req, res) => {
    try {
        const { idevento } = req.params;

        const [eventos] = await db.query(
            `SELECT e.idevento, e.nome, e.data_inicio, e.data_termino, 
                    e.evento_ativo, e.imagem, e.assunto_principal, e.classificacao,
                    c.nome as nome_categoria, 
                    end.local, end.rua, end.numero, end.complemento, 
                    end.bairro, end.cidade, end.estado, end.cep,
                    DATEDIFF(e.data_inicio, NOW()) as dias_restantes
             FROM evento e
             LEFT JOIN categoria_evento c ON e.categoria_eventoid = c.idcategoria_evento
             LEFT JOIN endereco_evento end ON e.endereco_eventoid = end.idendereco_evento
             WHERE e.idevento = ?`,
            [idevento]
        );

        if (eventos.length === 0) {
            return res.status(404).json({
                error: 'Evento não encontrado'
            });
        }

        res.json(eventos[0]);
    } catch (error) {
        console.error('Erro ao buscar evento:', error);
        res.status(500).json({
            error: 'Erro ao buscar evento',
            details: error.message
        });
    }
});

// == BUSCAR INGRESSOS DE UM EVENTO == //
router.get('/:idevento/ingressos', async (req, res) => {
    try {
        const { idevento } = req.params;

        const [ingressos] = await db.query(
            `SELECT 
                i.idingresso,
                i.titulo,
                i.quantidade,
                i.vendidos as quantidade_vendida,
                i.valor_unitario,
                i.data_inicio,
                i.data_termino,
                i.max_qtd_por_compra,
                ti.nome as tipo_ingresso,
                ti.idtipo_ingresso
             FROM ingresso i
             LEFT JOIN tipo_ingresso ti ON i.tipo_ingressoid = ti.idtipo_ingresso
             WHERE i.evento_id = ?`,
            [idevento]
        );

        const totalIngressos = ingressos.reduce((acc, ing) => acc + ing.quantidade, 0);
        const totalVendidos = ingressos.reduce((acc, ing) => acc + (ing.quantidade_vendida || 0), 0);
        const totalRestantes = totalIngressos - totalVendidos;

        res.json({
            ingressos: ingressos.map(ing => ({
                ...ing,
                quantidade_restante: ing.quantidade - (ing.quantidade_vendida || 0)
            })),
            resumo: {
                total_ingressos: totalIngressos,
                total_vendidos: totalVendidos,
                total_restantes: totalRestantes
            }
        });
    } catch (error) {
        console.error('Erro ao buscar ingressos:', error);
        res.status(500).json({
            error: 'Erro ao buscar ingressos',
            details: error.message
        });
    }
});

export default router;