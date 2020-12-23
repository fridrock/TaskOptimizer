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
      let columnPriority = column.columnPriority;
      switch (columnPriority) {
        case 1:
          checkBoxesCount += column.checkBoxes.length;
          break;
        case 2:
          checkBoxesCount += column.checkBoxes.length * 2;
          break;
        case 3:
          checkBoxesCount += column.checkBoxes.length * 3;
          break;
      }

      column.checkBoxes.forEach((checkbox) => {
        if (checkbox.checkBoxDone || checkbox.checkBoxDone === 1) {
          switch (columnPriority) {
            case 1:
              doneCheckBoxes++;
              break;
            case 2:
              doneCheckBoxes += 2;
              break;
            case 3:
              doneCheckBoxes += 3;
              break;
          }
        }
      });
    });

    if (doneCheckBoxes === 0) {
      plan.doneProcent = 0;
    } else {
      plan.doneProcent = Math.round((doneCheckBoxes / checkBoxesCount) * 100);
    }
  }
}
export { StateFunctions };
