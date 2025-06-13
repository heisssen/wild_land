export class DikePoleItemSheet extends ItemSheet {
  
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dike-pole", "sheet", "item"],
      width: 520,
      height: 480,
    });
  }

  get template() {
    return `systems/dike-pole/templates/item/${this.item.type}-sheet.html`;
  }

  getData() {
    const context = super.getData();
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}