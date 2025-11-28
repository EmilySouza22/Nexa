import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { iconsCA } from "../../utils/icons";

function Cadastro() {
  const [dadosCadastro, setDadosCadastro] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });


  // Guarda as mensagens de erro 
  const [erroSenha, setErroSenha] = useState("");

  // Pra ocultar e mostrar a senha 
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Pra ocultar e mostrar a senha (só que no campo de confirmar senha)
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  // === FORMATAÇÕES === //

  // Telefone //

  // Função para limpar telefone -> remove tudo que não for número
  const limparTelefone = (telefone) => {
    return telefone.replace(/\D/g, "");
  };

  // Função para formatar telefone enquanto digita - adiciona máscara (00) 00000-0000
  const formatarTelefone = (value) => {
    const telLimpo = limparTelefone(value);

    if (telLimpo.length <= 11) {
      if (telLimpo.length <= 10) {
        // Formato para telefone fixo: (00) 0000-0000
        return telLimpo
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2");
      } else {
        // Formato para celular: (00) 00000-0000
        return telLimpo
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2");
      }
    }
    return value;
  };

  const mudarCad = (e) => {
    const { name, value } = e.target;

    let valorFormatado = value;

    // Se for o campo telefone, aplica a formatação automática
    if (name === "telefone") {
      valorFormatado = formatarTelefone(value);
    }

    setDadosCadastro((prev) => ({
      ...prev,
      [name]: valorFormatado,
    }));
  };

  const enviarCad = async (e) => {
    e.preventDefault();

    // === VALIDAÇÕES === //

    // Verifica se as senhas são iguais
    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      setErroSenha("As senhas não coincidem");
      return;
    }

    // Verifica se todos os campos foram preenchidos
    if (
      !dadosCadastro.nomeCompleto ||
      !dadosCadastro.email ||
      !dadosCadastro.telefone ||
      !dadosCadastro.senha ||
      !dadosCadastro.confirmarSenha
    ) {
      setErroSenha("Preencha todos os campos");
      return;
    }

    // Verifica se o telefone tem entre 10 e 11 dígitos
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      setErroSenha("Telefone inválido!");
      return;
    }

    // Verifica se o e-mail tem formato válido
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosCadastro.email);
    if (!emailValido) {
      setErroSenha("Digite um e-mail válido!");
      return;
    }

    // Verifica se a senha tem no mínimo 6 caracteres
    if (dadosCadastro.senha.length < 6) {
      setErroSenha("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    // === Limpando === //

    // Limpa o telefone removendo a máscara - envia só números pro backend
    const telefoneLimpo = limparTelefone(dadosCadastro.telefone);

    // Limpa o erro se passou em todas as validações
    setErroSenha("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          nomeCompleto: dadosCadastro.nomeCompleto.trim(), // Remove espaços extras
          email: dadosCadastro.email.toLowerCase().trim(), // Converte para minúsculo e remove espaços
          telefone: telefoneLimpo, // Envia só números
          senha: dadosCadastro.senha,
        }
      );

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (error) {
      console.error("Erro:", error);
      const mensagem =
        error.response?.data?.error || "Erro ao conectar com o servidor";
      setErroSenha(mensagem);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form">
        <div className="divisor">
          <div className="linha"></div>
          <img
            src={iconsCA.icon1}
            alt="icone central"
            className="iconePequeno"
          />
          <div className="linha"></div>
        </div>

        <br />
        <br />

        <form onSubmit={enviarCad}>
          <label htmlFor="nomeCompleto">Nome completo</label>
          <div className="input-wrapper">
            <img
              src={iconsCA.user}
              alt="ícone usuário"
              className="input-icon"
            />
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              placeholder="Insira seu nome completo"
              value={dadosCadastro.nomeCompleto}
              onChange={mudarCad}
            />
          </div>

          <label htmlFor="email">E-mail</label>
          <div className="input-wrapper">
            <img src={iconsCA.email} alt="ícone email" className="input-icon" />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
              value={dadosCadastro.email}
              onChange={mudarCad}
            />
          </div>

          <label htmlFor="telefone">Telefone</label>
          <div className="input-wrapper">
            <img
              src={iconsCA.telefone}
              alt="ícone telefone"
              className="input-icon"
            />
            <input
              type="text"
              id="telefone"
              name="telefone"
              placeholder="Insira seu telefone"
              maxLength="15"
              value={dadosCadastro.telefone}
              onChange={mudarCad}
            />
          </div>

          <label htmlFor="senha">Senha</label>
          <div className="input-wrapper">
            <img
              src={mostrarSenha ? iconsCA.olhoAberto : iconsCA.olhoFechado}
              alt="mostrar/ocultar senha"
              className="input-icon-clickable"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            />
            <input
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              name="senha"
              placeholder="Insira sua senha"
              value={dadosCadastro.senha}
              onChange={mudarCad}
            />
          </div>

          <label htmlFor="confirmarSenha">Confirmar senha</label>
          <div className="input-wrapper">
            <img
              src={
                mostrarConfirmarSenha ? iconsCA.olhoAberto : iconsCA.olhoFechado
              }
              alt="mostrar/ocultar senha"
              className="input-icon-clickable"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            />
            <input
              type={mostrarConfirmarSenha ? "text" : "password"}
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              value={dadosCadastro.confirmarSenha}
              onChange={mudarCad}
            />
          </div>

          {erroSenha && (
            <p
              style={{
                color: "#F8A0CC",
                fontSize: "12px",
                textAlign: "center",
                marginTop: "10px",
                backgroundColor: "rgba(248, 160, 204, 0.1)",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              {erroSenha}
            </p>
          )}

          <br />

          <button type="submit" className="btn-cadastrar">
            Cadastrar
          </button>

          <p className="login-text">
            Já possui conta?{" "}
            <a href="/login" className="login-link">
              Faça login!
            </a>
          </p>
        </form>
      </div>

      <div className="cadastro-info">
        <img src={iconsCA.icon2} alt="icone central" className="iconeGrande" />
        <h3>Cadastre-se para ganhar novas experiências!</h3>
      </div>
    </div>
  );
}

export default Cadastro;
