import "../assets/home.css"
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

  
function Home() {    
    return (
        <>
        <div>
            <NavBar/>
            <div id="header">
                <div id="containeurImage">
                    <img src="/home.png" alt="" />
                </div>
                <div id="infoHeader">
                    <h1>UQAC en Plein Air</h1>
                    <p>Welcome to the National Hookah Community Association "NHCA". We are a diverse alliance of businesses from all ends of the Hookah experience, from manufacturers and importers of molasses, pipes and accessories to distributors, Hookah lounges and Hookah/shisha retail stores.</p>
                    <div id="containeurBtnImageHeader">
                        <a className="btn" href="#nosActivites">Nos activités</a>
                        <a href="">Notre instagram</a>
                        <img src="/montagne.png" alt="" />
                    </div>
                    <div className="barSeparation"></div>
                    <a href="#contact">Avez-vous des questions ?<br />Contactez-nous !</a>
                </div>
            </div>
            <div id="notreEquipe">
                <div id="containeurInfoNotreEquipe">
                    <p>Qui sommes nous ?</p>
                    <h1>Notre équipe</h1>
                    <p>Notre association a pour mission de faire découvrir le Saguenay, en mettant à l’honneur le Mont Valin, la Station Édouard et les nombreuses activités sportives à Chicoutimi. <br /><br />
                        Passionnés de plein air, nous voulons rendre l’aventure accessible à tous, à travers la randonnée, le ski, le camping et bien plus encore. Ici, chacun peut se dépasser, explorer et partager des moments uniques dans une nature grandiose.<br /><br />
                        Rejoins-nous pour vivre des expériences inoubliables et repousser tes limites ! 🌲🏕⛷🚴‍♂️
                    </p>
                    <a className="btn" href="">En savoir +</a>
                </div>
                <img src="/bureau.png" alt="" />
            </div>
            <div id="nosValeurs">
                <div id="headerNosValeurs">
                    <div>
                        <h1>Nos valeurs</h1>
                        <p>Notre association fonctionne sans but lucratif : chaque dollar récolté est entièrement réinvesti dans le projet pour offrir aux étudiants <br /> des expériences. Créée par des étudiants, pour des étudiants, elle a pour objectif de rendre l’aventure accessible à tous.</p>
                    </div>
                    <img src="/ski.png" alt="" />
                </div>
                <div id="containeurValeurs">
                    <div className="valeur">
                        <h1 className="chiffre">1</h1>
                        <div className="contexteValeur">
                            <h2>Découverte du Saguenay : <br /> Un Terrain d’Aventure Sans Limites</h2>
                            <p>Le Saguenay est bien plus qu’une région : c’est un terrain de jeu grandeur nature pour tous les passionnés d’aventure. Notre association s’engage à faire découvrir ses paysages spectaculaires, ses sentiers méconnus et ses sites naturels d’exception. <br />
                            Que ce soit à travers des randonnées, des sorties en raquettes ou des excursions en canot, nous voulons ouvrir les portes de la nature à tous ceux qui cherchent à s’évader et à repousser leurs limites. </p>
                        </div>
                    </div>
                    <div className="valeur">
                        <h1 className="chiffre">2</h1>
                        <div className="contexteValeur">
                            <h2>Des Sommets à Explorer</h2>
                            <p>Le Mont Valin et la Station Édouard sont des joyaux du Saguenay que nous avons à cœur de promouvoir. Véritables paradis pour les amateurs de glisse, ces lieux offrent des pistes de ski, des sentiers de raquettes et des panoramas à couper le souffle. <br /><br />
                            Notre mission est de faire connaître ces sites incontournables à travers des sorties, des événements et des activités qui rassemblent les amoureux de la montagne. Que tu sois un skieur aguerri ou un aventurier en quête de nouveaux défis, ces sommets n’attendent que toi pour révéler toute leur magie.</p>
                        </div>
                    </div>
                    <div className="valeur">
                        <h1 className="chiffre">3</h1>
                        <div className="contexteValeur">
                            <h2>Sport et Aventure à Chicoutimi </h2>
                            <p>Chicoutimi est un carrefour d’activités sportives et un point de départ idéal pour les amateurs de plein air. Au-delà des montagnes et des sentiers, notre association met en avant la diversité des sports et des aventures accessibles en ville et aux alentours. Vélo, escalade, kayak, trail... il y a mille et une façons de se dépasser tout en profitant de la nature. Nous voulons créer une communauté dynamique, où chacun trouve sa place et découvre de nouvelles passions.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="nosActivites">
                <h1>Nos activités</h1>
                <p>Notre association te propose une multitude d’activités en plein air pour découvrir le Saguenay autrement, repousser tes limites et partager des moments inoubliables avec une <br /> communauté passionnée. Que tu sois amateur de randonnée, de ski, de camping ou simplement curieux d’explorer, il y a toujours une nouvelle aventure qui t’attend !</p>
                <div id="containeurActivites">
                    <div className="activite">
                        <img src="/activite1.png" alt="" />
                        <h2 className="titreActivite">Ski au mont-valin</h2>
                        <p>Viens profiter d’une journée inoubliable sur les pistes du Mont Valin ! Entre descentes enneigées, panoramas à couper le souffle et ambiance conviviale, cette sortie est l’occasion parfaite de glisser, s’amuser et se dépasser.</p>
                        <div id="footerActivite">
                            <p className="dateActivite">May 20th 2020</p>
                            <a href="/activites/1">En savoir +</a>
                        </div>
                    </div>
                    <div className="activite">
                        <img src="/activite2.png" alt="" />
                        <h2 className="titreActivite">Escalade de glace</h2>
                        <p>Viens repousser tes limites et découvrir les sensations uniques de l’escalade de glace sur les parois gelées du Saguenay ! Encadré par des passionnés, tu apprendras à manier piolets et crampons pour grimper en toute sécurité.</p>
                        <div id="footerActivite">
                            <p className="dateActivite">May 20th 2020</p>
                            <a href="">En savoir +</a>
                        </div>
                    </div>
                    <div className="activite">
                        <img src="/activite3.png" alt="" />
                        <h2 className="titreActivite">Ski au mont-francis</h2>
                        <p>La montagne Mont-Francis, beau et gentil au premier abord, peut vous proposer des pistes à la fois ludiques et techniques, parfaites pour y passer une journée après une semaine de cours.</p>
                        <div id="footerActivite">
                            <p className="dateActivite">May 20th 2020</p>
                            <a href="">En savoir +</a>
                        </div>
                    </div>
                </div>
                <a href="/nos-activites">Voir toutes nos activités</a>
            </div>
            <div id="quiSommesNous">
                <div id="infoQuiSommesNous">
                    <p>Qui sommes-nous ?</p>
                    <h1>Tout comprendre sur l'asso</h1>
                    <p>Notre association, créée par des étudiants et pour des étudiants, a pour mission de faire découvrir le Saguenay, de promouvoir les activités en plein air et de rassembler une communauté autour de l’aventure et du dépassement de soi. À travers des sorties, des événements et des initiations sportives, nous mettons tout en œuvre pour rendre la nature et le sport accessibles à tous, sans but lucratif.<br /><br />
                        Mais plutôt que de longs discours, nous vous invitons à découvrir notre univers à travers cette vidéo 🎥. <br /><br />
                        Apprenez-en plus sur notre projet, nos valeurs et comment nous pouvons collaborer ensemble pour faire grandir cette belle aventure.<br /><br />
                        👉 Regardez la vidéo et rejoignez-nous dans cette aventure !
                    </p>
                </div>
                <img src="/video.png" alt="" />
            </div>
            <div id="transition">
                <h1>Pourquoi ne pas nous rejoindre ?</h1>
            </div>
            <div id="nosPartenaires">
                <h1>Ils nous font confiance</h1>
                <div id="containeurEntreprise">
                    <img src="/entreprise/decathlon.png" alt="" />
                    <img src="/entreprise/sportsExperts.png" alt="" />
                    <img src="/entreprise/uqac.png" alt="" />
                    <img src="/entreprise/decathlon.png" alt="" />
                    <img src="/entreprise/sportsExperts.png" alt="" />
                    <img src="/entreprise/uqac.png" alt="" />
                </div>
            </div>
            <div id="nousContacter">
                <div id="infoNousContacter">
                    <h1>Nous contacter</h1>
                    <p>N’hésite pas à nous contacter ! Que ce soit pour en savoir plus sur nos activités, proposer une collaboration ou rejoindre l’aventure, nous serons ravis de te répondre. Remplis le formulaire ci-dessous et nous reviendrons vers toi dès que possible.</p>
                    <p>Réseaux sociaux</p>
                    <div className="containeurReseaux">
                        <a href=""><img src="/reseaux/insta.png" alt="" /></a>
                        <a href=""><img src="/reseaux/mail.png" alt="" /></a>
                        <a href=""><img src="/reseaux/meta.png" alt="" /></a>
                    </div>
                </div>
                <div id="formNousContacter">
                    <div className="champ">
                        <p>Nom de l'entreprise</p>
                        <input type="text" placeholder="ex : google" />
                    </div>
                    <div className="champ">
                        <p>Email</p>
                        <input type="text" placeholder="ex : mail@google.com" />
                    </div>
                    <div className="champ">
                        <p>Objet</p>
                        <select name="" id="">
                            <option value="test">test2</option>
                        </select>
                    </div>
                    <div className="champ">
                        <p>Message</p>
                        <textarea name="" id="" placeholder="ex : Je vous contact pour ..."></textarea>
                    </div>
                    <button>envoyer</button>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    );
}

export default Home;