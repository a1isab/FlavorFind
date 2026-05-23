import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  YouTube as YouTubeIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { getMealById } from '../api/mealDB';
import { useFavorites } from '../context/FavoritesContext';
import IngredientChecklist from '../components/IngredientChecklist';

export default function RecipeDetail() {
  const { id, lang } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lng = lang || 'en';

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMealById(id);
        if (!data) {
          setError(t('recipe.notFound'));
        } else {
          setMeal(data);
        }
      } catch (err) {
        setError(t('recipe.loadError'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, t]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (error || !meal) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || t('recipe.notFound')}
        </Typography>
        <Button variant="contained" onClick={() => navigate(`/${lng}/`)}>
          {t('recipe.goHome')}
        </Button>
      </Container>
    );
  }

  const fav = isFavorite(meal.idMeal);
  const tags = meal.strTags?.split(',').filter(Boolean) || [];
  const youtubeId = meal.strYoutube?.split('v=')[1]?.split('&')[0];
  const instructions = meal.strInstructions
    ?.split('\r\n')
    .filter(Boolean)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 300, md: 450 },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
          }}
        />
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: 'white' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 2, md: 4 },
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontSize: { xs: '1.8rem', md: '3rem' },
                fontWeight: 800,
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {meal.strMeal}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
              {meal.strCategory && (
                <Chip label={meal.strCategory} size="small" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} variant="outlined" />
              )}
              {meal.strArea && (
                <Chip label={meal.strArea} size="small" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} variant="outlined" />
              )}
              {tags.slice(0, 4).map((tag) => (
                <Chip key={tag} label={tag.trim()} size="small" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} variant="outlined" />
              ))}
            </Box>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          <Box>
            <IngredientChecklist meal={meal} />

            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              <IconButton
                color={fav ? 'error' : 'default'}
                onClick={() => fav ? removeFavorite(meal.idMeal) : addFavorite(meal)}
                sx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.200' } }}
              >
                {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              {youtubeId && (
                <Button
                  variant="outlined"
                  startIcon={<YouTubeIcon />}
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener"
                  color="error"
                >
                  {t('recipe.watchOnYoutube')}
                </Button>
              )}
              {meal.strSource && (
                <Button
                  variant="outlined"
                  startIcon={<LanguageIcon />}
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener"
                >
                  {t('recipe.source')}
                </Button>
              )}
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              {t('recipe.instructions')}
            </Typography>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 3,
                maxHeight: 600,
                overflow: 'auto',
              }}
            >
              {instructions?.length > 0 ? (
                instructions.map((step, i) => (
                  <Box key={i} className="fade-in" sx={{ mb: 2, display: 'flex', gap: 2 }}>
                    <Typography
                      component="span"
                      sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {step}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" color="text.secondary">
                  {meal.strInstructions}
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
