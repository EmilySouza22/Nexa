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
                error: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }

        // Verifica se email já existe
        const [emailExistente] = await db.query(
            'SELECT email FROM conta WHERE email = ?',
            [email]
        );

        if (emailExistente.length > 0) {
            return res.status(400).json({
                error: 'E-mail já cadastrado'
            });
        }

        // === Criptografar senha === // 
        const senhaHash = await bcrypt.hash(senha, 10);

        const [resultado] = await db.query(
            `INSERT INTO conta (nome, email, telefone, senha, idtipo_conta) 
             VALUES (?, ?, ?, ?, ?)`,
            [nomeCompleto, email, telefone, senhaHash, 1]
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

        if (!email || !senha) {
            return res.status(400).json({
                error: 'E-mail e senha são obrigatórios'
            });
        }

        const [rows] = await db.query(
            'SELECT idconta, nome, email, senha, idtipo_conta FROM conta WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                error: 'E-mail ou senha incorretos'
            });
        }

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                error: 'E-mail ou senha incorretos'
            });
        }

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

// ROTA PARA VERIFICAR E-MAIL
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