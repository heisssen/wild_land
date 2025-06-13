export class DikePoleActorSheet extends ActorSheet {
  
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dike-pole", "sheet", "actor"],
      template: "systems/dike-pole/templates/actor/character-sheet.html",
      width: 700,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
    });
  }

  getData() {
    const context = super.getData();
    context.actor.skills = context.actor.items.filter(item => item.type === 'skill');
    // Додайте інші типи предметів аналогічно
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    if (!this.isEditable) return;

    // Listener для кидка навички
    html.find('.skill-name').click(this._onSkillRoll.bind(this));
  }

  async _onSkillRoll(event) {
    event.preventDefault();
    const skillName = event.currentTarget.textContent;
    const skill = this.actor.items.find(i => i.name === skillName && i.type === 'skill');
    
    if (skill) {
      await game.dikePole.performActionRoll(this.actor, skill);
    }
  }
}