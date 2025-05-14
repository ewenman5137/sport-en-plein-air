import "../assets/footer.css"


  
function Footer() {    
    return (
        <>
        <div id="footer">
            <div id="politique-mentions">
                <a href="">Politique de confidentialité</a>
                <a href="">Mentions légales</a>
            </div>
            <div className="bar-de-separation"></div>
            <div id="reseaux">
                <p>Conception et développement : Johanne Vigouroux & Ewen Buhot</p>
                <div className="containeur-reseaux">
                    <a href="https://www.instagram.com/sport.plein.air.uqac/" className="reseau"><img  src="/reseaux/insta_white.png" alt="" /></a>
                    <a href="https://www.facebook.com/profile.php?id=61569110162993" className="reseau"><img id="facebook" src="/reseaux/facebook_white.svg" alt="" /></a>
                    <a href="mailto:sportpleinair.uqac@outlook.com" className="reseau"><img  src="/reseaux/mail_white.png" alt="" /></a>
                </div>
            </div>
        </div>
        </>
    );
}

export default Footer;