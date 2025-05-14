import "../assets/navBar.css";
import { useState } from "react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div id="nav-bar">
      <div id="containeur-nav-bar">
        <a href="/">
          <img id="logo" src="/logo.png" alt="Logo" />
        </a>

        <button id="burger" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        <div id="containeur-liens-nav-bar" className={menuOpen ? "open" : ""}>
          <a href="/notre-equipe" onClick={() => setMenuOpen(false)}>Notre équipe</a>
          <a href="/#nos-valeurs" onClick={() => setMenuOpen(false)}>Nos valeurs</a>
          <a href="/#nos-partenaires" onClick={() => setMenuOpen(false)}>Nos partenaires</a>
          <a href="/#nous-contacter" onClick={() => setMenuOpen(false)}>Nous contacter</a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
