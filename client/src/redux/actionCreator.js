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
let addColumnCreator = function (column) {
  return {
    type: "ADD_COLUMN",
    column: column,
    planId: column.planId,
  };
};
let addCheckBoxCreator = function (checkBox) {
  return {
    type: "ADD_CHECKBOX",
    checkBox: checkBox,
    
  };
};
let updateCheckBoxCreator = function (checkBox) {
  return {
    type: "UPDATE_CHECKBOX",
    checkBox: checkBox,
  };
};
let logoutCreator = function () {
  return {
    type: "LOGOUT",
  };
};
let saveUserDataCreator = function(userData){
  return{
    type:"SAVE_USER_DATA",
    userData:userData
  }
}
export { addCheckBoxCreator };
export { addPlanCreator };
export { addColumnCreator };
export { loggedInCreator };
export { updateCheckBoxCreator };
export { logoutCreator };
export{saveUserDataCreator};