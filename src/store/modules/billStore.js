import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Toast } from "antd-mobile";

const url = "http://localhost:9966/ka";
export const billStore = createSlice({
  name: "billList",
  initialState: {
    billList: []
  },
  reducers: {
    // 同步修改的方法
    setBillList(state, { payload }) {
      // console.log("payload", payload)
      state.billList = payload;
    },
    // 添加billData
    addBill(state, { payload }) {
      state.billList.push(payload);
    }
  }
});

// 解构actionCreater函数

const { setBillList, addBill } = billStore.actions;

// 导出reducer
export default billStore.reducer;

export { setBillList };
// 异步请求部分
const fetchBillList = () => async (dispach) => {
  const { data } = await axios.get(url);
  // console.log("data", data);
  dispach(setBillList(data));
};

const addBillList = (param) => async (dispach) => {
  const {status, data}= await axios.post(url, param);
  // console.log("res", res);
  if(status === 201) {
    Toast.show({
      content: '成功添加一笔记账',
    })
    dispach(addBill(data));
  }
  
}

export { fetchBillList, addBillList }