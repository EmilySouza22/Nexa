import express from 'express';
import bcrypt from 'bcrypt';
import db from '../src/config/database.js';

const router = express.Router();

// ROTA DE REGISTRO
router.post('/register', async (req, res) => {
	try {
		const { nomeCompleto, email, telefone, senha } = req.body;

		// === VALIDAÇÕES === //

		// Validações + básicas

		if (!nomeCompleto || !email || !senha) {
			return res.status(400).json({
				error: 'Todos os campos obrigatórios devem ser preenchidos',
			});
		}

		// Verifica se email já existe
		const [emailExistente] = await db.query(
			'SELECT email FROM conta WHERE email = ?',
			[email]
		);

		if (emailExistente.length > 0) {
			return res.status(400).json({
				error: 'E-mail já cadastrado',
			});
		}

		// === Criptografar senha === //
		const senhaHash = await bcrypt.hash(senha, 10);

		const [resultado] = await db.query(
			`INSERT INTO conta (nome, email, telefone, senha, tipo_contaid) 
             VALUES (?, ?, ?, ?, ?)`,
			[nomeCompleto, email, telefone, senhaHash, 1]
		);

		res.status(201).json({
			message: 'Cadastro realizado com sucesso!',
			idconta: resultado.insertId,
		});
	} catch (error) {
		console.error('Erro ao cadastrar:', error);
		res.status(500).json({
			error: 'Erro ao realizar cadastro',
		});
	}
});

// ROTA DE LOGIN
router.post('/login', async (req, res) => {
	try {
		const { email, senha } = req.body;

		if (!email || !senha) {
			return res.status(400).json({
				error: 'E-mail e senha são obrigatórios',
			});
		}

		const [rows] = await db.query(
			'SELECT idconta, nome, email, senha, tipo_contaid FROM conta WHERE email = ?',
			[email]
		);

		if (rows.length === 0) {
			return res.status(401).json({
				error: 'E-mail ou senha incorretos',
			});
		}

		const usuario = rows[0];
		const senhaValida = await bcrypt.compare(senha, usuario.senha);

		if (!senhaValida) {
			return res.status(401).json({
				error: 'E-mail ou senha incorretos',
			});
		}

		res.status(200).json({
			message: 'Login realizado com sucesso',
			usuario: {
				idconta: usuario.idconta,
				nome: usuario.nome,
				email: usuario.email,
				tipoConta: usuario.tipo_contaid,
			},
		});
	} catch (error) {
		console.error('Erro no login:', error);
		res.status(500).json({
			error: 'Erro interno do servidor',
		});
	}
});

// ROTA PARA VERIFICAR E-MAIL
router.post('/verificar-email', async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				error: 'E-mail é obrigatório',
			});
		}

		const [rows] = await db.query('SELECT idconta FROM conta WHERE email = ?', [
			email,
		]);

		if (rows.length > 0) {
			res.status(200).json({
				existe: true,
				message: 'E-mail encontrado',
			});
		} else {
			res.status(404).json({
				existe: false,
				message: 'E-mail não encontrado',
			});
		}
	} catch (error) {
		console.error('Erro ao verificar e-mail:', error);
		res.status(500).json({
			error: 'Erro interno do servidor',
		});
	}
});

// ROTA PARA BUSCAR DADOS DO USUÁRIO LOGADO
router.get('/usuario/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const [rows] = await db.query(
			'SELECT idconta, nome, email, telefone FROM conta WHERE idconta = ?',
			'SELECT idconta, nome, email, telefone, cpf_cnpj FROM conta WHERE idconta = ?',
			[id]
		);

		if (rows.length === 0) {
			return res.status(404).json({
				error: 'Usuário não encontrado',
			});
		}

		res.status(200).json({
			usuario: rows[0],
		});
	} catch (error) {
		console.error('Erro ao buscar usuário:', error);
		res.status(500).json({
			error: 'Erro ao buscar dados do usuário',
		});
	}
});

// ROTA PARA ATUALIZAR DADOS DO USUÁRIO
router.put('/usuario/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const { nomeCompleto, email, telefone, senha, cpf_cnpj } = req.body;

		// Se tiver senha nova, criptografa
		let senhaHash;
		if (senha) {
			senhaHash = await bcrypt.hash(senha, 10);
		}

		// Monta a query dinamicamente (só atualiza o que foi enviado)
		let campos = [];
		let valores = [];

		if (nomeCompleto) {
			campos.push('nome = ?');
			valores.push(nomeCompleto);
		}
		if (email) {
			campos.push('email = ?');
			valores.push(email);
		}
		if (telefone) {
			campos.push('telefone = ?');
			valores.push(telefone);
		}
		if (senhaHash) {
			campos.push('senha = ?');
			valores.push(senhaHash);
		}

		if (cpf_cnpj) {
			campos.push('cpf_cnpj = ?');
			valores.push(cpf_cnpj);
		}

		if (campos.length === 0) {
			return res.status(400).json({
				error: 'Nenhum dado para atualizar',
			});
		}

		valores.push(id); // Adiciona o ID no final

		await db.query(
			`UPDATE conta SET ${campos.join(', ')} WHERE idconta = ?`,
			valores
		);

		res.status(200).json({
			message: 'Dados atualizados com sucesso!',
		});

		// Se cadastrou CPF/CNPJ, muda de convidado (1) para organizador (2)
		if (cpf_cnpj) {
			await db.query(
				'UPDATE conta SET tipo_contaid = 2 WHERE idconta = ? AND tipo_contaid = 1',
				[id]
			);
		}

		res.status(200).json({
			message: 'Dados atualizados com sucesso!',
			mudouTipo: !!cpf_cnpj,
		});
	} catch (error) {
		console.error('Erro ao atualizar usuário:', error);
		res.status(500).json({
			error: 'Erro ao atualizar dados',
		});
	}
});

export default router;
