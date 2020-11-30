

function tasksReduser(
  state = {
    plans: [],
    LoggedIn: false,
    userProfile: {},
  },
  action
) {
 
  switch (action.type) {
    case "LOGGED_IN":
      state.LoggedIn = true;
      state.userProfile = action.userProfile;
      return state;
    case "ADD_PLAN":
      state.plans.push(action.plan);

      return state;
    case "ADD_COLUMN":
      state.plans.forEach((plan) => {
        if (plan.planId == action.planId) {
          plan.columns.push(action.column);
        }
      });

      return state;
      case "ADD_CHECKBOX":
        let currentPlan;
        state.plans.forEach((plan) => {
          if (plan.planId == action.planId) {
            currentPlan = plan;
            plan.columns.forEach((column) => {
              if (column.columnId == action.columnId) {
                column.checkBoxes.push(action.checkBox);
               
              }
            });
          }
        });
  calculateDoneProcent(currentPlan);
        console.log(state);
        return state;
      case "UPDATE_CHECKBOX":
        currentPlan = state.plans.find((plan) => {
          return plan.planId === action.planId;
        });
        let checkbox = currentPlan.columns
          .find((column) => {
            return column.columnId === action.columnId;
          })
          .checkBoxes.find((checkbox) => {
            return checkbox.checkBoxId === action.checkBoxId;
          });
        checkbox.checkBoxDone = !checkbox.checkBoxDone;
        calculateDoneProcent(currentPlan);
        return state;
  
    case "LOGOUT":
      state.userProfile = {};
      state.LoggedIn = false;
      state.plans = [];
      return state;
    case "SAVE_USER_DATA":
      state.plans = action.userData;
      state.plans.forEach((plan)=>{
        calculateDoneProcent(plan);
      })
      return state;
    default:
      return state;
  }
}
function calculateDoneProcent(plan){
  let checkBoxesCount = 0;
    let doneCheckBoxes = 0;
  plan.columns.forEach((column) => {
          checkBoxesCount += column.checkBoxes.length;
          column.checkBoxes.forEach((checkbox) => {
            if (checkbox.checkBoxDone||checkbox.checkBoxDone===1) {
              doneCheckBoxes++;
            }
          });
        });
        console.log('done'+ doneCheckBoxes +" count "+checkBoxesCount);
        if(doneCheckBoxes === 0){ 
          plan.doneProcent = 0;
         console.log(plan.doneProcent);
        }else {
          plan.doneProcent = Math.round(
          (doneCheckBoxes / checkBoxesCount) * 100
        );
        }
        
}
export default tasksReduser;
export{ calculateDoneProcent};