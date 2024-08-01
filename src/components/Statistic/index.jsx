import { useMemo, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import "./index.less";
import { billTypeToName } from "@/constants"
export default (props) => {
  const { date, billList } = props;
  // console.log("date", date);
  // console.log("billList", billList);

  // const dayResult = 
  const [expand, setExpand] = useState(false)
  const result = useMemo(() => {
    const pay = billList.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0);
    const income = billList.filter(item => item.type === "income").reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income
    }
  }, [billList])
  return (
    <div className={classNames('dailyBill')}>
      <div className="billHeader">
        <div className="dateIcon" onClick={() => setExpand(!expand)}>
          <span className="date">{date}</span>
          <span className={classNames("billIcon", expand && 'expand')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{result.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{result.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{result.income.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>

      {
        expand && (
          <div className="billList">
            {billList.map(item => {
              return (
                <div className="bill" key={item.id}>
                  <div className="icon">
                    <Icon type={item.useFor} />
                  </div>
                  <div className="detail">
                    <div className="billType">{billTypeToName[item.useFor]}</div>
                  </div>
                  <div className={classNames('money', item.type)}>
                    {item.money.toFixed(2)}
                  </div>
                </div>
              )
            })}
          </div>
        )
      }

    </div>
  )
}