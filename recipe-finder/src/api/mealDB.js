const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
}

export async function searchByName(name) {
  const data = await fetchJSON(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
  return data.meals || [];
}

export async function searchByIngredient(ingredient) {
  const data = await fetchJSON(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  return data.meals || [];
}

export async function filterByCategory(category) {
  const data = await fetchJSON(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals || [];
}

export async function filterByArea(area) {
  const data = await fetchJSON(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  return data.meals || [];
}

export async function getMealById(id) {
  const data = await fetchJSON(`${BASE_URL}/lookup.php?i=${id}`);
  return data.meals ? data.meals[0] : null;
}

export async function getRandomMeal() {
  const data = await fetchJSON(`${BASE_URL}/random.php`);
  return data.meals ? data.meals[0] : null;
}

export async function getCategories() {
  const data = await fetchJSON(`${BASE_URL}/categories.php`);
  return data.categories || [];
}

export async function getAreas() {
  const data = await fetchJSON(`${BASE_URL}/list.php?a=list`);
  return data.meals || [];
}
