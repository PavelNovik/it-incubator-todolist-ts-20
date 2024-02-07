import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "features/auth/api/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";
import { LoginParamsType } from "../ui/login/login";

const login = createAppAsyncThunk<{
  isLoggedIn: boolean
}, LoginParamsType>("auth/login", async (arg, { rejectWithValue }) => {
  const res = await authAPI.login(arg);
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    // const isShowAppError = !res.data.fieldsErrors.length;
    // handleServerAppError(res.data, dispatch, isShowAppError);
    return rejectWithValue(res.data);
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(res.data);
  }
});

// const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
//   "app/initializeApp",
//   async (_, { rejectWithValue }) => {
//     const res = await authAPI.me();
//     if (res.data.resultCode === ResultCode.Success) {
//       return { isLoggedIn: true };
//     } else {
//       return rejectWithValue(res.data);
//     }
//   },
// );

const initializeApp = createAppAsyncThunk<{
  isLoggedIn: boolean
}, void>("auth/initializeApp", async (_, { rejectWithValue }) => {
  const res = await authAPI.me();
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }

// .finally(() => {
//     dispatch(appActions.setAppInitialized({ isInitialized: true }));
//   });
});

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        });

  }
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
