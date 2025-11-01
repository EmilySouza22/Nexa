import React from "react";
import Navbar from "../../components/Navbar";

function HomeOrganizador() {
  // Depois esses dados vão vir do backend, aqui deixei mockado
  const userName = "Organizadora Emily";
  const userInitials = "EA";

  return (
    <div>
      <Navbar userName={userName} userInitials={userInitials} />
    </div>
  );
}

export default HomeOrganizador;
