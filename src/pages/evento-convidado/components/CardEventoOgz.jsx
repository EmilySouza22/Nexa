import { useState, useEffect } from "react";
import { icones } from "../../../utils/iconEventoConvidado";
import "./CardEventoOgz.css"; // 👈 CORRIJA AQUI
import exemploEvento from "../../../assets/home-organizador/exemplo-evento.png";

function CardEventoOgz() {
    
  return (
    <div className="card-evento-detalhes-container">
      <div className="info-card-evento">
        <div className="info-evento-imagem">
          <img src={exemploEvento} alt="imagem-evento" />
        </div>

        <div className="info-evento-content">
          <h2 className="info-evento-titulo">Conecta Sul</h2>

        

          <div className="info-header-evento">
            <img
              src={icones.data}
              alt="data"
              className="info-icon-evento"
            />
            <span className="info-label-evento">
              23 de Outubro à 27 de Outubro
            </span>
          </div>

          <div className="info-header-evento">
            <img
              src={icones.hora}
              alt="hora"
              className="info-icon-evento"
            />
            <span className="info-label-evento">
              Quinta, Sexta às 20h00, Sábado às 16h00, Domingo às 15h00
            </span>
          </div>

          <div className="info-header-evento">
            <img src={icones.local_cinza} alt="local" className="info-icon-evento" />
            <span className="info-label-evento">
              Teatro Santander - Avenida Presidente Juscelino Kubitschek, 2041,
              São Paulo - SP
            </span>
          </div>

          <div className="evento-organizador">
          <button className="btn-ingresso">Comprar Ingresso</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CardEventoOgz;