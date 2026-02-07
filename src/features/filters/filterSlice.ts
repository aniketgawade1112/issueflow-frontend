import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IssueStatus } from "../issues/issueTypes";

interface FilterState {
  status: IssueStatus | "all";
}

const initialState: FilterState = {
  status: "all",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<IssueStatus | "all">) => {
      state.status = action.payload;
    },
  },
});

export const { setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
