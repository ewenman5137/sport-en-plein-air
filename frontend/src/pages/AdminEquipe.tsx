import { useEffect, useState } from "react";
import "../assets/adminMembre.css";
import Panel from "../component/Panel";
import { useNavigate } from "react-router-dom";

interface SocialLink {
    network_name: string;
    url: string;
}

interface Member {
    id: number;
    image_path: string;
    name: string;
    role: string;
    description: string;
    social_links: SocialLink[];
}

function AdminEquipe() {
    const [members, setMembers] = useState<Member[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Member>>({ social_links: [] });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (!token) navigate("/login");
    }, []);

    useEffect(() => {
        fetch("/api/membres")
            .then((res) => res.json())
            .then((data: Member[]) => setMembers(data))
            .catch(console.error);
    }, []);

    const openCreateModal = () => {
        setFormData({ social_links: [] });
        setImageFile(null);
        setIsEditing(false);
        setShowModal(true);
    };

    const openEditModal = (member: Member) => {
        setFormData({ ...member, social_links: [...(member.social_links || [])] });
        setImageFile(null);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        fetch(`/api/membres/${id}`, { method: "DELETE" })
            .then(() => setMembers(members.filter((m) => m.id !== id)))
            .catch(console.error);
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

    const handleSocialChange = (index: number, field: string, value: string) => {
        const updated = [...(formData.social_links || [])];
        updated[index] = { ...updated[index], [field]: value };
        setFormData(prev => ({ ...prev, social_links: updated }));
    };

    const addSocialLink = () => {
        setFormData(prev => ({
            ...prev,
            social_links: [...(prev.social_links || []), { network_name: "", url: "" }]
        }));
    };

    const removeSocialLink = (index: number) => {
        const updated = [...(formData.social_links || [])];
        updated.splice(index, 1);
        setFormData(prev => ({ ...prev, social_links: updated }));
    };

    const handleSubmit = async () => {
        const dataToSend = new FormData();
        for (const key in formData) {
            if (key !== "id" && key !== "social_links") {
                dataToSend.append(key, (formData as any)[key]);
            }
        }

        dataToSend.append("social_links", JSON.stringify(formData.social_links || []));

        if (imageFile) {
            dataToSend.append("image", imageFile);
        }

        const url = isEditing
            ? `/api/membres/${formData.id}`
            : "/api/membres";
        const method = isEditing ? "PUT" : "POST";

        try {
            await fetch(url, { method, body: dataToSend });
            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div id="page-membres">
                <Panel />
                <div id="containeur-membres-recherche">
                    <div className="admin-header">
                        <button className="add-member" onClick={openCreateModal}>
                            Ajouter un membre +
                        </button>
                    </div>
                    <div id="containeur-membres">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <div key={member.id} className="membre">
                                    <button className="delete-btn" onClick={() => handleDelete(member.id)}>🗑</button>
                                    <button className="edit-btn" onClick={() => openEditModal(member)}>✏️</button>
                                    <img src={`/api${member.image_path}`} alt={member.name} />
                                    <h1>{member.name}</h1>
                                    <p className="fonction">{member.role}</p>
                                    <p className="description">{member.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>Chargement des membres...</p>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{isEditing ? "Modifier" : "Ajouter"} un membre</h2>
                        <input type="text" name="name" placeholder="Nom" value={formData.name || ''} onChange={handleChange} />
                        <input type="text" name="role" placeholder="Rôle" value={formData.role || ''} onChange={handleChange} />
                        <textarea name="description" placeholder="Description" value={formData.description || ''} onChange={handleChange}></textarea>

                        <h3>Réseaux sociaux</h3>
                        {formData.social_links?.map((link, index) => (
                            <div key={index} className="social-link">
                                <input
                                    type="text"
                                    placeholder="Nom du réseau (ex: Instagram)"
                                    value={link.network_name}
                                    onChange={(e) => handleSocialChange(index, "network_name", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={link.url}
                                    onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                />
                                <button onClick={() => removeSocialLink(index)}>❌</button>
                            </div>
                        ))}
                        <button onClick={addSocialLink}>➕ Ajouter un réseau</button>

                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button onClick={handleSubmit}>{isEditing ? "Modifier" : "Ajouter"}</button>
                        <button onClick={() => setShowModal(false)}>Annuler</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminEquipe;
