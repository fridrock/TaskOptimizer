import { createStore } from "redux";
import renderTree from "../index";
import tasksReduser from "./taskReducer";
let store = createStore(tasksReduser);
let addPlanCreator = function (plan) {
  return {
    type: "ADD_PLAN",
    plan: plan,
  };
};
store.subscribe(() => renderTree());
export { store };
export { addPlanCreator };
