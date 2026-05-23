import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { SearchOff as SearchOffIcon } from '@mui/icons-material';
import {
  searchByName,
  searchByIngredient,
  filterByCategory,
  filterByArea,
  getCategories,
  getAreas,
} from '../api/mealDB';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import RecipeGrid from '../components/RecipeGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang } = useParams();
  const { t } = useTranslation();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [selectedArea, setSelectedArea] = useState(searchParams.get('area') || null);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const lng = lang || 'en';

  const query = searchParams.get('q') || '';

  useEffect(() => {
    async function loadFilters() {
      try {
        const [cats, areaList] = await Promise.all([getCategories(), getAreas()]);
        setCategories(cats);
        setAreas(areaList);
      } catch (err) {
        console.error('Failed to load filters:', err);
      } finally {
        setFiltersLoading(false);
      }
    }
    loadFilters();
  }, []);

  useEffect(() => {
    async function search() {
      setLoading(true);
      setError(null);
      try {
        let results = [];

        if (selectedCategory) {
          results = await filterByCategory(selectedCategory);
        } else if (selectedArea) {
          results = await filterByArea(selectedArea);
        } else if (query) {
          const byName = await searchByName(query);
          if (byName.length === 0) {
            results = await searchByIngredient(query);
          } else {
            results = byName;
          }
        } else {
          results = [];
        }

        setMeals(results);
      } catch (err) {
        setError(t('search.error'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    search();
  }, [query, selectedCategory, selectedArea, t]);

  const handleSearch = (q) => {
    setSelectedCategory(null);
    setSelectedArea(null);
    setSearchParams({ q });
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedArea(null);
    const params = {};
    if (cat) params.category = cat;
    setSearchParams(params);
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
    setSelectedCategory(null);
    const params = {};
    if (area) params.area = area;
    setSearchParams(params);
  };

  const hasFilters = query || selectedCategory || selectedArea;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <div id="search-section" />

      <SearchBar initialValue={query} onSearch={handleSearch} />

      <SearchFilters
        categories={categories}
        areas={areas}
        selectedCategory={selectedCategory}
        selectedArea={selectedArea}
        onCategoryChange={handleCategoryChange}
        onAreaChange={handleAreaChange}
        loading={filtersLoading}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <LoadingSkeleton count={8} />
      ) : !hasFilters ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <SearchOffIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
          <Typography variant="h5" color="text.secondary">
            {t('search.emptyTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {t('search.emptyHint')}
          </Typography>
        </Box>
      ) : meals.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <SearchOffIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
          <Typography variant="h5" color="text.secondary">
            {t('search.noResults')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {t('search.noResultsHint')}
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('search.resultsFound', { count: meals.length })}
          </Typography>
          <RecipeGrid meals={meals} />
        </>
      )}
    </Container>
  );
}
