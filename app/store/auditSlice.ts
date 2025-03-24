// app/store/auditSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuditState {
  auditsLeft: number;
}

const initialState: AuditState = {
  auditsLeft: 4, // Initial value
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    decrementAudit: (state) => {
      if (state.auditsLeft > 0) {
        state.auditsLeft -= 1;
      }
    },
    resetAudits: (state) => {
      state.auditsLeft = 4; // Reset to the initial value
    },
  },
});

export const { decrementAudit, resetAudits } = auditSlice.actions;
export default auditSlice.reducer;
