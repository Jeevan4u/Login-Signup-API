import React, { useState, useMemo, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import search from '../../assets/images/greenSearch.svg'
import edit from '../../assets/images/editPenSvg.svg'
import cross from '../../assets/images/crossSvg.svg'
import { filterRows, paginateRows } from '../../utils/helper'
import Pagination from '../Pagination/Pagination'
export default function Table({ columns, rows, additionalTableData }) {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState(1)
  const [rowsPerPage, setrowsPerPage] = useState(100)
  const [filters, setFilters] = useState({})
  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const calculatedRows = paginateRows(filteredRows, activePage, rowsPerPage)
  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)
  const handleSearch = (value, accessor) => {
    setActivePage(1)
    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]
        return updatedFilters
      })
    }
  }

  return (
    <div className="w-full ">
      <div className="searchContainer flex justify-between mb-[40px]">
        <input
          type="text"
          placeholder="SEARCH ITEMS "
          className="px-[14px] border-[1px] w-[300px] rounded-[8px] text-[#7d94a8] "
          onChange={(event) =>
            handleSearch(event.target.value, additionalTableData.searchAccessor)
          }
        />
        <button
          className="btn-primary"
          onClick={() => navigate(additionalTableData?.buttonLink)}
        >
          {additionalTableData.buttonName}
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="">
            {columns.map((column, index) => (
              <th
                className="text-[#7d94a8] text-start py-2 font-old text-[15px] "
                key={index}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => {
                if (column.accessor === 'action') {
                  return (
                    <td
                      className={`text-[#7d94a8] py-2 text-[14px] ${
                        index % 2 == 0 && 'bg-[#dce0e6]'
                      } `}
                      key={index}
                    >
                      <div className="flex items-center gap-3">
                        <div className="icon1 cursor-pointer w-[24px] ">
                          <img src={search} alt="" />
                        </div>
                        <div
                          className="icon1 cursor-pointer w-[20px]"
                          onClick={() => {
                            navigate(`./edit/${row['id']}`)
                          }}
                        >
                          <img src={edit} alt="" />
                        </div>
                        <div className="icon1 cursor-pointer w-[20px]">
                          <img src={cross} alt="" />
                        </div>
                      </div>
                    </td>
                  )
                }
                if (column.accessor === 'auto') {
                  return (
                    <td
                      className={`text-[#7d94a8] py-2 text-[14px] ${
                        index % 2 == 0 && 'bg-[#dce0e6]'
                      } ${column?.bold && 'font-semibold'}`}
                    >
                      {index + 1}
                    </td>
                  )
                }
                return (
                  <td
                    className={`text-[#7d94a8] py-2 text-[14px] ${
                      index % 2 == 0 && 'bg-[#dce0e6]'
                    } ${column?.bold && 'font-semibold'}`}
                  >
                    {row[column.accessor]}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination
        activePage={activePage}
        count={count}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      /> */}
    </div>
  )
}
