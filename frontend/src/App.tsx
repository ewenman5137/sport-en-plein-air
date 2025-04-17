import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import NotreEquipe from './pages/NotreEquipe';
import Activites from './pages/Activites';
import Article from './pages/Article';
import AdminActivites from './pages/AdminActivites';
import AdminEquipe from './pages/AdminEquipe';
import AdminPartenaire from './pages/AdminPartenaire';
import AdminImageAccueil from './pages/AdminImageAccueil';
import Login from './pages/Login';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/notre-equipe" element={<NotreEquipe/>} />
        <Route path="/nos-activites" element={<Activites/>} />
        <Route path="/activites/:id" element={<Article/>} />
        <Route path="/admin" element={<AdminActivites/>} />
        <Route path="/admin-equipe" element={<AdminEquipe/>} />
        <Route path="/admin-partenaire" element={<AdminPartenaire/>} />
        <Route path="/admin-image-accueil" element={<AdminImageAccueil/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App