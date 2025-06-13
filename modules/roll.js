export async function performActionRoll(actor, skill) {
  
  const template = `
    <div>
      <div class="form-group">
        <label>${game.i18n.localize("DIKEPOLE.Advantages")}</label>
        <input type="number" id="advantages" value="0" min="0" max="3" />
      </div>
      <div class="form-group">
        <label>${game.i18n.localize("DIKEPOLE.Cuts")}</label>
        <input type="number" id="cuts" value="0" min="0" max="2" />
      </div>
    </div>
  `;

  new Dialog({
    title: `${game.i18n.localize("DIKEPOLE.RollAction")}: ${skill.name}`,
    content: template,
    buttons: {
      roll: {
        icon: '<i class="fas fa-dice-d6"></i>',
        label: game.i18n.localize("DIKEPOLE.Roll"),
        callback: async (html) => {
          const advantages = parseInt(html.find('#advantages').val());
          const cuts = parseInt(html.find('#cuts').val());
          const baseDice = skill.system.rating || 0;
          let dicePool = baseDice + advantages;

          const isDesperate = dicePool === 0;
          if (isDesperate) dicePool = 1;

          const roll = await new Roll(`${dicePool}d6`).roll({async: true});
          let results = roll.terms[0].results.map(r => r.result);

          // Застосування Зрізу
          let sortedResults = [...results].sort((a, b) => b - a);
          for (let i = 0; i < cuts; i++) {
            if (sortedResults.length > 0) {
              sortedResults.shift();
            }
          }
          
          let highestResult = sortedResults.length > 0 ? sortedResults[0] : 0;
          if (isDesperate && highestResult > 3) {
            highestResult = 5; // Успіх стає Конфліктом
          }

          // Перевірка на Твіст
          const counts = {};
          results.forEach(x => { counts[x] = (counts[x] || 0) + 1; });
          const hasTwist = Object.values(counts).some(c => c >= 2);

          // Визначення результату
          let outcome = "";
          if (highestResult >= 6) outcome = game.i18n.localize("DIKEPOLE.Triumph");
          else if (highestResult >= 4) outcome = game.i18n.localize("DIKEPOLE.Conflict");
          else outcome = game.i18n.localize("DIKEPOLE.Calamity");
          
          const chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ actor: actor }),
            content: await renderTemplate("systems/dike-pole/templates/chat/roll-card.html", {
              title: `${actor.name}: ${skill.name}`,
              outcome: outcome,
              highestResult: highestResult,
              hasTwist: hasTwist,
              formula: roll.formula,
              total: roll.total,
              results: results
            })
          };

          ChatMessage.create(chatData);
        }
      }
    },
    default: "roll"
  }).render(true);
}