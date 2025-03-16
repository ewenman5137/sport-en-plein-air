import "../assets/login.css"

  
function Login() {    
    return (
        <>
        <div>
            <img src="/login.png" alt="" />
            <div id="containeurLogin">
                <img src="/logo.png" alt="" />
                <h2>Portail administrateur</h2>
                <p>Si vous n'êtes pas administrateur alors vous êtes perdu</p>
                <a href="/">Cliquer ici pour revenir en lieu sûr</a>
                <input type="text" placeholder="ex : monmail@gmail.com" />
                <input type="text" placeholder="ex : mon mot de passe" />
                <button>Se connecter</button>
            </div>
        </div>
        </>
    );
}

export default Login;