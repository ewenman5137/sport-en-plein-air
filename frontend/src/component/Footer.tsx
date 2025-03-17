import "../assets/footer.css"


  
function Footer() {    
    return (
        <>
        <div id="footer">
            <div id="politiqueMentions">
                <a href="">Politique de confidentialité</a>
                <a href="">Mentions légals</a>
            </div>
            <div className="barDeSeparation"></div>
            <div id="reseaux">
                <p>© Design & developpe by Johanne VIGOUROUX, Ewen BUHOT</p>
                <div className="containeurReseaux">
                    <a href="" className="reseau"><img  src="/reseaux/insta_white.png" alt="" /></a>
                    <a href="" className="reseau"><img  src="/reseaux/mail_white.png" alt="" /></a>
                    <a href="" className="reseau"><img  src="/reseaux/meta_white.png" alt="" /></a>
                </div>
            </div>
        </div>
        </>
    );
}

export default Footer;