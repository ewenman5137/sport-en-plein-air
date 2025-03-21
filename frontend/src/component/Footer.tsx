import "../assets/footer.css"


  
function Footer() {    
    return (
        <>
        <div id="footer">
            <div id="politique-mentions">
                <a href="">Politique de confidentialité</a>
                <a href="">Mention légals</a>
            </div>
            <div className="bar-de-separation"></div>
            <div id="reseaux">
                <p>© Design & developpe by Johanne VIGOUROUX, Ewen BUHOT</p>
                <div className="containeur-reseaux">
                    <a href="" className="reseau"><img  src="/reseaux/insta_white.png" alt="" /></a>
                    <a href="" className="reseau"><img id="facebook" src="/reseaux/facebook_white.svg" alt="" /></a>
                    <a href="" className="reseau"><img  src="/reseaux/mail_white.png" alt="" /></a>
                </div>
            </div>
        </div>
        </>
    );
}

export default Footer;