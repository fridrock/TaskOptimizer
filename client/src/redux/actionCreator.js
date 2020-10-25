let addPlanCreator = function (plan) {
  return {
    type: "ADD_PLAN",
    plan: plan,
  };
};
let loggedInCreator = function (userProfile) {
  return {
    type: "LOGGED_IN",
    userProfile: userProfile,
  };
};
export { addPlanCreator };
export { loggedInCreator };
