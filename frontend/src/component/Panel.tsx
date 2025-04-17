import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../assets/panel.css";



function Panel() {
    const location = useLocation(); // Récupère l'URL actuelle

    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("authToken"); // Supprime le token de session
        navigate("/"); // Redirige vers la page d'accueil
    };
    

    return (
        <>
            <div id="panel">
                <button id="bouton-back">⬅</button>
                <a href="/"><img src="/logo.png" alt="Logo" /></a>
                <div id="containeur-liens">
                    <a href="/admin" className={location.pathname === "/admin" ? "active" : ""}>
                        <img src="/panel/activites.png" alt="" /><p>Activités</p><img src="/panel/liens.svg" alt="" />
                    </a>
                    <a href="/admin-partenaire" className={location.pathname === "/admin-partenaire" ? "active" : ""}>
                        <img src="/panel/partenaire.png" alt="" /><p>Partenaire</p><img src="/panel/liens.svg" alt="" />
                    </a>
                    <a href="/admin-equipe" className={location.pathname === "/admin-equipe" ? "active" : ""}>
                        <img src="/panel/equipe.svg" alt="" /><p>Equipe</p><img src="/panel/liens.svg" alt="" />
                    </a>
                    <a href="/admin-image-accueil" className={location.pathname === "/admin-image-accueil" ? "active" : ""}>
                        <img src="/panel/equipe.svg" alt="" /><p>image accueil</p><img src="/panel/liens.svg" alt="" />
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
