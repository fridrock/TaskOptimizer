import { StateFunctions } from "./stateFunctions";

function tasksReduser(
  state = {
    plans: [
      //   {
      //     columns: [
      //       {
      //         checkBoxes: [
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 2,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 3,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 4,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 5,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 6,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 7,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 8,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdfdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 9,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdfdfd",
      //             checkBoxDone: false,
      //             checkBoxId: 10,
      //           },
      //           {
      //             columnId: 1,
      //             checkBoxName: "fdfdsfsdfs",
      //             checkBoxDone: false,
      //             checkBoxId: 11,
      //           },
      //           // {
      //           //   columnId: 1,
      //           //   checkBoxName: "fdfdfsdfs",
      //           //   checkBoxDone: false,
      //           //   checkBoxId: 12,
      //           // },
      //           // {
      //           //   columnId: 1,
      //           //   checkBoxName: "fdfdfd",
      //           //   checkBoxDone: false,
      //           //   checkBoxId: 13,
      //           // },
      //           // {
      //           //   columnId: 1,
      //           //   checkBoxName: "fdfdfdfd",
      //           //   checkBoxDone: false,
      //           //   checkBoxId: 14,
      //           // },
      //           // {
      //           //   columnId: 1,
      //           //   checkBoxName: "fdfdfdfd",
      //           //   checkBoxDone: false,
      //           //   checkBoxId: 15,
      //           // },
      //           // {
      //           //   columnId: 1,
      //           //   checkBoxName: "fdfdfdfd",
      //           //   checkBoxDone: false,
      //           //   checkBoxId: 16,
      //           // },
      //         ],
      //         planId: 1,
      //         columnId: 1,
      //         columnName: "fd",
      //       },
      //     ],
      //     doneProcent: 0,
      //     planId: 1,
      //     planName: "fd",
      //     userId: 1,
      //   },
    ],
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
    case "ADD_COLUMN":
      currentPlan = stateFunctions.findPlanById(action.planId);
      currentPlan.columns.push(action.column);
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
