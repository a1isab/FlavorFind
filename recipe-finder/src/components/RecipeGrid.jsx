import Grid from '@mui/material/Grid';
import RecipeCard from './RecipeCard';

export default function RecipeGrid({ meals }) {
  if (!meals || meals.length === 0) return null;

  return (
    <Grid container spacing={3}>
      {meals.map((meal) => (
        <Grid
          key={meal.idMeal}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <RecipeCard meal={meal} />
        </Grid>
      ))}
    </Grid>
  );
}
