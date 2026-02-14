import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string;
    name: string;
    role: "engineer" | "lead";
  };
}

const initialState: AuthState = {
  user: {
    id: "1",
    name: "Aniket",
    role: "engineer", // change to "lead" to test
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
