import { useState, useEffect } from "react";
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
  const userId = sessionStorage.getItem("userId"); // ID do usuário logado

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



  // === FORMATAÇÕES === //

  // Função para limpar CPF/CNPJ -> remove tudo que não for número
  const limparCpfCnpj = (valor) => {
    return valor.replace(/\D/g, "");
  };

  // Função para formatar CPF/CNPJ enquanto digita
  const formatarCpfCnpj = (value) => {
    const limpo = limparCpfCnpj(value);

    // CPF: 000.000.000-00 (11 dígitos)
    if (limpo.length <= 11) {
      return limpo
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    // CNPJ: 00.000.000/0000-00 (14 dígitos)
    else {
      return limpo
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };

  // ========== BUSCAR DADOS DO USUÁRIO QUANDO A PÁGINA CARREGAR ==========
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/usuario/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          // Preenche os campos com os dados vindos do banco
          setDadosPerfilConvidado({
            nomeCompleto: data.usuario.nome || "",
            email: data.usuario.email || "",
            telefone: data.usuario.telefone || "",

            dataNascimento: "",
            cpf_cnpj: "",

            cpf_cnpj: data.usuario.cpf_cnpj
              ? formatarCpfCnpj(data.usuario.cpf_cnpj)
              : "",
            dataNascimento: "",
            senha: "", // Senha sempre vazia por segurança
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setMensagem("Erro ao carregar dados do usuário");
      }
    };

    // Só busca se tiver userId
    if (userId) {
      buscarDados();
    }
  }, [userId]); // Executa quando userId mudar

  // ========== FUNÇÃO DE ATUALIZAÇÃO ==========
  const atualizarDados = (e) => {
    const { name, value } = e.target;

    setDadosPerfilConvidado((prev) => ({
      ...prev,
      [name]: value,


    let valorFormatado = value;

    // Se for o campo CPF/CNPJ, aplica a formatação automática
    if (name === "cpf_cnpj") {
      valorFormatado = formatarCpfCnpj(value);
    }

    setDadosPerfilConvidado((prev) => ({
      ...prev,
      [name]: valorFormatado,
    }));
  };

  // ========== FUNÇÃO DE SALVAR ==========
  const salvarAlteracoes = async (e) => {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);


    // Limpa o CPF/CNPJ removendo a máscara - envia só números pro backend
    const cpfCnpjLimpo = limparCpfCnpj(dadosPerfilConvidado.cpf_cnpj);

    // Validação: CPF deve ter 11 dígitos, CNPJ deve ter 14 dígitos
    if (
      cpfCnpjLimpo &&
      cpfCnpjLimpo.length !== 11 &&
      cpfCnpjLimpo.length !== 14
    ) {
      setMensagem("CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos");
      setCarregando(false);
      return;
    }

 main
    try {
      // Faz a chamada para a API de atualização
      const response = await fetch(
        `http://localhost:3000/api/auth/usuario/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(dadosPerfilConvidado),

          body: JSON.stringify({
            ...dadosPerfilConvidado,
            cpf_cnpj: cpfCnpjLimpo, // Envia só números
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensagem("Dados atualizados com sucesso!");

        // Atualiza o sessionStorage se mudou o nome
        if (dadosPerfilConvidado.nomeCompleto) {
          sessionStorage.setItem("userName", dadosPerfilConvidado.nomeCompleto);
        }

        // Atualiza o sessionStorage se cadastrou CPF
        if (dadosPerfilConvidado.cpf_cnpj) {
          sessionStorage.setItem("userCpf", dadosPerfilConvidado.cpf_cnpj);

        if (cpfCnpjLimpo) {
          sessionStorage.setItem("userCpf", cpfCnpjLimpo);
 main
        }
      } else {
        setMensagem(data.error || "Erro ao atualizar dados");
      }
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

                Dados
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

                    maxLength="18"
 
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
                    placeholder="Deixe em branco para manter a atual"
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
                  <img src={iconsPE1.save} alt="Salvar" className="icon-save" />
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
