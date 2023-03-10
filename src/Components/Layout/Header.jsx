import React from 'react'
import hamburger from '../../assets/images/menu-hamburger.svg'
import searchSvg from '../../assets/images/search.svg'
import notificatioSvg from '../../assets/images/notificationSvg.svg'
import avatar from '../../assets/images/avatar.png'
import SmallCard from '../../Components/Card/SmallCard'
import { logout } from '../../features/slice/auth/authSlice'
import { useDispatch } from 'react-redux'
export default function Header({ bgColor }) {
  const dispatch = useDispatch()
  const smallCardData = [
    { title: 'TOTAL SALES', number: 5000 },
    { title: 'TOTAL INVOICE', number: 100 },
    { title: 'TOTAL ITEM', number: 250 },
    {
      title: 'ORDER',
      additional: {
        subTitle1: 'BOT',
        subNumber1: 20,
        subTitle2: 'KOT',
        subNumber2: 50,
      },
      bgColor: 'bg-[#f8ee30]',
    },
  ]
  return (
    <div className={` p-[20px] mb-[80px] ${bgColor}`}>
      <div className="headerTop  flex justify-between items-center mb-[20px]">
        <div className="flex items-center gap-3">
          <div className="w-[40px]">
            <img src={hamburger} alt="" />
          </div>
          <div className="relative  rounded-3xl overflow-hidden h-[100%] ">
            <div className="pointer-events-none absolute  left-1 top-[4.5px] flex items-center pl-0">
              <span className="w-[28px]">
                <img src={searchSvg} alt="" />
              </span>
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 pl-8 pr-12  sm:text-sm h-[34px] bg-[#5588c7]"
              placeholder="Type in to Search..."
            />
          </div>
        </div>

        <div className="flex gap-[6px] items-center group">
          <div className="w-[24px] mr-[16px]">
            <img src={notificatioSvg} alt="" />
          </div>
          <div className="w-[28px] h-[28px] rounded-[50%] overflow-hidden">
            <img src={avatar} alt="" />
          </div>
          <p className="text-[12px] text-white">
            Hello, <span className="font-medium">Arjun Larry</span>
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <div className="">
            <ul
              className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ease-in-out duration-300 -translate-y-96 opacity-0 group-hover:opacity-100 group-hover:translate-y-4"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              {/* <li
                className="text-gray-700 font-semibold block p-4 text-sm cursor-pointer transition duration-500 ease-in-out first:rounded-t-md last:rounded-b-md hover:bg-indigo-800 hover:text-white hover:cursor-pointer hover:shadow-md"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                Account settings
              </li> */}
              <li
                className="text-gray-700 font-semibold block p-4 text-sm cursor-pointer transition duration-500 ease-in-out first:rounded-t-md last:rounded-b-md hover:bg-indigo-800 hover:text-white hover:cursor-pointer hover:shadow-md"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-1"
                onClick={() => {
                  dispatch(logout())
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="relative pb-[50px]">
          <div>
            <h1 className="font-medium text-[30px] text-white">Dashboard</h1>
            <h2 className="font-medium text-[20px] text-white">
              Daily Analytics
            </h2>
          </div>
          <div className="grid grid-cols-4  gap-8 absolute w-full bottom-0 translate-y-[70%] scrollbarHide items-stretch ">
            {smallCardData.map((item, index) => (
              <div className="col-span-1" key={index}>
                <SmallCard card={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
