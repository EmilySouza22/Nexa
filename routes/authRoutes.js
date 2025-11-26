import express from 'express';
import bcrypt from 'bcrypt';
import db from '../src/config/database.js';

const router = express.Router();

// ROTA DE REGISTRO
router.post('/register', async (req, res) => {
    try {
        const { nomeCompleto, email, cpf, telefone, senha } = req.body;

        // Validações básicas
        if (!nomeCompleto || !email || !cpf || !senha) {
            return res.status(400).json({
                error: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }

        // Verificar se email já existe
        const [emailExistente] = await db.query(
            'SELECT email FROM conta WHERE email = ?',
            [email]
        );

        if (emailExistente.length > 0) {
            return res.status(400).json({
                error: 'E-mail já cadastrado'
            });
        }

        // Verificar se CPF já existe
        const cpfNumerico = cpf.replace(/\D/g, ''); // remove pontos e traços
        const [cpfExistente] = await db.query(
            'SELECT cpf_cnpj FROM conta WHERE cpf_cnpj = ?',
            [cpfNumerico]
        );

        if (cpfExistente.length > 0) {
            return res.status(400).json({
                error: 'CPF já cadastrado'
            });
        }

        // Criptografar senha
        const senhaHash = await bcrypt.hash(senha, 10);

        const [resultado] = await db.query(
            `INSERT INTO conta (nome, email, cpf_cnpj, telefone, senha, idtipo_conta) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nomeCompleto, email, cpfNumerico, telefone, senhaHash, 1] // 1 = usuário convidado
        );

        res.status(201).json({
            message: 'Cadastro realizado com sucesso!',
            idconta: resultado.insertId
        });

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        res.status(500).json({
            error: 'Erro ao realizar cadastro'
        });
    }
});

// ROTA DE LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validação básica
        if (!email || !senha) {
            return res.status(400).json({ 
                error: 'E-mail e senha são obrigatórios' 
            });
        }

        // Buscar usuário pelo e-mail
        const [rows] = await db.query(
            'SELECT idconta, nome, email, senha, idtipo_conta FROM conta WHERE email = ?',
            [email]
        );

        // Verificar se usuário existe
        if (rows.length === 0) {
            return res.status(401).json({ 
                error: 'E-mail ou senha incorretos' 
            });
        }

        const usuario = rows[0];

        // Comparar senha criptografada
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ 
                error: 'E-mail ou senha incorretos' 
            });
        }

        // Login bem-sucedido - retornar dados do usuário (sem a senha)
        res.status(200).json({
            message: 'Login realizado com sucesso',
            usuario: {
                id: usuario.idconta,
                nome: usuario.nome,
                email: usuario.email,
                tipoConta: usuario.idtipo_conta
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// ROTA PARA VERIFICAR E-MAIL (útil para "Esqueci minha senha")
router.post('/verificar-email', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                error: 'E-mail é obrigatório' 
            });
        }

        const [rows] = await db.query(
            'SELECT idconta FROM conta WHERE email = ?',
            [email]
        );

        if (rows.length > 0) {
            res.status(200).json({ 
                existe: true,
                message: 'E-mail encontrado' 
            });
        } else {
            res.status(404).json({ 
                existe: false,
                message: 'E-mail não encontrado' 
            });
        }

    } catch (error) {
        console.error('Erro ao verificar e-mail:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

export default router;