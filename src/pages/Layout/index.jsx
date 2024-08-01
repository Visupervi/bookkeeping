import { Outlet, useNavigate } from "react-router-dom";
import useGetBillList from "@/hooks/useGetBillList";
import { useLocation } from "react-router-dom";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from "antd-mobile-icons";

import { TabBar } from "antd-mobile";
import "./index.less";
import { useEffect, useState } from "react";
const tabs = [
  {
    key: '/month',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度',
    icon: <CalculatorOutline />,
  }
]
const Layout = () => {
  useGetBillList();
  const navigate = useNavigate();
  const location = useLocation();
  // const { activityKey } = useSelector(state => state.tabBar)
  const [activityKey, setActivityKey] = useState(location.pathname)
  const switchHandle = (path) => {
    navigate(path);
  }

  useEffect(() => {
    setActivityKey(location.pathname);
  }, [location])
  return (
    <div className="layout">
      <div className="container">
        <Outlet></Outlet>
      </div>
      <div className="footer">
        <TabBar onChange={switchHandle} activeKey={activityKey}>
          {tabs.map(item => (<TabBar.Item key={item.key} icon={item.icon} title={item.title} />)
          )}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout;