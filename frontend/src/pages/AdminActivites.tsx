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
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Partial<Activity>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/activites")
            .then((response) => response.json())
            .then((data: Activity[]) => setActivities(data))
            .catch((error) => console.error("Erreur lors de la récupération des activités:", error));
    }, []);

    const handleDelete = (id: number) => {
        fetch(`http://127.0.0.1:5000/activites/${id}`, { method: "DELETE" })
            .then(() => setActivities(activities.filter(activity => activity.id !== id)))
            .catch(error => console.error("Erreur lors de la suppression de l'activité:", error));
    };

    const openCreateModal = () => {
        setFormData({});
        setImageFile(null);
        setIsEditing(false);
        setShowModal(true);
    };

    const openEditModal = (activity: Activity) => {
        setFormData(activity);
        setImageFile(null);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        const dataToSend = new FormData();

        for (const key in formData) {
            if (key !== "id") {
                dataToSend.append(key, (formData as any)[key]);
            }
        }

        let imageName = "";

        if (imageFile) {
            if (isEditing && formData.id) {
                imageName = `${formData.id}.png`;
            } else {
                const res = await fetch("http://127.0.0.1:5000/activites");
                const list = await res.json();
                const lastId = Math.max(...list.map((a: Activity) => a.id), 0);
                imageName = `${lastId + 1}.png`;
            }
            dataToSend.append("image", imageFile, imageName);
        }

        const url = isEditing
            ? `http://127.0.0.1:5000/activites/${formData.id}`
            : "http://127.0.0.1:5000/activites";

        const method = isEditing ? "PUT" : "POST";

        try {
            await fetch(url, {
                method,
                body: dataToSend,
            });
            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }
    };

    return (
        <>
            <div id="page-admin-activites">
                <Panel />
                <div id="containeur-admin-activites">
                    <div id="admin-header">
                        <input type="text" placeholder="Search" className="search-bar" />
                        <button className="add-activity" onClick={openCreateModal}>
                            Ajouter une activité +
                        </button>
                    </div>
                    <div id="containeur-activites">
                        {activities.map((activity) => (
                            <div key={activity.id} className="activite">
                                <button className="delete-btn" onClick={() => handleDelete(activity.id)}>🗑</button>
                                <button className="edit-btn" onClick={() => openEditModal(activity)}>✏️</button>
                                <img src={`http://127.0.0.1:5000${activity.image_path}`} alt={activity.title} />
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

            {/* ✅ Modal de création / édition */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{isEditing ? "Modifier" : "Créer"} une activité</h2>
                        <input type="text" name="title" placeholder="Titre" value={formData.title || ''} onChange={handleChange} />
                        <textarea name="description" placeholder="Description" value={formData.description || ''} onChange={handleChange} />
                        <input type="date" name="date" value={formData.date?.slice(0, 10) || ''} onChange={handleChange} />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button onClick={handleSubmit}>{isEditing ? "Mettre à jour" : "Créer"}</button>
                        <button onClick={() => setShowModal(false)}>Annuler</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminActivites;
