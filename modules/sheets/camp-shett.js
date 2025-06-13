export class DikePoleCampSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dike-pole", "sheet", "actor", "camp"],
      template: "systems/dike-pole/templates/actor/camp-sheet.html",
      width: 650,
      height: 700,
    });
  }
  getData() {
    const context = super.getData();
    context.system = context.actor.system;
    return context;
  }
}