import { useTranslation } from 'react-i18next';
import { Box, Typography, Container } from '@mui/material';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

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
              {t('app.title')}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {t('footer.poweredBy')}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            {t('footer.copyright', { year })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
