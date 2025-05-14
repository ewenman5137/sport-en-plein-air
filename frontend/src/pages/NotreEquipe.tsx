import { useEffect, useState } from "react";
import "../assets/notreEquipe.css";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

interface Member {
    id: number;
    image_path: string;
    name: string;
    role: string;
    description: string;
    social_links: { network_name: string; url: string }[];
}

function NotreEquipe() {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetch("/api/membres/")  // Assurez-vous que l'URL correspond à votre backend
            .then((response) => response.json())
            .then((data: Member[]) => setMembers(data))
            .catch((error) => console.error("Erreur lors de la récupération des membres:", error));
    }, []);

    return (
        <>
            <div id="page-notre-equipe">
                <NavBar />
                <div id="nos-membres">
                    <h1>Notre équipe</h1>
                    <p>Découvrez les passionnés qui font vivre l’association, organisent les activités et partagent avec vous <br /> leur amour du plein air. Ensemble, nous créons une aventure accessible à tous !</p>
                    <div id="containeur-equipe">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <div key={member.id} className="equipe">
                                    <img src={member.image_path} alt={member.name} />
                                    <p className="nom">{member.name}</p>
                                    <p className="fonction">{member.role}</p>
                                    <p className="description">{member.description}</p>
                                    <div className="containeur-reseaux">
                                        {member.social_links.map((link, index) => (
                                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                                <div className="reseau">{link.network_name}</div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Chargement des membres...</p>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default NotreEquipe;
