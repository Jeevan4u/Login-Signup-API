import React, { useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Loader from '../../Components/Loader'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/Layout/Sidebar'
import Header from '../../Components/Layout/Header'
import homeSvg from '../../assets/images/homeSvg.svg'
import { useSelector, useDispatch } from 'react-redux'
import {
  mainCategoryGetting,
  subCategoryGetting,
} from '../../features/slice/category/categorySlice'
import {
  resetState,
  resetMainCategory,
} from '../../features/slice/category/categorySlice'

export default function DashboardMain() {
  const { userToken } = useSelector((state) => state.auth)
  const {
    subCategoryList,
    mainCategoryList,
    success,
    gettingCategorySuccess,
  } = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userToken === null) {
      navigate('/')
    }
  }, [userToken])
  useEffect(() => {
    dispatch(mainCategoryGetting())
    dispatch(subCategoryGetting())
  }, [userToken])
  useEffect(() => {
    if (gettingCategorySuccess) {
      dispatch(resetMainCategory())
    }
    if (gettingCategorySuccess) {
      dispatch(resetMainCategory())
    }
  }, [success, gettingCategorySuccess])
  const smallCardData = [
    {
      title: 'TOTAL BOOKED',
      number: 8,
      bgColor: 'bg-[#f7941d]',
      color: 'text-white',
    },
    {
      title: 'VACANT TABLE',
      number: 22,
      bgColor: 'bg-[#39b54a]',
      color: 'text-white',
    },
    {
      title: 'SERVING',
      number: 10,
      bgColor: 'bg-[#bfe5e4]',
    },
    {
      title: 'COOKING',
      number: 12,
      bgColor: 'bg-[#bfe5e4]',
    },
    { title: 'QUE', number: 5, bgColor: 'bg-[#bfe5e4]' },
    {
      title: 'SERVED TODAY',
      number: 50,
      bgColor: 'bg-[#bfe5e4]',
    },
  ]
  const sidebarList = [
    { id: 1, active: true, title: 'Home', link: '/admin', image: homeSvg },
    {
      id: 2,
      active: false,
      title: 'Table',
      link: '/admin/table',
      image: homeSvg,
    },
    // {
    //   id: 3,
    //   active: false,
    //   title: 'Add Items',
    //   link: '/admin/addItem',
    //   image: homeSvg,
    // },
    {
      id: 3,
      active: false,
      title: 'Items',
      link: '/admin/items',
      image: homeSvg,
    },
    {
      id: 4,
      active: false,
      title: 'Main Category',
      link: '/admin/mainCategory',
      image: homeSvg,
    },
    {
      id: 5,
      active: false,
      title: 'Sub Category',
      link: '/admin/subCategory',
      image: homeSvg,
    },
    {
      id: 6,
      active: false,
      title: 'Bulk Notification',
      link: '/admin',
      image: homeSvg,
    },
    { id: 7, active: false, title: 'Insights', link: '/admin', image: homeSvg },
    { id: 8, active: false, title: 'Events', link: '/admin', image: homeSvg },
    { id: 9, active: false, title: 'Finance', link: '/admin', image: homeSvg },
    {
      id: 10,
      active: false,
      title: 'Settings',
      link: '/admin',
      image: homeSvg,
    },
  ]
  if (!subCategoryList || !mainCategoryList) {
    return <Loader />
  }
  return (
    <>
      <Sidebar sidebarList={sidebarList} />
      <div className="ml-[280px]">
        <Header bgColor="bg-[#1676bc]" />
        <div className="px-[36px]">
          <div className="grid grid-cols-4 gap-8 w-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
