import { useState } from "react";
import "./Register.css";
import axios from "axios";

function Cadastro() {
  const [dadosCadastro, setDadosCadastro] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erroSenha, setErroSenha] = useState("");

  // Função para limpar telefone - remove tudo que não for número
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

    // Validação 1: Verifica se as senhas são iguais
    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      setErroSenha("As senhas não coincidem");
      return;
    }

    // Validação 2: Verifica se todos os campos foram preenchidos
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

    // Limpa o telefone removendo a máscara - envia só números pro backend
    const telefoneLimpo = limparTelefone(dadosCadastro.telefone);

    // Validação 3: Verifica se o telefone tem entre 10 e 11 dígitos
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      setErroSenha("Telefone inválido!");
      return;
    }

    // Validação 4: Verifica se o e-mail tem formato válido (exemplo@dominio.com)
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosCadastro.email);
    if (!emailValido) {
      setErroSenha("Digite um e-mail válido!");
      return;
    }

    // Validação 5: Verifica se a senha tem no mínimo 6 caracteres
    if (dadosCadastro.senha.length < 6) {
      setErroSenha("A senha deve ter pelo menos 6 caracteres");
      return;
    }

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
          <img
            src="/imagens/Rectangle 63.png"
            alt="linha esquerda"
            className="linha"
          />
          <img
            src="/imagens/SvgjsG2252.png"
            alt="icone central"
            className="iconePequeno"
          />
          <img
            src="/imagens/Rectangle 63.png"
            alt="linha direita"
            className="linha"
          />
        </div>

        <br />
        <br />

        <form onSubmit={enviarCad}>
          <label htmlFor="nomeCompleto">Nome completo</label>
          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            placeholder="João Silva"
            value={dadosCadastro.nomeCompleto}
            onChange={mudarCad}
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="joao@email.com"
            value={dadosCadastro.email}
            onChange={mudarCad}
          />

          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            placeholder="(48) 99999-9999"
            maxLength="15"
            value={dadosCadastro.telefone}
            onChange={mudarCad}
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={dadosCadastro.senha}
            onChange={mudarCad}
          />

          <label htmlFor="confirmarSenha">Confirmar senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            value={dadosCadastro.confirmarSenha}
            onChange={mudarCad}
          />

          {erroSenha && (
            <p
              style={{
                color: "#F8A0CC",
                fontSize: "12px",
                textAlign: "center",
                marginTop: "5px",
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
        <div className="divisor">
          <img
            src="/imagens/SvgjsG2251.png"
            alt="icone central"
            className="iconeGrande"
          />
        </div>
        <br />
        <br />
        <h3>Cadastre-se para ganhar novas experiências!</h3>
      </div>
    </div>
  );
}

export default Cadastro;
