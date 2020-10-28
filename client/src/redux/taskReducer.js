function tasksReduser(
  state = {
    plans: [],
    LoggedIn: false,
    userProfile: {},
    lastPlanId: 0,
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
      state.lastPlanId++;
      return state;
    case "ADD_COLUMN":
      state.plans.forEach((plan) => {
        if (plan.id == action.planId) {
          plan.columns.push(action.column);
          plan.lastColumnId++;
        }
      });

      return state;
    case "ADD_CHECKBOX":
      state.plans.forEach((plan) => {
        if (plan.id == action.planId) {
          plan.columns.forEach((column) => {
            if (column.column_id == action.columnId) {
              column.checkboxes.push(action.checkbox);
              column.lastCheckBoxId++;
            }
          });
        }
      });

      console.log(state);
      return state;

    default:
      return state;
  }
}

export default tasksReduser;
