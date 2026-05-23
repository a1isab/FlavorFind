import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Translate as TranslateIcon } from '@mui/icons-material';
import { getSupportedLangs } from '../i18n/i18n';

const FLAGS = { en: '🇬🇧', ar: '🇸🇦', ru: '🇷🇺' };

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const currentLang = lang || i18n.language?.slice(0, 2) || 'en';

  const handleSwitch = (lng) => {
    setAnchor(null);
    const rest = location.pathname.replace(/^\/[^/]+/, '') || '/';
    const search = location.search;
    navigate(`/${lng}${rest}${search}`);
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{ fontWeight: 600, fontSize: '0.9rem' }}
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {getSupportedLangs().map((lng) => (
          <MenuItem
            key={lng}
            selected={lng === currentLang}
            onClick={() => handleSwitch(lng)}
          >
            <Typography sx={{ mr: 1 }}>{FLAGS[lng]}</Typography>
            <ListItemText>{t(`language.${lng}`)}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
