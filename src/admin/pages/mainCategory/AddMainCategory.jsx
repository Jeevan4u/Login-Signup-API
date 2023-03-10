import React from 'react'

export default function AddMainCategory() {
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
  const columns = [
    { accessor: 'sn', label: 'SNO' },

    { accessor: 'mainCategory', label: 'MAIN CATEGORY NAME' },

    { accessor: 'action', label: 'ACTION' },
  ]
  const rows = [
    {
      sn: '1',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'MOMO',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '2',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'NEPALI SET',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '3',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'BURGER',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '4',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '5',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '6',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '7',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '8',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '9',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '10',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
  ]
  const additionalTableData = {
    buttonName: 'ADD CATEGORY',
  }
  return <div>AddMainCategory</div>
}
