import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import { getRandomMeal, getCategories } from '../api/mealDB';
import HeroBanner from '../components/HeroBanner';
import RecipeCard from '../components/RecipeCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function Home() {
  const navigate = useNavigate();
  const { lang } = useParams();
  const { t } = useTranslation();
  const [randomMeals, setRandomMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomLoading, setRandomLoading] = useState(false);
  const lng = lang || 'en';

  async function fetchRandomMeals(count) {
    const meals = [];
    let attempts = 0;
    while (meals.length < count && attempts < count * 5) {
      const meal = await getRandomMeal();
      if (meal) meals.push(meal);
      attempts++;
    }
    return meals;
  }

  useEffect(() => {
    async function load() {
      try {
        const [cats] = await Promise.all([getCategories()]);
        setCategories(cats);
        const meals = await fetchRandomMeals(4);
        setRandomMeals(meals);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleRandom = async () => {
    setRandomLoading(true);
    try {
      let attempts = 0;
      let meal = null;
      while (!meal && attempts < 5) {
        meal = await getRandomMeal();
        attempts++;
      }
      if (meal) navigate(`/${lng}/recipe/${meal.idMeal}`);
    } finally {
      setRandomLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingSkeleton count={4} />
      </Container>
    );
  }

  return (
    <Box>
      <HeroBanner onRandom={handleRandom} />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          {t('home.browseCategory')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 6 }}>
          {categories.filter((c) => c.strCategory !== 'Pork').slice(0, 12).map((cat) => (
            <Chip
              key={cat.idCategory}
              label={cat.strCategory}
              clickable
              color="primary"
              variant="outlined"
              size="medium"
              onClick={() => navigate(`/${lng}/search?category=${encodeURIComponent(cat.strCategory)}`)}
              sx={{
                py: 2,
                px: 1,
                fontSize: '0.9rem',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                },
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t('home.randomPicks')}
          </Typography>
          <Chip
            label={randomLoading ? t('home.loading') : t('home.showAnother')}
            clickable
            color="secondary"
            disabled={randomLoading}
            icon={randomLoading ? <CircularProgress size={16} /> : undefined}
            onClick={handleRandom}
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {randomMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
