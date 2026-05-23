import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import baseTheme from '../theme';
import { isValidLang } from '../i18n/i18n';

function RTLProvider({ children }) {
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  if (!isRtl) return children;

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}

export default function LanguageRouter({ children }) {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  const valid = isValidLang(lang);
  const currentLang = valid ? lang : 'en';

  useEffect(() => {
    if (valid) {
      i18n.changeLanguage(currentLang);
      localStorage.setItem('i18nextLng', currentLang);
    }
  }, [currentLang, valid, i18n]);

  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  if (!valid) {
    const detected = localStorage.getItem('i18nextLng') || navigator.language?.slice(0, 2) || 'en';
    const target = isValidLang(detected) ? detected : 'en';
    return <Navigate to={`/${target}/`} replace />;
  }

  const rtlTheme = createTheme({
    ...baseTheme,
    direction: currentLang === 'ar' ? 'rtl' : 'ltr',
  });

  return (
    <ThemeProvider theme={rtlTheme}>
      <RTLProvider>
        {children}
      </RTLProvider>
    </ThemeProvider>
  );
}
