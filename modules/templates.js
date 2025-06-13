export const preloadHandlebarsTemplates = async function() {
  const templatePaths = [
    // Аркуші акторів
    "systems/dike-pole/templates/actor/character-sheet.html",
    "systems/dike-pole/templates/actor/camp-sheet.html",
    
    // Аркуші предметів
    "systems/dike-pole/templates/item/skill-sheet.html",
    "systems/dike-pole/templates/item/aspect-sheet.html",
    "systems/dike-pole/templates/item/equipment-sheet.html",
    // Додайте сюди шаблони для інших типів предметів, якщо вони потрібні
    
    // Картка в чаті
    "systems/dike-pole/templates/chat/roll-card.html"
  ];

  return loadTemplates(templatePaths);
}