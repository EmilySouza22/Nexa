import "./ProximoEvento.css";
import { iconsHomeConv } from "../../../utils/iconsHomeConv.js";

function ProximoEvento() {
  return (
    <div className='HomeConv-ContainerProximoEvento'>
        {/* Só vai ter esse container se o convidado possuir um ingresso para um evento */}
        <p className="HomeConv-TitleProximoEvento">Próximo evento acontecerá em:</p>
        <div className='HomeConv-ContainerTempo'>
            <img src={iconsHomeConv.horaIcon} className="HomeConv-iconHorario" alt="Relógio" />
            <p className="HomeConv-dadoHorarioEvento">2d 16h</p>
        </div>
    </div>
  )
}

export default ProximoEvento