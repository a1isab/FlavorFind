import { Routes, Route, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LanguageRouter from './components/LanguageRouter';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';

export default function App() {
  return (
    <Routes>
      <Route path="/:lang" element={<LanguageRouter><PageShell /></LanguageRouter>}>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="recipe/:id" element={<RecipeDetail />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
      <Route path="*" element={<LanguageRouter><PageShell /></LanguageRouter>} />
    </Routes>
  );
}

function PageShell() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
