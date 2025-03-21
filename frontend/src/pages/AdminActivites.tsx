import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/adminActivites.css";
import Panel from "../component/Panel";

interface Activity {
    id: number;
    image_path: string;
    title: string;
    description: string;
    date: string;
}

function AdminActivites() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/activites")
            .then((response) => response.json())
            .then((data: Activity[]) => setActivities(data))
            .catch((error) => console.error("Erreur lors de la récupération des activités:", error));
    }, []);

    const handleDelete = (id: number) => {
        fetch(`http://localhost:5000/${id}`, { method: "DELETE" })
            .then(() => setActivities(activities.filter(activity => activity.id !== id)))
            .catch(error => console.error("Erreur lors de la suppression de l'activité:", error));
    };
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        }
    }, []);
    return (
        <>
            <div id="page-admin-activites">
                <Panel />
                <div id="containeur-admin-activites">
                    <div id="admin-header">
                        <input type="text" placeholder="Search" className="search-bar" />
                        <button className="add-activity">Ajouter une activité +</button>
                    </div>
                    <div id="containeur-activites">
                        {activities.map((activity) => (
                            <div key={activity.id} className="activite">
                                <button className="delete-btn" onClick={() => handleDelete(activity.id)}>🗑</button>
                                <img src={activity.image_path} alt={activity.title} />
                                <h1>{activity.title}</h1>
                                <p>{activity.description}</p>
                                <div className="containeur-date">
                                    <p>{new Date(activity.date).toLocaleDateString()}</p>
                                    <a href={`/activite/${activity.id}`}>En savoir +</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminActivites;