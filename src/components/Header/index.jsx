import { LeftOutline } from "antd-mobile-icons";
import "./index.less";
import { useNavigate } from "react-router-dom";
export default (props) => {
  const navigate = useNavigate();
  const { title, backArrow } = props;
  const backClickHandle = () => {
    // console.log("active")
    navigate(-1);
  }
  return (
    <div className="bill-header">
      {backArrow && (
        <div className="backArrow" onClick={backClickHandle}>
          <LeftOutline />
        </div>
      )}
      {title}
    </div>
  )
}