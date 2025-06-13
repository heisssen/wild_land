export class DikePoleActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dike-pole", "sheet", "actor", "character"],
      template: "systems/dike-pole/templates/actor/character-sheet.html",
      width: 800,
      height: 850,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
    });
  }
  getData() {
    const context = super.getData();
    context.system = context.actor.system;
    this._prepareItems(context);
    return context;
  }
  _prepareItems(context) {
    const actorData = context.actor;
    const itemTypes = ["skill", "knowledge", "aspect", "drive", "bond", "equipment", "shard", "map", "project"];
    itemTypes.forEach(type => {
      context[type + 's'] = actorData.items.filter(item => item.type === type);
    });
  }
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;
    html.find('.skill-name').click(this._onSkillRoll.bind(this));
    html.find('.item-create').click(this._onItemCreate.bind(this));
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
    });
  }
  _onSkillRoll(event) {
    event.preventDefault();
    const itemId = $(event.currentTarget).parents('.item').data('itemId');
    const skill = this.actor.items.get(itemId);
    if (skill) {
      game.dikePole.performActionRoll(this.actor, skill);
    }
  }
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const name = `Новий ${type}`;
    const itemData = { name: name, type: type, system: {} };
    await this.actor.createEmbeddedDocuments("Item", [itemData]);
  }
}