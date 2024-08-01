import { useState } from "react";
import { Button, DatePicker, Input } from "antd-mobile";
import classNames from "classnames";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { useDate } from "@/hooks/useDate";
import { billListData } from '@/constants';
import { addBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import "./index.less";
const New = () => {
  const [money, setMoney] = useState('');
  const [billType, setBillType] = useState('pay');
  const [selectedBillType, setSelectedBillType] = useState('');
  const { visible, dateText, onShowDate, onHideDate, onDateChange } = useDate();
  const dispatch = useDispatch();

  // 输入框change事件

  const changeHandle = (value) => {
    setMoney(value);
  }
  // 保存账单
  const saveBillHandle = () => {
    const data = {
      type: billType,
      money: billType === "pay" ? -money : +money,
      date: dateText === '今天'
      ? dayjs()
      : dayjs(`${dateText} ${dayjs().format('HH:mm:ss')}`),
      useFor: selectedBillType
    }
    dispatch(addBillList(data));
    // console.log("dateText", dateText);
  }
  return (
    <div className="keepAccount">
      <div className="header-wrap">
        <Header className="nav" backArrow={true} title="记一笔" />
      </div>
      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => {setBillType('pay')}}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => {setBillType('income')}}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={onShowDate}>
              <Icon type="calender" className="icon" />
              <span className="text">{dateText}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                visible={visible}
                onClose={onHideDate}
                max={new Date()}
                onConfirm={onDateChange}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={changeHandle}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        selectedBillType === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setSelectedBillType(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBillHandle}>
          保 存
        </Button>
      </div>
    </div>
  );
}

export default New;