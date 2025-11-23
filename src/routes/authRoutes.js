import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/database.js';

const router = express.Router();

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

        // Inserir no banco (idtipo_conta = 1 para usuário comum)
        const [resultado] = await db.query(
            `INSERT INTO conta (nome, email, cpf_cnpj, telefone, senha, idtipo_conta) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nomeCompleto, email, cpfNumerico, telefone, senhaHash, 1]
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

export default router;