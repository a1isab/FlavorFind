import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useFavorites } from '../context/FavoritesContext';
import RecipeGrid from '../components/RecipeGrid';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Your Favorites
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <FavoriteBorderIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No favorites yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start exploring and save the recipes you love!
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/')}>
            Explore Recipes
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
          </Typography>
          <RecipeGrid meals={favorites} />
        </>
      )}
    </Container>
  );
}
