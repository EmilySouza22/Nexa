import { useState, useEffect } from "react";
import { icones } from "../../../utils/iconEventoConvidado";
import "./CardEventoOgz.css";
import exemploEvento from "../../../assets/home-organizador/exemplo-evento.png";

function CardEventoOgz() {
  return (
    <div className="card-evento-detalhes-container-ogz">
      {" "}
      {/* OGZ */}
      <div className="info-card-evento-ogz">
        {" "}
        {/* OGZ */}
        <div className="info-evento-imagem-ogz">
          {" "}
          {/* OGZ */}
          <img src={exemploEvento} alt="imagem-evento" />
        </div>
        <div className="info-evento-content-ogz">
          {" "}
          {/* OGZ */}
          <h2 className="info-evento-titulo-ogz">Conecta Sul</h2> {/* OGZ */}
          <div className="info-header-evento-ogz">
            {" "}
            {/* OGZ */}
            <img
              src={icones.data}
              alt="data"
              className="info-icon-evento-ogz" /* OGZ */
            />
            <span className="info-label-evento-ogz">
              {" "}
              {/* OGZ */}
              23 de Outubro à 27 de Outubro
            </span>
          </div>
          <div className="info-header-evento-ogz">
            {" "}
            {/* OGZ */}
            <img
              src={icones.hora}
              alt="hora"
              className="info-icon-evento-ogz" /* OGZ */
            />
            <span className="info-label-evento-ogz">
              {" "}
              {/* OGZ */}
              Quinta, Sexta às 20h00, Sábado às 16h00, Domingo às 15h00
            </span>
          </div>
          <div className="info-header-evento-ogz">
            {" "}
            {/* OGZ */}
            <img
              src={icones.local_cinza}
              alt="local"
              className="info-icon-evento-ogz"
            />{" "}
            {/* OGZ */}
            <span className="info-label-evento-ogz">
              {" "}
              {/* OGZ */}
              Teatro Santander - Avenida Presidente Juscelino Kubitschek, 2041,
              São Paulo - SP
            </span>
          </div>
          <div className="evento-organizador">
            <button className="btn-ingresso-ogz">Comprar Ingresso</button>{" "}
            {/* OGZ */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEventoOgz;
