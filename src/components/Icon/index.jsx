// const BASE_URL = '../../assets/'
import calender from "../../assets/calender.svg";
import taxi from "../../assets/taxi.svg";
import dessert from "../../assets/dessert.svg";
import longdistance from "../../assets/longdistance.svg";
import travel from "../../assets/travel.svg";
import bodybuilding from "../../assets/bodybuilding.svg";
import game from "../../assets/game.svg";
import audio from "../../assets/audio.svg";
import community from "../../assets/community.svg";
import food from "../../assets/food.svg";
import clothes from "../../assets/clothes.svg";
import bag from "../../assets/bag.svg";
import book from "../../assets/book.svg";
import promote from "../../assets/promote.svg";
import home from "../../assets/home.svg";
import salary from "../../assets/salary.svg";
import drinks from "../../assets/drinks.svg";
import overtimepay from "../../assets/overtimepay.svg";
import bonus from "../../assets/bonus.svg";
import financial from "../../assets/financial.svg";
import cashgift from "../../assets/cashgift.svg";

const icons = {
  calender,
  taxi,
  longdistance,
  travel,
  bodybuilding,
  game,
  audio,
  community,
  food,
  clothes,
  bag,
  book,
  promote,
  home,
  salary,
  drinks,
  overtimepay,
  bonus,
  cashgift,
  financial,
  dessert
}
const Icon = ({ type, className, onClick }) => {
  // console.log("type", type)

  return (
    <img
      onClick={onClick}
      className={className}
      src={icons[type]}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }}
    />
  )
}

export default Icon
