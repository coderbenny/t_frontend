import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  user: null, // Holds the user details like email, name, id, phone, etc.
  token: null, // Stores the access token
  loading: false, // Tracks the loading state of async actions
  error: null, // Holds any error messages
  isAuthenticated: false, // Tracks whether the user is authenticated
};

// Async action to check the authentication status
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("access_token");

      if (!token) {
        throw new Error("No token found");
      }

      // API call to verify the token and fetch user details
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/whoami`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Token verification failed");
      }

      // Return user data and token if successful
      return { user: data, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    signupSuccess: (state, { payload }) => {
      state.user = payload.user;
      state.token = null;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = payload;
      });
  },
});

// Export actions and reducer
export const { loginSuccess, signupSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
