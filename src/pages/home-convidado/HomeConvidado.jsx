import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import '../home-convidado/HomeConvidado.css'
import MuralEvento from "./components/MuralEvento";
import React from "react";


function HomeConvidado() {
    //Dados mockados
    const userName = "Organizadora Emily";
    const userInitials = "EA";

    return (
        <div>
            <Navbar userName={userName} userInitials={userInitials}/>
            <Sidebar userType='convidado'/>
            <MuralEvento/>
        </div>
    );
}

export default HomeConvidado;