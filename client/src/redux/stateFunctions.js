class StateFunctions {
  constructor(state) {
    this.state = state;
    this.findPlanById = this.findPlanById.bind(this);
    this.findColumnById = this.findColumnById.bind(this);
    this.countDoneProcent = this.countDoneProcent.bind(this);
    this.findCheckBoxById = this.findCheckBoxById.bind(this);
  }
  findPlanById(planId) {
    let currentPlan = this.state.plans.find((plan) => {
      return plan.planId === planId;
    });
    return currentPlan;
  }
  findColumnById(planId, columnId) {
    let currentPlan = this.findPlanById(planId);
    let currentColumn = currentPlan.columns.find((column) => {
      return column.columnId === columnId;
    });
    return currentColumn;
  }
  findCheckBoxById(planId, columnId, checkBoxId) {
    let currentColumn = this.findColumnById(planId, columnId);
    let currentCheckBox = currentColumn.checkBoxes.find((checkBox) => {
      return checkBox.checkBoxId === checkBoxId;
    });
    return currentCheckBox;
  }
  countDoneProcent(plan) {
    let checkBoxesCount = 0;
    let doneCheckBoxes = 0;
    plan.columns.forEach((column) => {
      checkBoxesCount += column.checkBoxes.length;
      column.checkBoxes.forEach((checkbox) => {
        if (checkbox.checkBoxDone || checkbox.checkBoxDone === 1) {
          doneCheckBoxes++;
        }
      });
    });
    if (doneCheckBoxes === 0) {
      plan.doneProcent = 0;
      console.log(plan.doneProcent);
    } else {
      plan.doneProcent = Math.round((doneCheckBoxes / checkBoxesCount) * 100);
    }
  }
}
export { StateFunctions };
