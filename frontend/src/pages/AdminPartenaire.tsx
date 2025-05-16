import { useEffect, useState } from "react";
import "../assets/adminPartenaire.css";
import Panel from "../component/Panel";
import { useNavigate } from "react-router-dom";

interface Partenaire {
    id: number;
    image_path: string;
    name: string;
    liens: string;
}

function AdminPartenaire() {
    const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", liens: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        fetch("/api/partenaires/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des partenaires");
                }
                return response.json();
            })
            .then((data: Partenaire[]) => {
                setPartenaires(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !imageFile) {
            alert("Nom et image sont requis");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("liens", formData.liens);
        data.append("image", imageFile);

        try {
            const response = await fetch("/api/partenaires/", {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du partenaire");
            }

            // Rechargement de la liste
            const newPartenaire = await response.json();
            setPartenaires([...partenaires, newPartenaire]);
            setShowModal(false);
            setFormData({ name: "", liens: "" });
            setImageFile(null);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout");
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Supprimer ce partenaire ?")) return;

        try {
            const response = await fetch(`/api/partenaires/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erreur lors de la suppression");

            setPartenaires((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error(error);
            alert("Suppression échouée");
        }
    };


    return (
        <>
            <div id="page-partenaires">
                <Panel />
                <div id="container-partenaires">
                    <button onClick={() => setShowModal(true)} className="add-btn">
                        Ajouter un partenaire +
                    </button>
                    <div id="partenaires">
                        {partenaires.length > 0 ? (
                            partenaires.map((partenaire) => (
                                <div key={partenaire.id} className="partenaire">
                                    <button className="delete-btn" onClick={() => handleDelete(partenaire.id)}>🗑</button>
                                    {partenaire.image_path ? (
                                        <img src={`/api${partenaire.image_path}`} alt={partenaire.name} />
                                    ) : (
                                        <img src="default-image.png" alt="Image par défaut" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Chargement des partenaires...</p>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h2>Ajouter un partenaire</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Nom :</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

                            <label>Lien :</label>
                            <input type="text" name="liens" value={formData.liens} onChange={handleInputChange} />

                            <label>Image :</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} required />

                            <button type="submit">Enregistrer</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminPartenaire;
