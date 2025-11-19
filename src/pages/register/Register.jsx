import { useState } from 'react'
import './Register.css';

function Cadastro() {
    const [dadosCadastro, setDadosCadastro] = useState({
        nomeCompleto: "",
        email: "",
        cpf: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
    });

    const [erroSenha, setErroSenha] = useState("");

    const mudarCad = (e) => {
        const { name, value } = e.target;
        setDadosCadastro((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const enviarCad = (e) => {
        e.preventDefault();

        if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
            setErroSenha("As senhas não coincidem");
            return;
        }

        setErroSenha("");

        localStorage.setItem("usuario", JSON.stringify(dadosCadastro));

        console.log("Cadastro realizado:", dadosCadastro);


    };

    return (

        <div className='cadastro-container' >

            <div className='cadastro-form'>
                <div className='divisor'>
                    <img src='/imagens/Rectangle 63.png' alt="linha esquerda" className='linha' />
                    <img src='/imagens/SvgjsG2252.png' alt="icone central" className='iconePequeno' />
                    <img src='/imagens/Rectangle 63.png' alt="linha direita" className='linha' />
                </div>

                <br />
                <br />

                <form onSubmit={enviarCad}>
                    <label htmlFor="nomeCompleto">Nome completo</label>
                    <input
                        type="text"
                        id='nomeCompleto'
                        name='nomeCompleto'
                        value={dadosCadastro.nomeCompleto}
                        onChange={mudarCad}
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id='email'
                        name='email'
                        value={dadosCadastro.email}
                        onChange={mudarCad}
                    />

                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        id='cpf'
                        name='cpf'
                        value={dadosCadastro.cpf}
                        onChange={mudarCad}
                    />

                    <label htmlFor="telefone">Telefone</label>
                    <input
                        type="text"
                        id='telefone'
                        name='telefone'
                        value={dadosCadastro.telefone}
                        onChange={mudarCad}
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id='senha'
                        name='senha'
                        value={dadosCadastro.senha}
                        onChange={mudarCad}
                    />

                    <label htmlFor="confirmarSenha">Confirmar senha</label>
                    <input
                        type="password"
                        id='confirmarSenha'
                        name='confirmarSenha'
                        value={dadosCadastro.confirmarSenha}
                        onChange={mudarCad}
                    />

                    {erroSenha && (
                        <p style={{ color: '#F8A0CC', fontSize: '12px', textAlign: 'center', marginTop: '5px' }}>
                            {erroSenha}
                        </p>
                    )}

                    <br />

                    <button type='submit' className='btn-cadastrar'>Cadastrar</button>

                    <p className='login-text'>
                        Já possui conta? <a href="/login" className="login-link">Faça login!</a>
                    </p>



                </form>
            </div>

            <div className='cadastro-info'>
                <div className='divisor'>
                    <img src='/imagens/SvgjsG2251.png' alt="icone central" className='iconeGrande' />
                </div>
                <br />
                <br />
                <h3>Cadastre-se para ganhar novas experiências!</h3>
            </div>
        </div>


    )
}

export default Cadastro
