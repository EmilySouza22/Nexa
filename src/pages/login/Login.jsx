import { useState } from 'react';
import "./Login.css";
import image from '../../assets/login/image.png';
import image1 from '../../assets/login/image1.png';
import linhaEsquerda from '../../assets/login/linhaEsquerda.png';
import linhaDireita from '../../assets/login/linhaDireita.png';


function Login() {
    const [dadosLogin, setDadosLogin] = useState({
        email: "",
        senha: "",
    });

    const [erro, setErro] = useState("");

    const mudarLogin = (e) => {
        const { name, value } = e.target;
        setDadosLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const enviarLogin = (e) => {
        e.preventDefault();

        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioSalvo) {
            if (usuarioSalvo.email === dadosLogin.email && usuarioSalvo.senha === dadosLogin.senha) {
                console.log("Login realizado com sucesso!");
                setErro("");
                // Redirecionar para página principal
            } else {
                setErro("E-mail ou senha incorretos");
            }
        } else {
            setErro("Usuário não encontrado");
        }
    };

    const handleGoogleLogin = () => {
        console.log("Login com Google");
        // Implementar lógica de login com Google
    };

    return (
        <div className='login-container'>
            <div className='login-info'>
                <div className='divisor'>
                    
                    <img src={image} alt="icone central" className='iconeGrande' />
                    
                </div>
                <br />
                <br />
                <h3>Faça login para acessar nossa plataforma!</h3>
            </div>

            <div className='login-form'>
                <div className='divisor'>
                    <img src={linhaEsquerda} alt="linha esquerda" className='linha' />
                    <img src={image1} alt="icone central pequeno" className='iconePequeno' />
                    <img src={linhaDireita} alt="linha direita" className='linha' />
                </div>

                <br />
                <br />

                <form onSubmit={enviarLogin}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        value={dadosLogin.email}
                        onChange={mudarLogin}
                        required
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id='senha'
                        name='senha'
                        value={dadosLogin.senha}
                        onChange={mudarLogin}
                        required
                    />

                    <a href="/esqueci-senha" className="esqueci-senha">Esqueceu sua senha?</a>

                    {erro && (
                        <p style={{ color: '#F8A0CC', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
                            {erro}
                        </p>
                    )}

                    <br />

                    <button type='button' onClick={handleGoogleLogin} className='btn-google'>
                        <img src="https://www.google.com/favicon.ico" alt="Google" className='google-icon' />
                        Continue with Google
                    </button>

                    <button type='submit' className='btn-entrar'>Entrar</button>

                    <p className='cadastro-text'>
                        Não possui uma conta? <a href="/cadastro" className="cadastro-link">Cadastre-se!</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
