import { DikePoleActorSheet } from "./sheets/actor-sheet.js";
import { DikePoleCampSheet } from "./sheets/camp-sheet.js";
import { DikePoleItemSheet } from "./sheets/item-sheet.js";
import { performActionRoll } from "./roll.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once('init', async function() {
  console.log('Дике Поле | Ініціалізація ігрової системи');

  game.dikePole = { performActionRoll };

  Actors.unregisterSheet("core", ActorSheet);
  Items.unregisterSheet("core", ItemSheet);

  Actors.registerSheet("dike-pole", DikePoleActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "Аркуш персонажа Дикого Поля"
  });
  
  Actors.registerSheet("dike-pole", DikePoleCampSheet, {
    types: ["camp"],
    makeDefault: true,
    label: "Аркуш табору Дикого Поля"
  });

  Items.registerSheet("dike-pole", DikePoleItemSheet, {
    makeDefault: true,
    label: "Аркуш предмета Дикого Поля"
  });
  
  return preloadHandlebarsTemplates();
});