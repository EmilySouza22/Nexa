import "./BotoesUm.css";
import { iconsHO } from "../../../utils/icons";

function BotoesUm() {
  return (
    <div className="botoes-evento-container">
      <button className="botao-evento">
        <img src={iconsHO.loja} alt="Sacola" className="botao-evento-icon" />
        <span className="botao-evento-texto">Ver página na Loja</span>
      </button>

      <button className="botao-evento">
        <img src={iconsHO.add} alt="Mais" className="botao-evento-icon" />
        <span className="botao-evento-texto">Detalhes do evento</span>
      </button>
    </div>
  );
}

export default BotoesUm;
