import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/redux/reducers/AuthReducer";
import employeeReducer from "@/redux/reducers/employee-reducer";
import globalReducer from "@/redux/reducers/global-reducer";
import designationReducer from "../reducers/designation-reducer";
import departmentReducer from "../reducers/department-reducer";
import messageReducer from "../reducers/message-reducer";
import newsmediaReducer from "../reducers/newsmedia-reducer";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    global: globalReducer,
    employee: employeeReducer,
    designation: designationReducer,
    department: departmentReducer,
    message: messageReducer,
    newsmedia: newsmediaReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
