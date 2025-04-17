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

    useEffect(() => {
        fetch("http://127.0.0.1:5000/partenaires")
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


    const navigate = useNavigate();
    
    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        }
    }, []);


    return (
        <>
            <div id="page-partenaires">
                <Panel />
                <div id="container-partenaires">
                    <button>Ajouter un partenaire +</button>
                    <div id="partenaires">
                        {partenaires.length > 0 ? (
                            partenaires.map((partenaire) => (
                                <div key={partenaire.id} className="partenaire">
                                    <button className="delete-btn">🗑</button>

                                    {/* ✅ Correction pour éviter src="" */}
                                    {partenaire.image_path ? (
                                        <img src={`http://127.0.0.1:5000${partenaire.image_path}`} alt={partenaire.name} />
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
        </>
    );
}

export default AdminPartenaire;
