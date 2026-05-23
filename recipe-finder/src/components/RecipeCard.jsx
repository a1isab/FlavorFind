import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { useFavorites } from '../context/FavoritesContext';

export default function RecipeCard({ meal }) {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const fav = isFavorite(meal.idMeal);

  return (
    <Card
      className="fade-in"
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
    >
      <CardMedia
        component="img"
        height="200"
        image={meal.strMealThumb}
        alt={meal.strMeal}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" component="h2" sx={{ fontSize: '1rem', fontWeight: 700 }} noWrap>
          {meal.strMeal}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
          {meal.strCategory && (
            <Chip label={meal.strCategory} size="small" color="primary" variant="outlined" />
          )}
          {meal.strArea && (
            <Chip label={meal.strArea} size="small" color="secondary" variant="outlined" />
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <IconButton
          color={fav ? 'error' : 'default'}
          onClick={(e) => {
            e.stopPropagation();
            fav ? removeFavorite(meal.idMeal) : addFavorite(meal);
          }}
          size="small"
        >
          {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
