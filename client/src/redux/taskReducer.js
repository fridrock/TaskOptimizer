import { StateFunctions } from "./stateFunctions";

function tasksReduser(
  state = {
    plans: [],
    LoggedIn: false,
    userProfile: {},
  },
  action
) {
  const stateFunctions = new StateFunctions(state);
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
    //add code
    //count done procent      
    case "UPDATE_CHECKBOX":
      //update code
     //count done procent code
    case "LOGOUT":
      state.userProfile = {};
      state.LoggedIn = false;
      state.plans = [];
      return state;
    case "SAVE_USER_DATA":
      state.plans = action.userData;
      return state;
    default:
      return state;
  }
}

export default tasksReduser;
