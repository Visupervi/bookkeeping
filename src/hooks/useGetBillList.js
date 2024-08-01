import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { fetchBillList } from "@/store/modules/billStore";
import { useAppDispatch } from "@/store";
const url = "http://geek.itheima.net/v1_0/channels";
export default () => {
  // const [list, setList] = useState([]);
  const flag = useRef(true);
  const dispatch = useAppDispatch();
  // const getList = async () => {
  //   const { data: { data: { channels } } } = await axios.get(url);
  //   setList(channels);
  // };
  useEffect(() => {
    if (flag.current) {
      // getList();
      dispatch(fetchBillList());
      flag.current = false;
      return;
    }

  }, [dispatch]);
  // return {
  //   list,
  //   setList,
  //   // getList
  // };
};