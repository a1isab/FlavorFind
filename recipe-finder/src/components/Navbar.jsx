import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { favorites } = useFavorites();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ gap: 1, maxWidth: 1200, width: '100%', mx: 'auto' }}>
        <IconButton
          edge="start"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mr: 1 }}
        >
          <RestaurantIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            cursor: 'pointer',
            color: 'primary.main',
            display: { xs: searchOpen ? 'none' : 'block', md: 'block' },
          }}
          onClick={() => navigate('/')}
        >
          FlavorFind
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {!isMobile && (
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'grey.100',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              maxWidth: 400,
              width: '100%',
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ flex: 1, fontSize: 14 }}
              inputProps={{ 'aria-label': 'search recipes' }}
            />
          </Box>
        )}

        {isMobile && (
          <IconButton color="primary" onClick={() => setSearchOpen(!searchOpen)}>
            <SearchIcon />
          </IconButton>
        )}

        <IconButton color={location.pathname === '/favorites' ? 'primary' : 'default'} onClick={() => navigate('/favorites')}>
          <Badge badgeContent={favorites.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Toolbar>

      {isMobile && searchOpen && (
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ px: 2, pb: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'grey.100',
              borderRadius: 2,
              px: 2,
              py: 0.5,
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ flex: 1, fontSize: 14 }}
              autoFocus
              inputProps={{ 'aria-label': 'search recipes' }}
            />
          </Box>
        </Box>
      )}
    </AppBar>
  );
}
