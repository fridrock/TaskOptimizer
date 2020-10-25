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

    default:
      return state;
  }
}
export default tasksReduser;
