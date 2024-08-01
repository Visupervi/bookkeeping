import { createSlice } from "@reduxjs/toolkit";

export const tabBarStore = createSlice({
  name: "tabBar",
  initialState: {
    activityKey: localStorage.getItem("tabBarActivity") || "/month"
  },
  reducers: {
    // 同步修改的方法
    setActivityKey(state, { payload }) {
      // console.log("payload", payload)
      localStorage.setItem("tabBarActivity", payload)
      state.activityKey = payload;

    }
  }
});

const { setActivityKey } = tabBarStore.actions;

export { setActivityKey };
// 导出reducer
export default tabBarStore.reducer;