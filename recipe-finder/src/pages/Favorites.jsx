import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Box, Button } from '@mui/material';
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useFavorites } from '../context/FavoritesContext';
import RecipeGrid from '../components/RecipeGrid';

export default function Favorites() {
  const navigate = useNavigate();
  const { lang } = useParams();
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const lng = lang || 'en';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        {t('favorites.title')}
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <FavoriteBorderIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {t('favorites.empty')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t('favorites.emptyHint')}
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate(`/${lng}/`)}>
            {t('favorites.explore')}
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('favorites.saved', { count: favorites.length })}
          </Typography>
          <RecipeGrid meals={favorites} />
        </>
      )}
    </Container>
  );
}
