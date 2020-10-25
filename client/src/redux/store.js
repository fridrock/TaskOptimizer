import { createStore } from "redux";

import tasksReduser from "./taskReducer";
let store = createStore(tasksReduser);

export default store;
