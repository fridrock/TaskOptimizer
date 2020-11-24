import { StateFunctions } from "./stateFunctions";

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
      state.plans.forEach((plan) => {
        plan.columns.forEach((column) => {
          if (column.columnId == action.checkbox.columnId) {
            column.checkBoxes.push(action.checkbox);
          }
        });
      });

      console.log(state);
      return state;
    case "UPDATE_CHECKBOX":
      const stateFunctions = new StateFunctions(state);
      //update code
      const checkBox = stateFunctions.findCheckBoxById(action.checkBoxId);

      checkBox.checkBoxDone = !checkBox.checkBoxDone;
      //counting done procent
      stateFunctions.countDoneProcent(action.checkBoxId);
      return state;
    case "LOGOUT":
      state.userProfile = {};
      state.LoggedIn = false;
    default:
      return state;
  }
}

export default tasksReduser;
