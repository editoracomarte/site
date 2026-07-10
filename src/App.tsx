import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { BookDetails } from './pages/BookDetails';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Catalog } from './pages/Catalog';
import { Authors } from './pages/Authors';
import { AboutUs } from './pages/AboutUs';
import { AuthorDetails } from './pages/AuthorDetails';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/autores" element={<Authors />} />
        <Route path="/autores/:slug" element={<AuthorDetails />} />
        <Route path="/catalogo/:slug" element={<BookDetails />} />
        <Route path="/quem-somos" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
