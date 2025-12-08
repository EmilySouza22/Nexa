import express from 'express';
import db from '../src/config/database.js';

const router = express.Router();

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
		} = req.body;

		// Validações básicas do evento
		if (
			!nome ||
			!idcategoria_evento ||
			!data_inicio ||
			!data_termino ||
			!idconta
		) {
			return res.status(400).json({
				error:
					'Campos obrigatórios: nome, idcategoria_evento, data_inicio, data_termino e idconta',
			});
		}

		// Validar se a data de término é posterior à data de início
		if (new Date(data_termino) <= new Date(data_inicio)) {
			return res.status(400).json({
				error: 'A data de término deve ser posterior à data de início',
			});
		}

		const [contaExistente] = await connection.query(
			'SELECT idconta, tipo_contaid FROM conta WHERE idconta = ?',
			[idconta]
		);

		if (contaExistente.length === 0) {
			return res.status(404).json({
				error: 'Conta não encontrada',
			});
		}

		if (contaExistente[0].tipo_contaid !== 2) {
			return res.status(403).json({
				error: 'Apenas organizadores podem criar eventos',
			});
		}

		// Verificar se a categoria existe
		const [categoriaExistente] = await connection.query(
			'SELECT idcategoria_evento FROM categoria_evento WHERE idcategoria_evento = ?',
			[idcategoria_evento]
		);

		if (categoriaExistente.length === 0) {
			return res.status(404).json({
				error: 'Categoria de evento não encontrada',
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
					endereco.numero || null,
				]
			);
			idendereco_evento = resultadoEndereco.insertId;
		}

		const [resultadoEvento] = await connection.query(
			`INSERT INTO evento (nome, categoria_eventoid, assunto_principal, classificacao, 
                                data_inicio, data_termino, evento_ativo, conta_id, endereco_eventoid)
             VALUES (?, ?, ?, ?, ?, ?, TRUE, ?, ?)`,
			[
				nome,
				idcategoria_evento,
				assunto_principal || null,
				classificacao || null,
				data_inicio,
				data_termino,
				idconta,
				idendereco_evento,
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
					taxa_servico,
					min_qtd_por_compra,
					max_qtd_por_compra,
				} = ingresso;

				// Validações do ingresso
				if (
					!titulo ||
					!idtipo_ingresso ||
					!quantidade ||
					valor_unitario === undefined
				) {
					await connection.rollback();
					return res.status(400).json({
						error:
							'Dados incompletos no ingresso: título, tipo, quantidade e valor são obrigatórios',
					});
				}

				// Verificar se o tipo de ingresso existe
				const [tipoExistente] = await connection.query(
					'SELECT idtipo_ingresso FROM tipo_ingresso WHERE idtipo_ingresso = ?',
					[idtipo_ingresso]
				);

				if (tipoExistente.length === 0) {
					await connection.rollback();
					return res.status(404).json({
						error: `Tipo de ingresso ${idtipo_ingresso} não encontrado`,
					});
				}

				await connection.query(
					`INSERT INTO ingresso (titulo, tipo_ingressoid, quantidade, valor_unitario, 
                                          data_inicio, data_termino, taxa_servico, 
                                          min_qtd_por_compra, max_qtd_por_compra, evento_id)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						titulo,
						idtipo_ingresso,
						quantidade,
						valor_unitario,
						ingresso_data_inicio || null,
						ingresso_data_termino || null,
						taxa_servico || 0,
						min_qtd_por_compra || 1,
						max_qtd_por_compra || quantidade,
						idevento,
					]
				);
			}
		}

		await connection.commit();

		res.status(201).json({
			message: 'Evento criado com sucesso!',
			idevento: idevento,
		});
	} catch (error) {
		await connection.rollback();
		console.error('Erro ao criar evento:', error);
		res.status(500).json({
			error: 'Erro ao criar evento',
			details: error.message,
		});
	} finally {
		connection.release();
	}
});

router.get('/search', async (req, res) => {
	//buscar evento no debounce
});

router.get('/all', async (req, res) => {
	const connection = await db.getConnection();

	try {
		const [eventosHoje] = await db.query(
            'SELECT evento.idevento, evento.nome, evento.data_inicio, endereco_evento.idendereco_evento, endereco_evento.local, endereco_evento.rua, endereco_evento.complemento, endereco_evento.bairro, endereco_evento.cidade, endereco_evento.estado, endereco_evento.cep, endereco_evento.numero FROM evento INNER JOIN endereco_evento ON evento.endereco_eventoid = endereco_evento.idendereco_evento WHERE evento.evento_ativo = 1 ORDER BY evento.data_inicio ASC LIMIT 8;'
		);

        const [eventosPagos] = await db.query(
            'SELECT evento.idevento, evento.nome, evento.data_inicio, endereco_evento.idendereco_evento, endereco_evento.local, endereco_evento.rua, endereco_evento.complemento, endereco_evento.bairro, endereco_evento.cidade, endereco_evento.estado, endereco_evento.cep, endereco_evento.numero FROM evento INNER JOIN endereco_evento ON evento.endereco_eventoid = endereco_evento.idendereco_evento WHERE evento.evento_ativo = 1 AND evento.evento_premium = 1 ORDER BY evento.data_inicio ASC LIMIT 3;'
		);

		console.log('LISTA DE EVENTOS:', rows);
		res.status(200).json({
			carrosselPrincipal: eventosPagos,
            carrosselHoje: eventosHoje,
		});
	} catch (error) {
		console.error('Erro ao carregar evento:', error);
		res.status(500).json({
			error: 'Erro ao carregar evento',
			details: error.message,
		});
	} finally {
		connection.release();
	}
});

export default router;
