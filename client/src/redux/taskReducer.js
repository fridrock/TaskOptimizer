import { StateFunctions } from "./stateFunctions";

function tasksReduser(
  state = {
    plans: [],
    LoggedIn: false,
    userProfile: {},
  },
  action
) {
  //stateFunctions should be singleTon
  let stateFunctions = new StateFunctions(state);
  let currentColumn;
  let currentCheckBox;
  let currentPlan;
  switch (action.type) {
    case "LOGGED_IN":
      state.LoggedIn = true;
      state.userProfile = action.userProfile;
      return state;
    case "ADD_PLAN":
      state.plans.push(action.plan);
      return state;
    case "DELETE_PLAN":
      currentPlan = stateFunctions.findPlanById(action.planId);
      index = state.plans.indexOf(currentPlan);
      if (index > -1) {
        state.plans.splice(index, 1);
      }
      console.log(state.plans);
      return state;
    case "ADD_COLUMN":
      currentPlan = stateFunctions.findPlanById(action.planId);
      currentPlan.columns.push(action.column);
      return state;
    case "DELETE_COLUMN":
      currentPlan = stateFunctions.findPlanById(action.planId);
      currentColumn = stateFunctions.findColumnById(
        action.planId,
        action.columnId
      );
      let index = currentPlan.columns.indexOf(currentColumn);
      if (index > -1) {
        currentPlan.columns.splice(index, 1);
      }
      return state;
    case "ADD_CHECKBOX":
      currentPlan = stateFunctions.findPlanById(action.planId);
      currentColumn = stateFunctions.findColumnById(
        action.planId,
        action.columnId
      );
      currentColumn.checkBoxes.push(action.checkBox);
      stateFunctions.countDoneProcent(currentPlan);
      return state;
    case "UPDATE_CHECKBOX":
      currentPlan = stateFunctions.findPlanById(action.planId);
      currentCheckBox = stateFunctions.findCheckBoxById(
        action.planId,
        action.columnId,
        action.checkBoxId
      );
      currentCheckBox.checkBoxDone = !currentCheckBox.checkBoxDone;
      stateFunctions.countDoneProcent(currentPlan);
      return state;
    case "LOGOUT":
      state.userProfile = {};
      state.LoggedIn = false;
      state.plans = [];
      return state;
    case "SAVE_USER_DATA":
      state.plans = action.userData;
      state.plans.forEach((plan) => {
        stateFunctions.countDoneProcent(plan);
      });
      return state;
    default:
      return state;
  }
}
export default tasksReduser;
