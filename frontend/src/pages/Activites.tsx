import { useEffect, useState } from "react";
import "../assets/activites.css";
import "../assets/card.css"
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

interface Activity {
    id: number;
    image_path: string;
    title: string;
    description: string;
    plan: string;
    date: string;
}

function Activites() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/activites")  // Assurez-vous que l'URL correspond à votre backend
            .then((response) => response.json())
            .then((data: Activity[]) => setActivities(data))
    }, []);

    return (
        <>
            <div>
                <NavBar />
                <div id="nosActivites">
                    <h1>Nos Activités</h1>
                    <p>Plonge dans l’aventure avec nous et découvre toutes les expériences que nous proposons : randonnées, ski, camping et bien plus encore. Peu importe ton niveau, l’important est de profiter et de partager des moments inoubliables en pleine nature !</p>
                    <div id="containeurActivites">
                        {activities.length > 0 ? (
                            activities.map((activity) => (
                                <div key={activity.id} className="activite">
                                    <img src={activity.image_path} alt={activity.title} />
                                    <h2 className="titreActivite">{activity.title}</h2>
                                    <p>{activity.description}</p>
                                    <div className="footerActivite"><p className="dateActivite"><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p><a href={`/activites/${activity.id}`}>En savoir +</a></div>
                                </div>
                            ))
                        ) : (
                            <p>Chargement des activités...</p>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Activites;
