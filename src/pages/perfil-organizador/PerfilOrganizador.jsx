import "./PerfilOrganizador.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { iconsPE2 } from "../../utils/icons";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

// Componente principal do formulário de perfil do organizador
function PerfilOrganizador() {
  // Pegar dados do sessionStorage (salvos no login)
  const userName = sessionStorage.getItem("userName") || "Organizador";
  const userInitials = sessionStorage.getItem("userInitials") || "OR";
  const userCpf = sessionStorage.getItem("userCpf");

  // ========== ESTADOS (variáveis que guardam dados) ==========

  // Estado que guarda todos os dados do perfil do organizador
  const [dadosPerfilOrganizador, setDadosPerfilOrganizador] = useState({
    nome: "", // Nome do organizador
    descricao: "", // Descrição do perfil
    mostrarEmail: "", // Email para mostrar no perfil
    mostrarTelefone: "", // Telefone para mostrar no perfil
  });

  // Estado que guarda a pré-visualização da imagem selecionada
  const [imagemPreview, setImagemPreview] = useState(null);

  // ========== FUNÇÕES QUE ATUALIZAM OS DADOS ==========

  // Função que atualiza os campos de texto (nome e descrição)
  // É chamada quando o usuário digita algo nos inputs
  const atualizarDadosOrg = (e) => {
    const { name, value } = e.target;
    setDadosPerfilOrganizador((prev) => ({
      ...prev,
      [name]: value, // Atualiza o campo específico que foi alterado
    }));
  };

  // Função que atualiza os campos de email e telefone
  // É chamada quando o usuário digita algo nos inputs
  const atualizarEmailTelefone = (e) => {
    const { name, value } = e.target;
    setDadosPerfilOrganizador((prev) => ({
      ...prev,
      [name]: value, // Atualiza o campo específico que foi alterado
    }));
  };

  // Função que faz o upload da imagem
  // É chamada quando o usuário seleciona uma imagem
  const handleImagem = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      // Cria uma URL temporária para mostrar a imagem antes de salvar
      const urlImagem = URL.createObjectURL(arquivo);
      setImagemPreview(urlImagem);
    }
  };

  // Função que remove a imagem selecionada
  // É chamada quando o usuário clica no botão "Excluir imagem"
  const excluirImagem = () => {
    setImagemPreview(null);
  };

  // Função que salva todas as alterações
  // É chamada quando o usuário clica no botão "Salvar Alterações"
  const salvarAlteracoes = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    console.log("Dados enviados:", dadosPerfilOrganizador);
    // Aqui depois você salva no backend
  };

  // ========== RETORNO DO COMPONENTE (o que aparece na tela) ==========
  const location = useLocation();
  const isPerfilAtivo = location.pathname === "/organizador/perfil";

  return (
    <div className="perfil-organizador">
      <Navbar userName={userName} userInitials={userInitials} />
      <div className="perfil-organizador-layout">
        <Sidebar
          userType="organizador"
          userHasCpf={!!userCpf} // !! converte em boolean (true se tiver CPF, false se não)
        />
        <main className="perfil-organizador-content">
          <div className="organizador-container">
            {/* Barra de navegação no topo */}
            <div className="abas-container">
              <NavLink
                to="/organizador/perfil"
                className={({ isActive }) =>
                  isActive ? "aba ativa" : "aba aba-com-risco"
                }
              >
                Perfil
              </NavLink>

              <NavLink
                to="/organizador/minha-conta"
                className={({ isActive }) =>
                  isActive
                    ? "aba ativa"
                    : isPerfilAtivo
                    ? "aba aba-com-risco"
                    : "aba"
                }
              >
                Dados
              </NavLink>
            </div>

            {/* Formulário principal */}
            <form onSubmit={salvarAlteracoes} className="form-organizador">
              {/* ========== SEÇÃO DE FOTO ========== */}
              <div className="foto-area">
                {/* Círculo onde a foto aparece */}
                <div className="foto-circulo">
                  {/* Se tem imagem, mostra ela. Se não, mostra o texto "Foto" */}
                  {imagemPreview ? (
                    <img src={imagemPreview} alt="preview" />
                  ) : (
                    <span>Foto</span>
                  )}
                </div>

                {/* Retângulo rosa com informações e botões */}
                <div className="info-imagem-container">
                  {/* Texto de aviso sobre as imagens */}
                  <div className="aviso-imagens">
                    Você pode enviar imagens nos formatos JPG, JPEG ou PNG, com
                    tamanho máximo de 10MB. Evite conteúdo impróprio, como nudez
                    ou imagens ofensivas — isso pode resultar na remoção do seu
                    perfil.
                  </div>

                  {/* Container dos botões de imagem */}
                  <div className="imagem-botoes">
                    {/* Botão para excluir a imagem */}
                    <button
                      type="button"
                      onClick={excluirImagem}
                      className="btn-excluir"
                    >
                      Excluir imagem
                    </button>

                    {/* Botão para escolher uma imagem */}
                    <label htmlFor="uploadImg" className="btn-escolher">
                      Escolher Imagem
                    </label>

                    {/* Input de arquivo escondido */}
                    <input
                      type="file"
                      id="uploadImg"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleImagem}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>

              {/* ========== SEÇÃO DE INPUTS DE TEXTO ========== */}

              {/* Campo de nome */}
              <div className="campo-input">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={dadosPerfilOrganizador.nome}
                  onChange={atualizarDadosOrg}
                  required
                />
              </div>

              {/* Campo de descrição */}
              <div className="campo-input">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={dadosPerfilOrganizador.descricao}
                  onChange={atualizarDadosOrg}
                  required
                ></textarea>
              </div>

              {/* ========== SEÇÃO DE EMAIL E TELEFONE ========== */}
              <div className="checkbox-area">
                {/* Campo de email */}
                <label className="toggle-label">
                  <span>Mostrar e-mail no perfil?</span>
                  <input
                    type="text"
                    id="mostrarEmail"
                    name="mostrarEmail"
                    className="input-toggle"
                    value={dadosPerfilOrganizador.mostrarEmail}
                    onChange={atualizarEmailTelefone}
                    required
                  />
                </label>

                {/* Campo de telefone */}
                <label className="toggle-label">
                  <span>Mostrar telefone no perfil?</span>
                  <input
                    type="text"
                    id="mostrarTelefone"
                    name="mostrarTelefone"
                    className="input-toggle"
                    value={dadosPerfilOrganizador.mostrarTelefone}
                    onChange={atualizarEmailTelefone}
                    required
                  />
                </label>
              </div>

              {/* ========== BOTÃO DE SALVAR ========== */}
              <button type="submit" className="btn-salvar">
                <img src={iconsPE2.save} alt="Salvar" className="icon-save" />
                Salvar Alterações
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PerfilOrganizador;
