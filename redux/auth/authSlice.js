import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false, // Add a flag to track authentication status
};

// Async action to check the authentication status
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("access_token"); // Get token from sessionStorage

      if (!token) {
        throw new Error("No token found");
      }

      // API call to verify the token (you can replace this URL with your actual endpoint)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-token`,
        {
          method: "POST",
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

      // Return user data if token is valid
      return { user: data.user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true; // Set user as authenticated
    },
    signupSuccess: (state, { payload }) => {
      state.user = payload.user; // Only set the user, token stays null
      state.isAuthenticated = false; // Not authenticated immediately after signup
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Reset authentication status
      sessionStorage.removeItem("access_token"); // Optionally remove token from sessionStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset any previous errors
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
        state.error = payload; // Store the error message
      });
  },
});

// Export actions and reducer
export const { loginSuccess, signupSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
