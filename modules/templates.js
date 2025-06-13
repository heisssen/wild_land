export const preloadHandlebarsTemplates = async function() {
  const templatePaths = [
    "systems/dike-pole/templates/actor/character-sheet.html",
    "systems/dike-pole/templates/actor/camp-sheet.html",
    "systems/dike-pole/templates/item/aspect-sheet.html",
    "systems/dike-pole/templates/item/skill-sheet.html",
    "systems/dike-pole/templates/chat/roll-card.html"
  ];
  return loadTemplates(templatePaths);
}