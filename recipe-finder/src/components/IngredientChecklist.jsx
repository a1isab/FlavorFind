import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material';
import { ShoppingBasket as BasketIcon } from '@mui/icons-material';

export default function IngredientChecklist({ meal }) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState({});

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name, measure: measure?.trim() || '' });
    }
  }

  const handleToggle = (index) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <BasketIcon color="primary" />
        {t('recipe.ingredients')}
      </Typography>
      <List dense disablePadding>
        {ingredients.map((item, i) => (
          <ListItem
            key={i}
            disablePadding
            sx={{ py: 0.5 }}
            onClick={() => handleToggle(i)}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Checkbox
                edge="start"
                checked={!!checked[i]}
                size="small"
                sx={{
                  color: 'primary.light',
                  '&.Mui-checked': { color: 'success.main' },
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={`${item.name}${item.measure ? ` — ${item.measure}` : ''}`}
              sx={{
                '& .MuiListItemText-primary': {
                  textDecoration: checked[i] ? 'line-through' : 'none',
                  color: checked[i] ? 'text.secondary' : 'text.primary',
                  fontSize: '0.95rem',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
