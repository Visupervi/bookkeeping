import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import Header from "@/components/Header";
import { UpOutline } from "antd-mobile-icons";
import { DatePicker } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Statistic from "@/components/Statistic";
import "./index.less";

const Month = () => {
  const [visible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });
  const [currentMonth, setCurrentMonth] = useState([])
  const { billList } = useSelector((state) => state.bill);

  const monthGroup = useMemo(() => {
    // return 计算后的数据
    return _.groupBy(billList, item => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  // 使用useMemo计算收入，支出 结余
  const monthResult = useMemo(() => {
    const pay = currentMonth.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0);
    const income = currentMonth.filter(item => item.type === "income").reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income
    }
    // const pay = currentMonth.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0);
  }, [currentMonth, currentDate])

  // 当前月按照日来分组
  const dayGroup = useMemo(() => {
    const groupDay = _.groupBy(currentMonth, item => dayjs(item.date).format("YYYY-MM-DD"));
    const keys = Object.keys(groupDay);
    return {
      groupDay,
      keys
    };
  }, [currentMonth, currentDate])
  // console.log("dayGroup", dayGroup);
  // 箭头点击函数
  const iconClickHandle = () => {
    setVisible(true);
  }

  // 时间确认回调
  const confirmHandle = (val) => {
    const formateDate = dayjs(val).format("YYYY-MM")
    setCurrentDate(formateDate);
    if (monthGroup[formateDate]) {
      setCurrentMonth(monthGroup[formateDate]);
    } else {
      setCurrentMonth([]);
    }
    setVisible(false);
  }
  useEffect(() => {
    if (monthGroup[currentDate]) {
      setCurrentMonth(monthGroup[currentDate]);
    }

  }, [monthGroup]);
  return (
    <div className="monthBill">
      <Header title="月度账单" backArrow={false} />
      <div className="monthContent">
        <div className="monthBillTitle">
          <span>{currentDate.split("-")[0]} | {currentDate.split("-")[1]}月账单</span>
          <div className="billIconWrap">
            <span className={classNames("billIcon", visible && "expand")} onClick={iconClickHandle}>
              {/* <UpOutline fontSize={16} fontWeight={600} /> */}
            </span>
          </div>

        </div>
        <div className="monthBillDetail">
          <div className="monthBillDetailItem">
            <span>{monthResult.pay.toFixed(2)}</span>
            <span>支出</span>
          </div>
          <div className="monthBillDetailItem">
            <span>{monthResult.income.toFixed(2)}</span>
            <span>收入</span>
          </div>
          <div className="monthBillDetailItem">
            <span>{monthResult.total.toFixed(2)}</span>
            <span>结余</span>
          </div>
        </div>

        <DatePicker
          className="kaDate"
          title="记账日期"
          precision="month"
          visible={visible}
          onCancel={() => setVisible(false)}
          onConfirm={val => { confirmHandle(val) }}
          onClose={() => setVisible(false)}
          max={new Date()}
        />
      </div>

      <div className="dayBillContent">
        {
          dayGroup.keys.length > 0 && dayGroup.keys.map(item => (
            <Statistic
              date={item}
              key={item}
              billList={dayGroup.groupDay[item]}
            />
          )
          )
        }

      </div>
    </div>
  )
}

export default Month;