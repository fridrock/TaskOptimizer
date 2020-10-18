function tasksReduser(
  state = {
    plans: [],
  },
  action
) {
  switch (action.type) {
    case "ADD_PLAN":
      state.plans.push(action.plan);
    default:
      return state;
  }
}
export default tasksReduser;
