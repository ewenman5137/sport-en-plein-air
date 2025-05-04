import { useEffect, useState } from "react";
import Panel from "../component/Panel";
import "../assets/adminImageAccueil.css"; // crée ce fichier si besoin
import { useNavigate } from "react-router-dom";

interface ImageAccueil {
    id: number;
    image_path: string;
}

function AdminImageAccueil() {
    const [images, setImages] = useState<ImageAccueil[]>([]);
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        fetch("/api/image-accueil")
            .then((res) => res.json())
            .then((data: ImageAccueil[]) => setImages(data))
            .catch(console.error);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setSelectedImageId(id);
        }
    };

    const handleUpload = async () => {
        if (!file || selectedImageId === null) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            await fetch(`/api/image-accueil/${selectedImageId}`, {
                method: "PUT",
                body: formData,
            });

            // recharge les images
            const updated = await fetch("/api/image-accueil");
            const data = await updated.json();
            setImages(data);
            setFile(null);
            setSelectedImageId(null);
        } catch (err) {
            console.error("Erreur lors de l’upload", err);
        }
    };

    return (
        <div id="page-images-accueil">
            <Panel />
            <div id="container-images">
                <h2>Modifier les images d’accueil</h2>
                <div className="grid-images">
                    {images.map((img) => (
                        <div className="card-image" key={img.id}>
                            <img
                                src={`/api${img.image_path}`}
                                alt={`Image ${img.id}`}
                                className="preview-image"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, img.id)}
                            />
                            {selectedImageId === img.id && file && (
                                <button onClick={handleUpload}>Mettre à jour</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminImageAccueil;
