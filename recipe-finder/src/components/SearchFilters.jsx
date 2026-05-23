import { Box, Chip, Typography, CircularProgress } from '@mui/material';

export default function SearchFilters({
  categories,
  areas,
  selectedCategory,
  selectedArea,
  onCategoryChange,
  onAreaChange,
  loading,
}) {
  return (
    <Box sx={{ mb: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="All"
                size="small"
                variant={!selectedCategory ? 'filled' : 'outlined'}
                color={!selectedCategory ? 'primary' : 'default'}
                onClick={() => onCategoryChange(null)}
              />
              {categories.filter((c) => c.strCategory !== 'Pork').map((cat) => (
                <Chip
                  key={cat.strCategory}
                  label={cat.strCategory}
                  size="small"
                  variant={selectedCategory === cat.strCategory ? 'filled' : 'outlined'}
                  color={selectedCategory === cat.strCategory ? 'primary' : 'default'}
                  onClick={() => onCategoryChange(cat.strCategory)}
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Cuisine (Area)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="All"
                size="small"
                variant={!selectedArea ? 'filled' : 'outlined'}
                color={!selectedArea ? 'secondary' : 'default'}
                onClick={() => onAreaChange(null)}
              />
              {areas.map((area) => (
                <Chip
                  key={area.strArea}
                  label={area.strArea}
                  size="small"
                  variant={selectedArea === area.strArea ? 'filled' : 'outlined'}
                  color={selectedArea === area.strArea ? 'secondary' : 'default'}
                  onClick={() => onAreaChange(area.strArea)}
                />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
