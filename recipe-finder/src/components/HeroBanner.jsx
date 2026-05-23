import { Box, Typography, Button, Container } from '@mui/material';
import { Shuffle as ShuffleIcon } from '@mui/icons-material';

export default function HeroBanner({ onRandom }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #BF360C 0%, #D84315 30%, #FF8F00 70%, #FFB300 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -150,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            mb: 2,
            lineHeight: 1.1,
          }}
        >
          Discover Your Next
          <Box component="span" sx={{ display: 'block', color: 'rgba(255,255,255,0.9)' }}>
            Favorite Dish
          </Box>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontWeight: 400,
            opacity: 0.9,
            maxWidth: 500,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          Search thousands of recipes from around the world. Type an ingredient, a dish name, or get inspired with a random pick.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.dark',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: 'grey.100' },
            }}
            onClick={() => {
              const el = document.getElementById('search-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start Searching
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'rgba(255,255,255,0.5)',
              color: 'white',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
            startIcon={<ShuffleIcon />}
            onClick={onRandom}
          >
            Surprise Me
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
