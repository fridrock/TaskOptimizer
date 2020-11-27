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
  findPlanById() {
   
  }
  findColumnById() {
    

  }
  findCheckBoxById() {
    
    
  }
  countDoneProcent() {
  }
  countCheckBoxes() {
    
  }
  countDoneCheckBoxes() {
    
}
}
export { StateFunctions };
