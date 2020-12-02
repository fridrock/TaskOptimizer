class StateFunctions {
  constructor(state) {
    this.state = state;
    this.findPlanById = this.findPlanById.bind(this);
    this.findColumnById = this.findColumnById.bind(this);
    this.countCheckBoxes = this.countCheckBoxes.bind(this);
    this.countDoneCheckBoxes = this.countDoneCheckBoxes.bind(this);
    this.countDoneProcent = this.countDoneProcent.bind(this);
    this.findCheckBoxById = this.findCheckBoxById.bind(this);
  }
  findPlanById(planId) {
    const plan = this.state.plans.find((plan) => {
      return plan.planId === planId;
    });
    return plan;
  }
  findColumnById(columnId) {
    let column;
    this.state.plans.forEach((plan) => {
      column = plan.columns.find((column) => {
        return column.columnId === columnId;
      });
    });
    return column;
  }
  findCheckBoxById(checkBoxId) {
    let checkBox = undefined;
    this.state.plans.forEach((plan) => {
      plan.columns.forEach((column) => {
        checkBox = column.checkBoxes.find((checkBox) => {
          return checkBox.checkBoxId === checkBoxId;
        });
      });
    });
    console.log(checkBox);
    return checkBox;
  }
  countDoneProcent(checkBoxId) {
    let checkBox = this.findCheckBoxById(checkBoxId);
    let column = this.findColumnById(checkBox.columnId);
    let plan = this.findPlanById(column.planId);
    let checkBoxesCount = this.countCheckBoxes(plan);
    let doneCheckBoxesCount = this.countDoneCheckBoxes(plan);
    plan.doneProcent = Math.round(
      (doneCheckBoxesCount / checkBoxesCount) * 100
    );
  }
  countCheckBoxes(plan) {
    let count = 0;
    plan.columns.forEach((column) => {
      count += column.checkBoxes.length;
    });
    console.log('count'+count);
    return count;
  }
  countDoneCheckBoxes(plan) {
    let doneCount = 0;
    plan.columns.forEach((column) => {
      doneCount += column.checkBoxes.filter((checkbox) => {
        return (checkbox.checkBoxDone === true)||(checkbox.checkBoxDone ===1);
      }).length;
    });
    console.log('done'+doneCount);
    return doneCount;
  }
}
export { StateFunctions };
