import React, { useEffect, useState } from "react";
import homeSvg from "../../assets/images/homeSvg.svg";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar({ sidebarList }) {
  const location = useLocation();
  const [active, setActive] = useState("");
  console.log(location.pathname.split("/"));

  useEffect(() => {
    if (location.pathname.split("/").length < 3) {
      setActive(1);
    } else {
      sidebarList.map(
        (item) =>
          item.title.toLowerCase() === location.pathname.split("/")[2] &&
          setActive(item.id)
      );
    }
  }, []);
  return (
    <div className="absolute left-0 top-0 max-w-full w-[280px] bg-[#f6fcfe] min-h-[100vh] pl-[2px] h-full">
      <div className="sidebarTop h-[225px] flex items-center justify-center w-full">
        <div className=" ">
          <h1 className="text-center text-[60px] leading-[70px] text-[#262c65]">
            RMS
          </h1>
          <ul className=" flex gap-[10px] ">
            <li className="text-[#262c65]">Bill</li>
            <li className=" before:bg-[#262c65] text-[#262c65] before:rounded-[50%] before:overflow-hidden before:w-[3px] before:absolute before:top-[50%] before:left-[-10%] before:h-[3px] before:bg-black before:absolute before:left-2 relative  rounded-[50%]">
              Inventory
            </li>
            <li className="before:bg-[#262c65] text-[#262c65] before:rounded-[50%] before:overflow-hidden before:w-[3px] before:absolute before:top-[50%] before:left-[-10%] before:h-[3px] before:bg-black before:absolute before:left-2 relative  rounded-[50%]">
              Analytics
            </li>
          </ul>
        </div>
      </div>
      <div className="sideList ">
        <ul>
          {sidebarList.map((item, index) => (
            <li className="" key={index}>
              <Link
                to={item.link}
                aria-current={active == item.id ? true : false}
                className="flex items-center  py-5 px-4 gap-[10px] text-[20px] border-l-transparent  border-l-[8px] hover:border-l-[#0d9544] hover:bg-[#d8ecd8] hover:font-bold aria-[current=true]:font-bold aria-[current=true]:bg-[#d8ecd8] aria-[current=true]:border-l-[#0d9544]"
                onClick={() => setActive(item.id)}
              >
                <div className="w-[24px]">
                  <img src={item.image} alt="" />
                </div>
                <p className="text-[#7d94a8] ">{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
