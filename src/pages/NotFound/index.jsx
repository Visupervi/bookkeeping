import { ResultPage } from 'antd-mobile'
const NotFound = () => {
  return (
    <ResultPage
      status='waiting'
      title='页面地址不存在'
      description='请重新输入地址'
    />
  );
};

export default NotFound;