// Імпорт класів для аркушів
import { DikePoleActorSheet } from "./sheets/actor-sheet.js";
import { DikePoleCampSheet } from "./sheets/camp-sheet.js";
import { DikePoleItemSheet } from "./sheets/item-sheet.js";

// Імпорт основної логіки
import { performActionRoll } from "./roll.js";
import { preloadHandlebarsTemplates } from "./templates.js";

/* ------------------------------------ */
/* Ініціалізація системи                */
/* ------------------------------------ */
Hooks.once('init', async function() {
  console.log('Дике Поле | Ініціалізація ігрової системи');

  // Створення глобального об'єкта для доступу до функцій системи
  game.dikePole = {
    performActionRoll
  };

  // Зняття реєстрації стандартних аркушів
  Actors.unregisterSheet("core", ActorSheet);
  Items.unregisterSheet("core", ItemSheet);

  // Реєстрація наших кастомних аркушів
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
  
  // Попереднє завантаження Handlebars-шаблонів
  return preloadHandlebarsTemplates();
});

/* ------------------------------------ */
/* Додаткові налаштування               */
/* ------------------------------------ */
Hooks.once("ready", function() {
  // Код, який має виконатися, коли світ повністю завантажений
  console.log('Дике Поле | Система готова до роботи');
});