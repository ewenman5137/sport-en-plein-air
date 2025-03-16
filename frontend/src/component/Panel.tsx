import { useLocation } from "react-router-dom";
import "../assets/panel.css";

function Panel() {
    const location = useLocation(); // Récupère l'URL actuelle

    return (
        <>
            <div id="Panel">
                <button id="boutonBack">⬅</button>
                <img src="/logo.png" alt="Logo" />
                <div id="containeurLiens">
                    <a href="/admin-activites" className={location.pathname === "/admin-activites" ? "active" : ""}>
                        <img src="" alt="" /><p>Activités</p><img src="" alt="" />
                    </a>
                    <a href="/admin-partenaire" className={location.pathname === "/admin-partenaire" ? "active" : ""}>
                        <img src="" alt="" /><p>Partenaire</p><img src="" alt="" />
                    </a>
                    <a href="/admin-equipe" className={location.pathname === "/admin-equipe" ? "active" : ""}>
                        <img src="" alt="" /><p>Equipe</p><img src="" alt="" />
                    </a>
                </div>
                <button id="deconnexion">
                    <img src="" alt="" />
                    <p>Déconnexion</p>
                </button>
            </div>
        </>
    );
}

export default Panel;
