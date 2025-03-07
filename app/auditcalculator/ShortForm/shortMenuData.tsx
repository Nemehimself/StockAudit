import { IoRestaurant } from "react-icons/io5";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaHotel } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { TiMediaPlay } from "react-icons/ti";
import Restaurants from "./Restaurants";
import Retail from "./Retail";
import Hotel from "./Hotel";
import ServiceProvider from "./ServiceProvider";
import Media from "./Media";
import Manufacturing from "./Manufacturing";

const groups = ["GroupA", "GroupB", "GroupC", "GroupD"];

const shortMenuItems = [
  {
    label: "Restaurants",
    icon: () => IoRestaurant,
    bg: "bg-red-500",
    image: "/StockAudit/restaurants.jpeg",
    component: <Restaurants selectedGroup="GroupA" activeCategory={null} setActiveCategory={() => {}} />,
    subItems: groups,
  },
  {
    label: "Retail",
    icon: BsShop,
    bg: "bg-blue-500",
    image: "/StockAudit/retail.jpeg",
    component: <Retail selectedGroup="GroupA" activeCategory={null} setActiveCategory={() => {}} />,
    subItems: groups,
  },
  {
    label: "Hotel",
    icon: FaHotel,
    bg: "bg-lime-500",
    image: "/StockAudit/hotel.jpeg",
    component: <Hotel selectedGroup="GroupA" activeCategory={null} setActiveCategory={() => {}} />,
    subItems: groups,
  },
  {
    label: "Service Provider",
    icon: MdMiscellaneousServices,
    bg: "bg-purple-500",
    image: "/StockAudit/serviceprovider.jpeg",
    component: <ServiceProvider selectedGroup="GroupA" activeCategory={null} setActiveCategory={() => {}} />,
    subItems: groups,
  },
  {
    label: "Media",
    icon: TiMediaPlay,
    bg: "bg-yellow-500",
    image: "/StockAudit/media.jpeg",
    component: <Media selectedGroup="GroupA" activeCategory={null} setActiveCategory={() => {}} />,
    subItems: groups,
  },
  {
    label: "Manufacturing",
    icon: FaTools,
    bg: "bg-gray-500",
    image: "/StockAudit/manufacturing.jpeg",
    component: <Manufacturing selectedGroup="GroupA" activeCategory={null} setActiveCategory={() => {}} />,
    subItems: groups,
  },
];

export default shortMenuItems;
