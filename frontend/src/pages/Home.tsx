// Home.tsx
import "../assets/home.css"
import "../assets/card.css"
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { useEffect, useState } from 'react';

interface Activity {
    id: number;
    image_path: string;
    title: string;
    description: string;
    plan?: string;
    date: string;
}
interface Partenaire {
    id: number;
    image_path: string;
    name: string;
    link?: string;
}

function Home() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
    const [textAccueil, setTextAccueil] = useState<any>(null);
    const [formData, setFormData] = useState({ entreprise: '', email: '', objet: '', message: '' });

    useEffect(() => {
        fetch("/api/text_accueil/")
            .then((res) => res.json())
            .then((data) => setTextAccueil(data))
            .catch((error) => console.error("Erreur chargement texte accueil :", error));
    }, []);

    useEffect(() => {
        fetch("/api/activites/")
            .then((res) => res.json())
            .then((data: Activity[]) => setActivities(data))
            .catch((error) => console.error("Erreur chargement activités :", error));
    }, []);

    useEffect(() => {
        fetch("/api/partenaires/")
            .then((res) => res.json())
            .then((data: Partenaire[]) => setPartenaires(data))
            .catch((error) => console.error(error));
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Email envoyé avec succès !");
                setFormData({ entreprise: '', email: '', objet: '', message: '' });
            } else alert("Erreur lors de l’envoi.");
        } catch (error) {
            console.error(error);
            alert("Erreur réseau.");
        }
    };

    return (
        <div id="containeur-home">
            <NavBar />
            <div id="header">
                <div id="containeur-image">
                    {[...Array(8)].map((_, i) => (
                        <img key={i} id={`image${i + 1}`} src={`/api/image-accueil/image/${i + 1}.png`} alt="" />
                    ))}
                </div>
                <div id="info-header">
                    <h1>{textAccueil?.header_title}</h1>
                    <p>{textAccueil?.header_description}</p>
                    <div id="containeur-btn-image-header">
                        <a className="btn" href="#nos-activites">{textAccueil?.button_activities}</a>
                        <a id="btn-insta" target="_blank" href="https://www.instagram.com/sport.plein.air.uqac/">{textAccueil?.button_instagram}</a>
                        <img src="/montagne.png" alt="" />
                    </div>
                    <div className="bar-separation"></div>
                    <a href="#nous-contacter">{textAccueil?.button_contact}</a>
                </div>
            </div>

            <div id="notre-equipe" className="animated">
                <div id="containeur-info-notre-equipe">
                    <p>{textAccueil?.equipe_section_title}</p>
                    <h1>{textAccueil?.equipe_title}</h1>
                    <p>{textAccueil?.equipe_description}</p>
                    <a className="btn" href="/notre-equipe">{textAccueil?.equipe_button}</a>
                </div>
                <img src="/bureau.png" alt="" />
            </div>

            <div id="nos-valeurs" className="animated">
                <div id="header-nos-valeurs">
                    <h1>{textAccueil?.valeurs_title}</h1>
                    <p>{textAccueil?.valeurs_description}</p>
                </div>
                <div id="containeur-valeurs">
                    {[1, 2, 3].map((num) => (
                        <div className="valeur" key={num}>
                            <h1 className="chiffre">{num}</h1>
                            <div className="contexte-valeur">
                                <h2>{textAccueil?.[`valeur${num}_title`]}</h2>
                                <p>{textAccueil?.[`valeur${num}_text`]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="nos-activites">
                <h1>{textAccueil?.activites_title}</h1>
                <p>{textAccueil?.activites_description}</p>
                <div id="containeur-activites">
                    {activities.map((a) => (
                        <div key={a.id} className="activite">
                            <img src={`/api${a.image_path}`} alt={a.title} />
                            <h2 className="titre-activite">{a.title}</h2>
                            <p>{a.description}</p>
                            <div className="footer-activite">
                                <p className="date-activite">{new Date(a.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="/nos-activites">{textAccueil?.activites_button}</a>
            </div>

            <div id="qui-sommes-nous" className="animated">
                <div id="info-qui-sommes-nous">
                    <p>{textAccueil?.qui_section_title}</p>
                    <h1>{textAccueil?.qui_title}</h1>
                    <p>{textAccueil?.qui_description}</p>
                </div>
                <img src="/video.png" alt="" />
            </div>

            <div id="transition">
                <h1>{textAccueil?.transition_title}</h1>
            </div>

            <div id="nos-partenaires" className="animated">
                <h1>{textAccueil?.partenaires_title}</h1>
                <div id="containeur-entreprise">
                    {partenaires.map((p) => (
                        <a key={p.id} href={p.link || "#"} target="_blank" rel="noopener noreferrer">
                            <img src={`/api${p.image_path}`} alt={p.name} />
                        </a>
                    ))}
                </div>
            </div>

            <div id="nous-contacter" className="animated">
                <div id="info-nous-contacter">
                    <h1>{textAccueil?.contact_title}</h1>
                    <p>{textAccueil?.contact_description}</p>
                    <p id="titre-containeur-reseaux-home">{textAccueil?.contact_reseaux}</p>
                    <div className="containeur-reseaux-home">
                        <a href="https://www.instagram.com/sport.plein.air.uqac/" target="_blank"><img src="/reseaux/insta_black.png" alt="" /></a>
                        <a href="https://www.facebook.com/profile.php?id=61569110162993" target="_blank"><img id="facebook_black" src="/reseaux/facebook.svg" alt="" /></a>
                        <a href="mailto:sportpleinair.uqac@outlook.com" target="_blank"><img src="/reseaux/mail_black.png" alt="" /></a>
                    </div>
                </div>
                <form id="form-nous-contacter" onSubmit={handleSubmit}>
                    <div className="champ">
                        <p>{textAccueil?.contact_form_entreprise}</p>
                        <input type="text" name="entreprise" value={formData.entreprise} onChange={handleChange} />
                    </div>
                    <div className="champ">
                        <p>{textAccueil?.contact_form_email}</p>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="champ">
                        <p>{textAccueil?.contact_form_objet}</p>
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
                        <p>{textAccueil?.contact_form_message}</p>
                        <textarea name="message" value={formData.message} onChange={handleChange} required />
                    </div>
                    <button id="button-footer" type="submit">{textAccueil?.contact_form_submit}</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
