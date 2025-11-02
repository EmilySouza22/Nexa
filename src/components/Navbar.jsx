import "./Navbar.css";
import logo from "../assets/nexa-logo2.svg";

function Navbar({ userName, userInitials }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      {userName &&
        userInitials && ( // Só mostra o perfil SE userName E userInitials existirem
          <div className="navbar-profile">
            <span>{userName}</span>
            {/* Vai exibir o nome que foi passado lá do backend */}
            <div className="profile-avatar">
              <span>{userInitials}</span>
            </div>
            {/* Vai exibir as iniciais  */}
          </div>
        )}
    </nav>
  );
}

export default Navbar;
