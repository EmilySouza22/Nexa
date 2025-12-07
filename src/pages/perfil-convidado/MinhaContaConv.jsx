import { useState } from 'react';
import "./MinhaConntaConv.css";

// ========== COMPONENTE PRINCIPAL ==========
/**
 * Componente PerfilConvidado
 * Exibe um formulário para o usuário editar seus dados pessoais
 * Inclui navegação por abas e campos para informações do perfil
 */
function PerfilConvidado() {
  // ========== ESTADOS ==========
  const [dadosPerfilConvidado, setDadosPerfilConvidado] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    cpf_cnpj: "",
    email: "",
    telefone: "",
    senha: ""
  });

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("minha-conta");

  // ========== FUNÇÃO DE ATUALIZAÇÃO ==========
  const atualizarDados = (e) => {
    const { name, value } = e.target;
    setDadosPerfilConvidado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========== FUNÇÃO DE SALVAR ==========
  const salvarAlteracoes = async (e) => {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      console.log("Dados enviados:", dadosPerfilConvidado);
      setMensagem("Dados atualizados com sucesso!");
    } catch (error) {
      setMensagem("Erro ao atualizar dados. Tente novamente.");
      console.error("Erro:", error);
    } finally {
      setCarregando(false);
    }
  };

  // ========== RETORNO ==========
  return (
    <div className="minha-conta-container">
      
      {/* ========== NAVEGAÇÃO ========== */}
      <div className="abas-container">
        <button
          type="button"
          onClick={() => setAbaAtiva("minha-conta")}
          className={
            `aba ${abaAtiva === "minha-conta" ? "ativa" : "aba-com-risco"}`
          }
        >
          Minha conta
        </button>
      </div>

      {/* ========== FORMULÁRIO ========== */}
      {abaAtiva === "minha-conta" && (
        <form onSubmit={salvarAlteracoes} className="form-minha-conta">

          <div className="campo-input">
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              value={dadosPerfilConvidado.nomeCompleto}
              onChange={atualizarDados}
              required
            />
          </div>

          <div className="campo-input">
            <label htmlFor="dataNascimento">Data de nascimento</label>
            <input
              type="text"
              id="dataNascimento"
              name="dataNascimento"
              value={dadosPerfilConvidado.dataNascimento}
              onChange={atualizarDados}
              required
            />
          </div>

          <div className="campo-input">
            <label htmlFor="cpf_cnpj">CPF ou CNPJ</label>
            <input
              type="text"
              id="cpf_cnpj"
              name="cpf_cnpj"
              value={dadosPerfilConvidado.cpf_cnpj}
              onChange={atualizarDados}
              required
            />
          </div>

          <div className="campo-input">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={dadosPerfilConvidado.email}
              onChange={atualizarDados}
              required
            />
          </div>

          <div className="campo-input">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={dadosPerfilConvidado.telefone}
              onChange={atualizarDados}
              required
            />
          </div>

          <div className="campo-input">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={dadosPerfilConvidado.senha}
              onChange={atualizarDados}
              required
            />
          </div>

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

          <button type="submit" className="btn-salvar" disabled={carregando}>
            <svg className="icon-save" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="5" width="16" height="16" rx="1.5" fill="white"/>
              <rect x="6" y="3" width="12" height="2.5" rx="0.5" fill="white"/>
              <rect x="9" y="10" width="6" height="6" rx="1" fill="#D397FD"/>
            </svg>
            {carregando ? "Enviando..." : "Salvar Alterações"}
          </button>
        </form>
      )}

    </div>
  );
}

export default PerfilConvidado;