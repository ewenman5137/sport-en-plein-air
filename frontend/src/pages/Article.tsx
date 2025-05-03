import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/article.css";
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

function Article() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity | null>(null);

    useEffect(() => {
        fetch(`/api/activites/${id}`)
            .then((response) => response.json())
            .then((data: Activity) => setActivity(data))
            .catch((error) => console.error("Erreur lors de la récupération de l'activité:", error));
    }, [id]);

    return (
        <>
            <div id="page-article">
                <NavBar />
                <div id="article">
                    <button onClick={() => navigate(-1)}>Retour</button>
                    {activity ? (
                        <>
                            <h1 id="nom-activite">{activity.title}</h1>
                            <img src={activity.image_path} alt={activity.title} />
                            <p id="description">{activity.description}</p>
                            <div id="plan"><strong>Plan:</strong> {activity.plan}</div>
                            <p id="date"><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                        </>
                    ) : (
                        <p>Chargement de l'activité...</p>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Article;
