import { filterMeals, isMealAllowed } from '../utils/foodFilter';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
}

export async function searchByName(name) {
  const data = await fetchJSON(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
  return filterMeals(data.meals || []);
}

async function enrichAndFilter(summaryMeals) {
  if (!summaryMeals || summaryMeals.length === 0) return [];
  const full = await Promise.all(
    summaryMeals.slice(0, 50).map((m) =>
      fetchJSON(`${BASE_URL}/lookup.php?i=${m.idMeal}`)
        .then((d) => (d.meals ? d.meals[0] : null))
    )
  );
  return full.filter(Boolean).filter(isMealAllowed);
}

export async function searchByIngredient(ingredient) {
  const data = await fetchJSON(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  return enrichAndFilter(data.meals || []);
}

export async function filterByCategory(category) {
  const data = await fetchJSON(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return enrichAndFilter(data.meals || []);
}

export async function filterByArea(area) {
  const data = await fetchJSON(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  return enrichAndFilter(data.meals || []);
}

export async function getMealById(id) {
  const data = await fetchJSON(`${BASE_URL}/lookup.php?i=${id}`);
  const meal = data.meals ? data.meals[0] : null;
    if (meal && !isMealAllowed(meal)) return null;
  return meal;
}

export async function getRandomMeal() {
  const data = await fetchJSON(`${BASE_URL}/random.php`);
  const meal = data.meals ? data.meals[0] : null;
  if (meal && !isMealAllowed(meal)) return null;
  return meal;
}

export async function getCategories() {
  const data = await fetchJSON(`${BASE_URL}/categories.php`);
  return data.categories || [];
}

export async function getAreas() {
  const data = await fetchJSON(`${BASE_URL}/list.php?a=list`);
  return data.meals || [];
}
