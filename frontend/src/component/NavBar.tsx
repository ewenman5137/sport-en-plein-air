import "../assets/navBar.css"


  
function NavBar() {    
    return (
        <>
        <div id="nav-bar">
            <div id="containeur-nav-bar">
                <a href="/"><img id="logo" src="/logo.png" alt="Logo" /></a>
                <div id="containeur-liens-nav-bar">
                    <a href="/notre-equipe">Notre équipe</a>
                    <a href="/#nosValeurs">Nos valeurs</a>
                    <a href="/#nosPartenaire">Nos partenaire</a>
                    <a href="/#nousContacter">Nous contacter</a>
                </div>
            </div>
        </div>
        </>
    );
}

export default NavBar;