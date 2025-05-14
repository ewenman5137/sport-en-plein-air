import "../assets/home.css"
import "../assets/card.css"
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { useEffect } from "react";
import { useState } from 'react';


interface Activity {
    id: number;
    image_path: string;
    title: string;
    description: string;
    plan?: string;
    date: string;
}

  
function Home() {  
    const [activities, setActivities] = useState<Activity[]>([]);    
    const [formData, setFormData] = useState({
        entreprise: '',
        email: '',
        objet: '',
        message: '',
      });


    useEffect(() => {
    fetch("/api/activites/")
        .then((res) => res.json())
        .then((data: Activity[]) => setActivities(data))
        .catch((error) => console.error("Erreur chargement activités :", error));
}, []);
    

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.2 });

        const elements = document.querySelectorAll(".animated");
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        try {
          const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (res.ok) {
            alert("Email envoyé avec succès !");
            setFormData({ entreprise: '', email: '', objet: '', message: '' });
          } else {
            alert("Erreur lors de l’envoi.");
          }
        } catch (error) {
          console.error(error);
          alert("Erreur réseau.");
        }
      };


    return (
        <>
        <div id="containeur-home">
            <NavBar/>
            <div id="header">
                    <div id="containeur-image">
                        <img id="image1" src={`/api/image-accueil/image/1.png`} alt="" />
                        <img id="image2" src={`/api/image-accueil/image/2.png`} alt="" />
                        <img id="image3" src={`/api/image-accueil/image/3.png`} alt="" />
                        <img id="image4" src={`/api/image-accueil/image/4.png`} alt="" />
                        <img id="image5" src={`/api/image-accueil/image/5.png`} alt="" />
                        <img id="image6" src={`/api/image-accueil/image/6.png`} alt="" />
                        <img id="image7" src={`/api/image-accueil/image/7.png`} alt="" />
                        <img id="image8" src={`/api/image-accueil/image/8.png`} alt="" />
                    </div>
                <div id="info-header">
                    <h1>UQAC en Plein Air</h1>
                    <p>Notre association a pour mission de faire découvrir le Saguenay, en mettant à l’honneur le Mont Valin, la Station Édouard et les nombreuses activités sportives à Chicoutimi.</p>
                    <div id="containeur-btn-image-header">
                        <a className="btn" href="#nos-activites">Nos activités</a>
                        <a id="btn-insta" target="_blank" href="https://www.instagram.com/sport.plein.air.uqac/">Notre Instagram</a>
                        <img src="/montagne.png" alt="" />
                    </div>
                    <div className="bar-separation"></div>
                    <a href="#nous-contacter">Avez-vous des questions ?<br />Contactez-nous !</a>
                </div>
            </div>
            <div id="notre-equipe" className="animated">
                <div id="containeur-info-notre-equipe">
                    <p>QUI SOMMES NOUS ?</p>
                    <h1>Notre équipe</h1>
                    <p>Notre association a pour mission de faire découvrir le Saguenay, en mettant à l’honneur le Mont Valin, la Station Édouard et les nombreuses activités sportives à Chicoutimi. <br /><br />
                        Passionnés de plein air, nous voulons rendre l’aventure accessible à tous, à travers la randonnée, le ski, le camping et bien plus encore. Ici, chacun peut se dépasser, explorer et partager des moments uniques dans une nature grandiose.<br /><br />
                        Rejoins-nous pour vivre des expériences inoubliables et repousser tes limites ! 🌲🏕⛷🚴‍♂️
                    </p>
                    <a className="btn" href="/notre-equipe">En savoir +</a>
                </div>
                <img src="/bureau.png" alt="" />
            </div>
            <div id="nos-valeurs" className="animated">
                <div id="header-nos-valeurs">
                    <div>
                        <h1>Nos valeurs</h1>
                        <p>Notre association fonctionne sans but lucratif : chaque dollar récolté est entièrement réinvesti dans le projet pour offrir aux étudiants <br /> des expériences. Créée par des étudiants, pour des étudiants, elle a pour objectif de rendre l’aventure accessible à tous.</p>
                    </div>
                </div>
                <div id="containeur-valeurs">
                    <div className="valeur">
                        <h1 className="chiffre">1</h1>
                        <div className="contexte-valeur">
                            <h2>Découverte du Saguenay : <br /> Un Terrain d’Aventure Sans Limites</h2>
                            <p>Le Saguenay est bien plus qu’une région : c’est un terrain de jeu grandeur nature pour tous les passionnés d’aventure. Notre association s’engage à faire découvrir ses paysages spectaculaires, ses sentiers méconnus et ses sites naturels d’exception. <br />
                            Que ce soit à travers des randonnées, des sorties en raquettes ou des excursions en canot, nous voulons ouvrir les portes de la nature à tous ceux qui cherchent à s’évader et à repousser leurs limites. </p>
                        </div>
                    </div>
                    <div className="valeur">
                        <h1 className="chiffre">2</h1>
                        <div className="contexte-valeur">
                            <h2>Des Sommets à Explorer</h2>
                            <p>Le Mont Valin et la Station Édouard sont des joyaux du Saguenay que nous avons à cœur de promouvoir. Véritables paradis pour les amateurs de glisse, ces lieux offrent des pistes de ski, des sentiers de raquettes et des panoramas à couper le souffle. <br /><br />
                            Notre mission est de faire connaître ces sites incontournables à travers des sorties, des événements et des activités qui rassemblent les amoureux de la montagne. Que tu sois un skieur aguerri ou un aventurier en quête de nouveaux défis, ces sommets n’attendent que toi pour révéler toute leur magie.</p>
                        </div>
                    </div>
                    <div className="valeur">
                        <h1 className="chiffre">3</h1>
                        <div className="contexte-valeur">
                            <h2>Sport et Aventure à Chicoutimi </h2>
                            <p>Chicoutimi est un carrefour d’activités sportives et un point de départ idéal pour les amateurs de plein air. Au-delà des montagnes et des sentiers, notre association met en avant la diversité des sports et des aventures accessibles en ville et aux alentours. Vélo, escalade, kayak, trail... il y a mille et une façons de se dépasser tout en profitant de la nature. Nous voulons créer une communauté dynamique, où chacun trouve sa place et découvre de nouvelles passions.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="nos-activites">
                <h1>Nos activités</h1>
                <p>Notre association te propose une multitude d’activités en plein air...</p>
                <div id="containeur-activites">
                    {activities.map((activity) => (
                        <div key={activity.id} className="activite">
                            <img src={`/api${activity.image_path}`} alt={activity.title} />
                            <h2 className="titre-activite">{activity.title}</h2>
                            <p>{activity.description}</p>
                            <div className="footer-activite">
                                <p className="date-activite">{new Date(activity.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="/nos-activites">Voir toutes nos activités</a>
            </div>
            <div id="qui-sommes-nous" className="animated">
                <div id="info-qui-sommes-nous">
                    <p>QUI SOMMES-NOUS ?</p>
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
            <div id="nos-partenaires" className="animated">
                <h1>Ils nous font confiance</h1>
                <div id="containeur-entreprise">
                    <img src="/entreprise/decathlon.png" alt="" />
                    <img src="/entreprise/sportsExperts.png" alt="" />
                    <img src="/entreprise/uqac.png" alt="" />
                    <img src="/entreprise/decathlon.png" alt="" />
                    <img src="/entreprise/sportsExperts.png" alt="" />
                    <img src="/entreprise/uqac.png" alt="" />
                </div>
            </div>
            <div id="nous-contacter" className="animated">
                <div id="info-nous-contacter">
                    <h1>Nous contacter</h1>
                    <p>N’hésite pas à nous contacter ! Que ce soit pour en savoir plus sur nos activités, proposer une collaboration ou rejoindre l’aventure, nous serons ravis de te répondre. Remplis le formulaire ci-dessous et nous reviendrons vers toi dès que possible.</p>
                    <p id="titre-containeur-reseaux-home">Réseaux sociaux</p>
                    <div className="containeur-reseaux-home">
                        <a href="https://www.instagram.com/sport.plein.air.uqac/" target="_blank"><img src="/reseaux/insta_black.png" alt="" /></a>
                        <a href="https://www.facebook.com/profile.php?id=61569110162993" target="_blank"><img id="facebook_black" src="/reseaux/facebook.svg" alt="" /></a>
                        <a href="mailto:sportpleinair.uqac@outlook.com" target="_blank"><img src="/reseaux/mail_black.png" alt="" /></a>
                    </div>
                </div>
                <form id="form-nous-contacter" onSubmit={handleSubmit}>
                    <div className="champ">
                        <p>Nom de l'entreprise</p>
                        <input
                        type="text"
                        name="entreprise"
                        placeholder="ex : google"
                        value={formData.entreprise}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="champ">
                        <p>Email</p>
                        <input
                        type="text"
                        name="email"
                        placeholder="ex : mail@google.com"
                        value={formData.email}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="champ">
                        <p>Objet</p>
                        <select name="objet" value={formData.objet} onChange={handleChange}>
                        <option value="">Veuillez sélectionner un objet.</option>
                        <option value="Demande de partenariat">Demande de partenariat pour des activités de plein air</option>
                        <option value="Candidature spontanée">Candidature spontanée pour un poste dans les sports de plein air</option>
                        <option value="Collaboration événement">Proposition de collaboration pour des événements outdoor</option>
                        <option value="Demande d’informations">Demande d’informations sur vos services et équipements sportifs</option>
                        <option value="Promotion produit">Proposition de test et de promotion de vos produits outdoor</option>
                        </select>
                    </div>
                    <div className="champ">
                        <p>Message</p>
                        <textarea
                        name="message"
                        placeholder="Entrez votre message ici..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <button type="submit">Envoyer</button>
                    </form>
                </div>
            </div>
            <Footer/>
        
        </>
    );
}

export default Home;