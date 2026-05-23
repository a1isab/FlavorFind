import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('recipe-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((meal) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.idMeal === meal.idMeal)) return prev;
      return [meal, ...prev];
    });
  }, []);

  const removeFavorite = useCallback((idMeal) => {
    setFavorites((prev) => prev.filter((f) => f.idMeal !== idMeal));
  }, []);

  const isFavorite = useCallback((idMeal) => {
    return favorites.some((f) => f.idMeal === idMeal);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
