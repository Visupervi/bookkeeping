import { useState, useMemo, useEffect } from "react";
import { DatePicker } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import { useSelector } from "react-redux";
import Header from "@/components/Header";
import Statistic from "@/components/Statistic";
import "./index.less";

const Year = () => {

  const [visible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY");
  });
  const { billList } = useSelector((state) => state.bill);

  const [currentYear, setCurrentYear] = useState([])
  // 箭头点击函数
  const iconClickHandle = () => {
    setVisible(true);
  }

  // 根据年分组
  const yearGroup = useMemo(() => {
    // return 计算后的数据
    return _.groupBy(billList, item => dayjs(item.date).format("YYYY"));
  }, [billList]);

  // 使用useMemo计算一整年收入，支出 结余

  const yearResult = useMemo(() => {
    const pay = currentYear.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0);
    const income = currentYear.filter(item => item.type === "income").reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentDate, currentYear]);

  // 当前年按照月份来分组

  const monthGroup = useMemo(() => {
    const groupMonth = _.groupBy(currentYear, item => dayjs(item.date).format("YYYY-MM"));
    const keys = Object.keys(groupMonth);
    return {
      groupMonth,
      keys
    };

  }, [currentDate, currentYear]);
  // console.log("monthGroup", monthGroup);
  // console.log("keys", keys);
  // 时间确认回调
  const confirmHandle = (val) => {
    const formateDate = dayjs(val).format("YYYY")
    setCurrentDate(formateDate);
    if (yearGroup[formateDate]) {
      setCurrentYear(yearGroup[formateDate]);
    } else {
      setCurrentYear([]);
    }
    setVisible(false);
  }

  useEffect(() => {
    if (yearGroup[currentDate]) {
      setCurrentYear(yearGroup[currentDate]);
    }

  }, [yearGroup]);
  return (
    <div className="yearBill">
      <Header title="年度账单" backArrow={true} />
      <div className="yearContent">
        <div className="yearBillTitle">
          <span>{currentDate}年度账单</span>
          <div className="billIconWrap">
            <span className={classNames("billIcon", visible && "expand")} onClick={iconClickHandle}>
              {/* <UpOutline fontSize={16} fontWeight={600} /> */}
            </span>
          </div>

        </div>
        <div className="yearBillDetail">
          <div className="yearBillDetailItem">
            <span>{yearResult.pay}</span>
            <span>支出</span>
          </div>
          <div className="yearBillDetailItem">
            <span>{yearResult.income}</span>
            <span>收入</span>
          </div>
          <div className="yearBillDetailItem">
            <span>{yearResult.total}</span>
            <span>结余</span>
          </div>
        </div>

        <DatePicker
          className="kaDate"
          title="记账日期"
          precision="year"
          visible={visible}
          onCancel={() => setVisible(false)}
          onConfirm={val => { confirmHandle(val) }}
          onClose={() => setVisible(false)}
          max={new Date()}
        />
      </div>

      <div className="yearBillContent">
        {
          monthGroup.keys.length > 0 && monthGroup.keys.map(item => (
            <Statistic
              date={item}
              key={item}
              billList={monthGroup.groupMonth[item]}
            />
          )
          )
        }

      </div>
    </div>
  )
}

export default Year;