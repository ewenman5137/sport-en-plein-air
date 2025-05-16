import { useState, useEffect, JSX } from "react";
import Panel from "../component/Panel";
import "../assets/AdminTextAccueil.css";

function AdminTextAccueil() {
  const [jsonData, setJsonData] = useState<any>({});
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");

  // 🔄 Charger le JSON depuis le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/text_accueil/");
        if (!response.ok) throw new Error("Erreur lors du chargement du JSON");
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (label: string, path: string, value: string) => {
    setSelectedLabel(label);
    setSelectedPath(path);
    setSelectedValue(value);
  };

  const updateValue = () => {
    if (!selectedPath) return;
    const keys = selectedPath.split(".");
    const updated = { ...jsonData };
    let current = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = selectedValue;
    setJsonData(updated);
    alert("Valeur mise à jour localement. Cliquez sur 'Sauvegarder' pour enregistrer le fichier.");
  };

  const saveToServer = async () => {
    try {
      const response = await fetch("/api/text_accueil/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement côté serveur.");
      }

      alert("Fichier text.json mis à jour avec succès !");
    } catch (error) {
      console.error(error);
      alert("Échec de la sauvegarde sur le serveur.");
    }
  };

  const renderJson = (obj: any, path = ""): JSX.Element[] => {
    return Object.entries(obj).map(([key, value]) => {
      const fullPath = path ? `${path}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        return (
          <div key={fullPath} className="json-section">
            <strong>{key}</strong>
            <div className="json-children">{renderJson(value, fullPath)}</div>
          </div>
        );
      } else {
        return (
          <div key={fullPath} className="json-entry">
            <span onClick={() => handleSelect(key, fullPath, String(value))}>
              {key}: {String(value)}
            </span>
          </div>
        );
      }
    });
  };

  return (
    <div id="page-admin-text-json">
      <Panel />
      <div id="editor-container">
        <div className="json-display">{renderJson(jsonData)}</div>
        <div className="editor-panel">
          {selectedPath && (
            <>
              <h3>Éditer : {selectedLabel}</h3>
              <textarea
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
              />
              <button onClick={updateValue}>Mettre à jour</button>
            </>
          )}
          <button onClick={saveToServer}>💾 Sauvegarder</button>
        </div>
      </div>
    </div>
  );
}

export default AdminTextAccueil;
