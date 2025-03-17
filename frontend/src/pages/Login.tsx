import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch("http://127.0.0.1:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                sessionStorage.setItem("authToken", data.token); 
                navigate("/admin"); 
            } else {
                alert("Identifiants incorrects !");
            }
        })
        .catch((error) => console.error("Erreur lors de la connexion :", error));
    };
    return (
        <div id="login">
            <img id="imageLogin" src="/login.png" alt="" />
            <div id="containeurLogin">
                <img src="/logo.png" alt="" />
                <h2>Portail administrateur</h2>
                <p>Si vous n'êtes pas administrateur alors vous êtes perdu</p>
                <a href="/">Cliquer ici pour revenir en lieu sûr</a>
                <div id="containeurFormulaireLogin">
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
                    <button id="btnConnexion" onClick={handleLogin}>Se connecter</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
