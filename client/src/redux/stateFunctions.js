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
   return state.plans.find((plan)=>plan.planId === planId
   );
  }
  findColumnById(columnId) {
   
  for(let i=0;i<this.state.plans.length;i++){
    let plan = this.state.plans[i];
    for(let j=0;j<plan.columns.length;j++){
      if(plan.columns[j].columnId === columnId){
        return plan.columns[j];
      }
    }
  }
  }
  countDoneProcent(checkBox) {
    let column = this.findColumnById(checkBox.columnId);
    let plan = this.findPlanByIdc(column.planId);
    plan.doneProcent = Math.round(this.countDoneCheckBoxes(plan.planId)/this.countCheckBoxes(plan.planId)*100);
  }
  countCheckBoxes(planId) {
    let count;
    let plan = this.findPlanById(planId);
      plan.columns.forEach((column)=>{
        count+=column.checkBoxes.length;
      });
    return count;
  }
  countDoneCheckBoxes(planId) {
    let countDone;
    let plan =  this.findPlanById(planId);
    plan.columns.forEach((column)=>{
        countDone+=column.checkBoxes.filter((checkBox)=>(checkBox.checkBoxDone == true) ||(checkBox.checkBoxDone == 1)).length;
      });
    
    return countDone;
  }
}
export { StateFunctions };
