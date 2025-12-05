import { useState, useEffect } from "react";
import "./EventoConvidado.css"; 
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import CardEventoOgz from "./components/CardEventoOgz"; 

function EventoConvidado(){
  
  // Depois esses dados vão vir do backend 
  const userName = "Organizadora Emily";
  const userInitials = "EA";

  return (
    <div className="home-organizador">
      <Navbar userName={userName} userInitials={userInitials} />
      <div className="home-organizador-layout">
        <Sidebar userType="organizador" />
        <main>
          <CardEventoOgz/>
          
        </main>
      </div>
    </div>
  );
}

export default EventoConvidado;