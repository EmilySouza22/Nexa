import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import '../home-convidado/HomeConvidado.css'
import SectionBuscarEvento from "./components/SectionBuscarEvento";
import SectionMuralEvento from "./components/SectionMuralEvento";
import SectionFooter from "./components/SectionFooter";
import React from "react";



function HomeConvidado() {
    //Dados mockados
    const userName = "Organizadora Emily";
    const userInitials = "EA";

    return (
        <div>
            <Navbar userName={userName} userInitials={userInitials}/>
            <Sidebar userType='convidado'/>
            <SectionMuralEvento/>
            <SectionBuscarEvento/>
            <SectionFooter/>
        </div>
        
    );
}

export default HomeConvidado;