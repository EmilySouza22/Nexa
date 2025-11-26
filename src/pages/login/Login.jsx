import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import image from '../../assets/login/image.png';
import image1 from '../../assets/login/image1.png';
import linhaEsquerda from '../../assets/login/linhaEsquerda.png';
import linhaDireita from '../../assets/login/linhaDireita.png';

function Login() {
    const navigate = useNavigate();
    const [dadosLogin, setDadosLogin] = useState({
        email: "",
        senha: "",
    });

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const mudarLogin = (e) => {
        const { name, value } = e.target;
        setDadosLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Limpar erro ao digitar
        if (erro) setErro("");
    };

    const enviarLogin = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setErro("");

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: dadosLogin.email,
                    senha: dadosLogin.senha
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Login bem-sucedido
                console.log("Login realizado com sucesso!", data);
                
                // Salvar dados do usuário no sessionStorage
                sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
                
                // Redirecionar baseado no tipo de conta
                if (data.usuario.tipoConta === 2) {
                    navigate('/dashboard-organizador');
                } else {
                    navigate('/home');
                }
            } else {
                // Erro de autenticação
                setErro(data.error || 'Erro ao fazer login');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErro('Erro de conexão com o servidor. Tente novamente.');
        } finally {
            setCarregando(false);
        }
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
                        disabled={carregando}
                        required
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id='senha'
                        name='senha'
                        value={dadosLogin.senha}
                        onChange={mudarLogin}
                        disabled={carregando}
                        required
                    />

                    <a href="/esqueci-senha" className="esqueci-senha">Esqueceu sua senha?</a>

                    {erro && (
                        <p style={{ 
                            color: '#F8A0CC', 
                            fontSize: '12px', 
                            textAlign: 'center', 
                            marginTop: '10px',
                            backgroundColor: 'rgba(248, 160, 204, 0.1)',
                            padding: '8px',
                            borderRadius: '4px'
                        }}>
                            {erro}
                        </p>
                    )}

                    <br />

                    <button 
                        type='submit' 
                        className='btn-entrar'
                        disabled={carregando}
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>

                    <p className='cadastro-text'>
                        Não possui uma conta? <a href="/cadastro" className="cadastro-link">Cadastre-se!</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;