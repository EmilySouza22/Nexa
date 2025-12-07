import { useState } from "react";
import "./MinhaContaConv.css";
import { iconsPE1 } from "../../utils/icons";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

// ========== COMPONENTE PRINCIPAL ==========
/**
 * Componente PerfilConvidado
 * Exibe um formulário para o usuário editar seus dados pessoais
 * Inclui navegação por abas e campos para informações do perfil
 */
function PerfilConvidado() {
  // Pegar dados do sessionStorage (salvos no login)
  const userName = sessionStorage.getItem("userName") || "Convidado";
  const userInitials = sessionStorage.getItem("userInitials") || "CO";
  const userCpf = sessionStorage.getItem("userCpf");

  // ========== ESTADOS ==========
  const [dadosPerfilConvidado, setDadosPerfilConvidado] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    cpf_cnpj: "",
    email: "",
    telefone: "",
    senha: "",
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
    <div className="perfil-convidado">
      <Navbar userName={userName} userInitials={userInitials} />
      <div className="perfil-convidado-layout">
        <Sidebar
          userType="convidado"
          userHasCpf={!!userCpf} // !! converte em boolean (true se tiver CPF, false se não)
        />
        <main className="perfil-convidado-content">
          <div className="minha-conta-container">
            {/* ========== NAVEGAÇÃO ========== */}
            <div className="abas-container">
              <button
                type="button"
                onClick={() => setAbaAtiva("minha-conta")}
                className={`aba ${
                  abaAtiva === "minha-conta" ? "ativa" : "aba-com-risco"
                }`}
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
                  <div
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      backgroundColor: mensagem.includes("sucesso")
                        ? "#d4edda"
                        : "#f8d7da",
                      color: mensagem.includes("sucesso")
                        ? "#155724"
                        : "#721c24",
                    }}
                  >
                    {mensagem}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-salvar"
                  disabled={carregando}
                >
                  <img src={iconsPE1.save1} alt="Salvar" className="icon-save" />
                  {carregando ? "Enviando..." : "Salvar Alterações"}
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PerfilConvidado;
