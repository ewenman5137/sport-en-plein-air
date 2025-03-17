import { useLocation } from "react-router-dom";
import "../assets/panel.css";
import { useNavigate } from "react-router-dom";



function Panel() {
    const location = useLocation(); // Récupère l'URL actuelle

    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("authToken"); // Supprime le token de session
        navigate("/"); // Redirige vers la page d'accueil
    };
    

    return (
        <>
            <div id="Panel">
                <button id="boutonBack">⬅</button>
                <img src="/logo.png" alt="Logo" />
                <div id="containeurLiens">
                    <a href="/admin" className={location.pathname === "/admin" ? "active" : ""}>
                        <img src="/panel/activites.png" alt="" /><p>Activités</p><img src="/panel/liens.png" alt="" />
                    </a>
                    <a href="/admin-partenaire" className={location.pathname === "/admin-partenaire" ? "active" : ""}>
                        <img src="/panel/partenaire.png" alt="" /><p>Partenaire</p><img src="/panel/liens.png" alt="" />
                    </a>
                    <a href="/admin-equipe" className={location.pathname === "/admin-equipe" ? "active" : ""}>
                        <img src="/panel/equipe.svg" alt="" /><p>Equipe</p><img src="/panel/liens.png" alt="" />
                    </a>
                </div>
                <button onClick={handleLogout} id="deconnexion">
                    <img src="/panel/deconnexion.png" alt="" />
                    <p>Déconnexion</p>
                </button>
            </div>
        </>
    );
}

export default Panel;
