const PORK_KEYWORDS = [
  'pork', 'ham', 'bacon', 'sausage', 'chorizo', 'prosciutto',
  'gammon', 'pancetta', 'lard', 'suet', 'pork belly', 'pork chop',
  'pork shoulder', 'pork loin', 'pork tenderloin', 'pork ribs',
  'pork leg', 'pork steak', 'pork mince', 'ground pork',
  'pepperoni', 'salami', 'bratwurst', 'kielbasa', 'andouille',
  'morcilla', 'guanciale', 'speck', 'coppa', 'capicola',
];

const ALCOHOL_KEYWORDS = [
  'wine', 'beer', 'vodka', 'rum', 'whiskey', 'whisky', 'gin',
  'liqueur', 'champagne', 'sherry', 'brandy', 'cognac', 'tequila',
  'bourbon', 'scotch', 'cider', 'port', 'martini', 'sake',
  'schnapps', 'vermouth', 'amaretto', 'baileys', 'kahlua',
  'cointreau', 'grand marnier', 'frangelico', 'limoncello',
  'chambord', 'sambuca', 'ouzo', 'grappa', 'absinthe', 'liquor',
  'alcohol', 'ale', 'stout', 'lager', 'mead', 'liquor',
  'bitters', 'triple sec', 'campari', 'aperol', 'strega',
  'chartreuse', 'benedictine', 'drambuie', 'malibu', 'disaronno',
  'jägermeister', 'jaegermeister', 'jagermeister',
];

export function isMealAllowed(meal) {
  if (!meal) return false;

  for (let i = 1; i <= 20; i++) {
    const ingredient = (meal[`strIngredient${i}`] || '').toLowerCase().trim();
    if (!ingredient) continue;

    if (PORK_KEYWORDS.some((k) => ingredient.includes(k))) return false;
    if (ALCOHOL_KEYWORDS.some((k) => ingredient.includes(k))) return false;
  }

  return true;
}

export function filterMeals(meals) {
  if (!meals || meals.length === 0) return meals;
  return meals.filter(isMealAllowed);
}
