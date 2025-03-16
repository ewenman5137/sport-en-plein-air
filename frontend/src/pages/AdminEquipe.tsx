import { useEffect, useState } from "react";
import "../assets/adminMembre.css";
import Panel from "../component/Panel";

interface Member {
    id: number;
    image_path: string;
    name: string;
    role: string;
    description: string;
}

function AdminEquipe() {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/membres")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des membres");
                }
                return response.json();
            })
            .then((data: Member[]) => {
                setMembers(data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <div id="pageMembres">
                <Panel />
                <div id="containeurMembresRecherche">
                    <div className="admin-header">
                        <button className="add-member">Ajouter un membre +</button>
                    </div>
                    <div id="containeurMembres">
                        {members.length > 0 ? (
                            members.map((member, index) => (
                                <div key={member.id ?? index} className="membre">
                                    <button className="delete-btn">🗑</button>

                                    {/* Correction de l'erreur du src vide */}
                                    {member.image_path && member.image_path.trim() !== "" ? (
                                        <img src={member.image_path} alt={member.name} />
                                    ) : (
                                        <img src="default-image.png" alt="Image par défaut" />
                                    )}

                                    <h1>{member.name}</h1>
                                    <p className="fonction">{member.role}</p>
                                    <p className="description">{member.description}</p>
                                    <button className="edit-btn">✏️</button>
                                </div>
                            ))
                        ) : (
                            <p>Chargement des membres...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminEquipe;
