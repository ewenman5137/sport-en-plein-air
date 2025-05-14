import "../assets/navBar.css"


  
function NavBar() {    
    return (
        <>
        <div id="nav-bar">
            <div id="containeur-nav-bar">
                <a href="/"><img id="logo" src="/logo.png" alt="Logo" /></a>
                <div id="containeur-liens-nav-bar">
                    <a href="/notre-equipe">Notre équipe</a>
                    <a href="/#nos-valeurs">Nos valeurs</a>
                    <a href="/#nos-partenaires">Nos partenaires</a>
                    <a href="/#nous-contacter">Nous contacter</a>
                </div>
            </div>
        </div>
        </>
    );
}

export default NavBar;