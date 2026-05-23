import { Box, Typography, Container } from '@mui/material';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantIcon />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              FlavorFind
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Powered by TheMealDB — Find your next favorite dish
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} FlavorFind
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
