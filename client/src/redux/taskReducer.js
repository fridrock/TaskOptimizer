function tasksReduser(
  state = {
    plans: [
      {
        columns: [
          {
            checkBoxes: [
              {
                columnId: 1,
                checkBoxName: "fdfdfd",
                checkBoxDone: false,
                checkBoxId: 2,
              },
              {
                columnId: 1,
                checkBoxName: "fdfd",
                checkBoxDone: false,
                checkBoxId: 3,
              },
              {
                columnId: 1,
                checkBoxName: "fdfdfd",
                checkBoxDone: false,
                checkBoxId: 4,
              },
              {
                columnId: 1,
                checkBoxName: "fdfdfd",
                checkBoxDone: false,
                checkBoxId: 5,
              },
              {
                columnId: 1,
                checkBoxName: "fdfdfd",
                checkBoxDone: false,
                checkBoxId: 6,
              },
              {
                columnId: 1,
                checkBoxName: "fdfdfd",
                checkBoxDone: false,
                checkBoxId: 7,
              },
              {
                columnId: 1,
                checkBoxName: "fdfdfd",
                checkBoxDone: false,
                checkBoxId: 8,
              },
              {
                columnId: 1,
                checkBoxName: "fdfdfdfd",
                checkBoxDone: false,
                checkBoxId: 9,
              },
              {
                columnId: 1,
                checkBoxName: "fdfdfdfd",
                checkBoxDone: false,
                checkBoxId: 10,
              },
              {
                columnId: 1,
                checkBoxName: "fdfdsfsdfs",
                checkBoxDone: false,
                checkBoxId: 11,
              },
              // {
              //   columnId: 1,
              //   checkBoxName: "fdfdfsdfs",
              //   checkBoxDone: false,
              //   checkBoxId: 12,
              // },
              // {
              //   columnId: 1,
              //   checkBoxName: "fdfdfd",
              //   checkBoxDone: false,
              //   checkBoxId: 13,
              // },
              // {
              //   columnId: 1,
              //   checkBoxName: "fdfdfdfd",
              //   checkBoxDone: false,
              //   checkBoxId: 14,
              // },
              // {
              //   columnId: 1,
              //   checkBoxName: "fdfdfdfd",
              //   checkBoxDone: false,
              //   checkBoxId: 15,
              // },
              // {
              //   columnId: 1,
              //   checkBoxName: "fdfdfdfd",
              //   checkBoxDone: false,
              //   checkBoxId: 16,
              // },
            ],
            planId: 1,
            columnId: 1,
            columnName: "fd",
          },
        ],
        doneProcent: 0,
        planId: 1,
        planName: "fd",
        userId: 1,
      },
    ],
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
      state.plans.forEach((plan) => {
        calculateDoneProcent(plan);
      });
      return state;
    default:
      return state;
  }
}
function calculateDoneProcent(plan) {
  let checkBoxesCount = 0;
  let doneCheckBoxes = 0;
  plan.columns.forEach((column) => {
    checkBoxesCount += column.checkBoxes.length;
    column.checkBoxes.forEach((checkbox) => {
      if (checkbox.checkBoxDone || checkbox.checkBoxDone === 1) {
        doneCheckBoxes++;
      }
    });
  });
  console.log("done" + doneCheckBoxes + " count " + checkBoxesCount);
  if (doneCheckBoxes === 0) {
    plan.doneProcent = 0;
    console.log(plan.doneProcent);
  } else {
    plan.doneProcent = Math.round((doneCheckBoxes / checkBoxesCount) * 100);
  }
}
export default tasksReduser;
export { calculateDoneProcent };
