import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/Layout/Sidebar'
import Header from '../../Components/Layout/Header'
import homeSvg from '../../assets/images/homeSvg.svg'
import { useSelector } from 'react-redux'
import Loader from '../../Components/Loader'
import { useDispatch } from 'react-redux'
import { gettingItem } from '../../features/slice/item/itemSlice'
import { gettingTable } from '../../features/slice/tableSlice/tableSlice'
export default function OrderDashboardMain() {
  const dispatch = useDispatch()
  const { userToken } = useSelector((state) => state.auth)
  const { itemList } = useSelector((state) => state.item)
  const { tableData } = useSelector((state) => state.table)
  const navigate = useNavigate()
  useEffect(() => {
    if (userToken === null) {
      navigate('/')
    }
  }, [userToken])
  useEffect(() => {
    dispatch(gettingItem())
    dispatch(gettingTable())
  }, [userToken])
  const sidebarList = [
    {
      id: 1,
      active: true,
      title: 'Home',
      link: '/orderDashboard',
      image: homeSvg,
    },
    {
      id: 2,
      active: false,
      title: 'Order',
      link: '/orderDashboard/order',
      image: homeSvg,
    },
    // {
    //   id: 3,
    //   active: false,
    //   title: 'Add Items',
    //   link: '/orderDashboard/addItem',
    //   image: homeSvg,
    // },
    // {
    //   id: 3,
    //   active: false,
    //   title: "Bulk Notification",
    //   link: "/orderDashboard",
    //   image: homeSvg,
    // },
    // {
    //   id: 4,
    //   active: false,
    //   title: "Insights",
    //   link: "/orderDashboard",
    //   image: homeSvg,
    // },
    // {
    //   id: 5,
    //   active: false,
    //   title: "Events",
    //   link: "/orderDashboard",
    //   image: homeSvg,
    // },
    // {
    //   id: 6,
    //   active: false,
    //   title: "Finance",
    //   link: "/orderDashboard",
    //   image: homeSvg,
    // },
    // {
    //   id: 7,
    //   active: false,
    //   title: "Settings",
    //   link: "/orderDashboard",
    //   image: homeSvg,
    // },
  ]
  if (!itemList || !tableData) {
    return <Loader />
  }

  return (
    <>
      <Sidebar sidebarList={sidebarList} />
      <div className="ml-[280px]">
        <Header bgColor="bg-[#0d9544]" />
        <div className="px-[36px]  ">
          <div className="grid grid-cols-4 gap-8 w-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
