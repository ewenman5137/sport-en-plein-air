import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            // Si la réponse n'est pas du JSON (ex: erreur 500), on gère ça proprement
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text(); // debug utile
                console.error("Réponse non-JSON reçue :", text);
                throw new Error("Erreur serveur : réponse invalide.");
            }

            const data = await response.json();

            if (response.ok && data.token) {
                sessionStorage.setItem("authToken", data.token);
                navigate("/admin");
            } else {
                alert("Identifiants incorrects !");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            alert("Une erreur est survenue pendant la connexion.");
        }
    };

    return (
        <div id="login">
            <img id="image-login" src="/login.png" alt="" />
            <div id="containeur-login">
                <img src="/logo.png" alt="" />
                <h2>Portail administrateur</h2>
                <p>Si vous n'êtes pas administrateur alors vous êtes perdu</p>
                <a href="/">Cliquer ici pour revenir en lieu sûr</a>
                <div id="containeur-formulaire-login">
                    <input
                        type="text"
                        placeholder="ex : monmail@gmail.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="ex : mon mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button id="btn-connexion" onClick={handleLogin}>
                        Se connecter
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
