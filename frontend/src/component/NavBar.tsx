import "../assets/navBar.css"


  
function NavBar() {    
    return (
        <>
        <div id="navBar">
            <div id="containeurNavBar">
                <a href="/"><img src="/logo.png" alt="Logo" /></a>
                <div id="containeurLiensNavBar">
                    <a href="#notreEquipe">Notre équipe</a>
                    <a href="#nosValeurs">Nos valeurs</a>
                    <a href="#nosPartenaire">Nos partenaire</a>
                    <a href="#nousContacter">Nous contacter</a>
                </div>
            </div>
        </div>
        </>
    );
}

export default NavBar;