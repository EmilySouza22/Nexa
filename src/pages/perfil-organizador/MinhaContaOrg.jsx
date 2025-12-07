import { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import "./MinhaContaOrg.css";

// Componente principal do formulário "Minha Conta" - Organizador
function MinhaConta() {
  // ========== ESTADOS (variáveis que guardam dados) ==========
  
  const [dadosMinhaContaOrg, setDadosMinhaContaOrg] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    cpf_cnpj: "",
    email: "",
    telefone: "",
    senha: ""
  });

  // Estados auxiliares
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  // ========== FUNÇÕES QUE ATUALIZAM OS DADOS ==========
  
  // Atualiza os campos conforme o usuário digita
  const atualizarDadosOrg = (e) => {
    const { name, value } = e.target;
    setDadosMinhaContaOrg((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envia os dados para o banco de dados via API
  const enviarAtualizacao = async (e) => {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);
    
    try {
      // Aqui você faz a chamada para a API
      // const response = await fetch('sua-api-aqui', { ... });
      // const data = await response.json();
      
      console.log("Dados enviados:", dadosMinhaContaOrg);
      setMensagem("Dados atualizados com sucesso!");
    } catch (error) {
      setMensagem("Erro ao atualizar dados. Tente novamente.");
      console.error("Erro:", error);
    } finally {
      setCarregando(false);
    }
  };

  // ========== RETORNO DO COMPONENTE (o que aparece na tela) ==========
  const location = useLocation();
  const isOrganizadorAtivo = location.pathname === "/organizador";
  
  return (
    <div className="minha-conta-container">
      {/* Barra de navegação no topo */}
      <div className="abas-container">
        <NavLink 
          to="/minha-conta"
          className={({ isActive }) => 
            isActive ? "aba ativa" : isOrganizadorAtivo ? "aba aba-com-risco" : "aba"
          }
        >
          Minha Conta
        </NavLink>
        <NavLink 
          to="/organizador"
          className={({ isActive }) => 
            isActive ? "aba ativa" : "aba aba-com-risco"
          }
        >
          Organizador
        </NavLink>
      </div>

      {/* Formulário principal */}
      <form onSubmit={enviarAtualizacao} className="form-minha-conta">
        {/* Campo Nome Completo */}
        <div className="campo-input">
          <label htmlFor="nomeCompleto">Nome completo</label>
          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={dadosMinhaContaOrg.nomeCompleto}
            onChange={atualizarDadosOrg}
            required
          />
        </div>

        {/* Campo Data de Nascimento */}
        <div className="campo-input">
          <label htmlFor="dataNascimento">Data de nascimento</label>
          <input
            type="text"
            id="dataNascimento"
            name="dataNascimento"
            value={dadosMinhaContaOrg.dataNascimento}
            onChange={atualizarDadosOrg}
            required
          />
        </div>

        {/* Campo CPF ou CNPJ */}
        <div className="campo-input">
          <label htmlFor="cpf_cnpj">CPF ou CNPJ</label>
          <input
            type="text"
            id="cpf_cnpj"
            name="cpf_cnpj"
            value={dadosMinhaContaOrg.cpf_cnpj}
            onChange={atualizarDadosOrg}
            required
          />
        </div>

        {/* Campo E-mail */}
        <div className="campo-input">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={dadosMinhaContaOrg.email}
            onChange={atualizarDadosOrg}
            required
          />
        </div>

        {/* Campo Telefone */}
        <div className="campo-input">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={dadosMinhaContaOrg.telefone}
            onChange={atualizarDadosOrg}
            required
          />
        </div>

        {/* Campo Senha */}
        <div className="campo-input">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={dadosMinhaContaOrg.senha}
            onChange={atualizarDadosOrg}
            required
          />
        </div>

        {/* Mensagem de feedback */}
        {mensagem && (
          <div style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '8px',
            backgroundColor: mensagem.includes('sucesso') ? '#d4edda' : '#f8d7da',
            color: mensagem.includes('sucesso') ? '#155724' : '#721c24'
          }}>
            {mensagem}
          </div>
        )}

        {/* Botão de Salvar */}
        <button type="submit" className="btn-salvar" disabled={carregando}>
          {/* Ícone de disquete (salvar) */}
          <svg className="icon-save" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5" width="16" height="16" rx="1.5" fill="white"/>
            <rect x="6" y="3" width="12" height="2.5" rx="0.5" fill="white"/>
            <rect x="9" y="10" width="6" height="6" rx="1" fill="#D397FD"/>
          </svg>
          {carregando ? "Enviando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}

export default MinhaConta;