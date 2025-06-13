export class DikePoleItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dike-pole", "sheet", "item"],
      width: 520,
      height: 480,
    });
  }
  get template() {
    const itemType = this.item.type;
    return `systems/dike-pole/templates/item/${itemType}-sheet.html`;
  }
}