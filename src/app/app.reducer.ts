import { AnyAction, createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { authThunks } from "features/auth/model/auth.slice";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    // setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
    //   state.isInitialized = action.payload.isInitialized;
    // }
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action) => {
      state.status = "loading";
    })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        console.log(action);
        state.status = "failed";
        if (action.payload) {
          if (action.type === todolistsThunks.addTodolist.rejected.type || action.type === tasksThunks.addTask.rejected.type || action.type === authThunks.initializeApp.rejected.type) return;
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some Error occurred";
        }
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected), (state, action) => {
        state.isInitialized = true
      });
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
