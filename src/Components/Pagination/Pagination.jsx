import React from "react";

export default function Pagination(
  {
    //   activePage,
    //   count,
    //   rowsPerPage,
    //   totalPages,
    //   setActivePage,
  }
) {
  const activePage = 5;
  const count = 2;
  const totalPages = 20;
  const setActivePage = 6;
  const checkSmallPageNoToShow = (page) => {
    return activePage - page < 3 ? true : false;
  };
  const checkLargePageNoToShow = (page) => {
    return page - activePage < 3 ? true : false;
  };
  return (
    <ul className="inline-flex items-center -space-x-px">
      <li>
        <span className="sr-only">Previous</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5 cursor-pointer"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </li>
      {/* {activePage - 3 > 1 && <li>...</li>} */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (item) => {
          if (item < activePage) {
            return (
              <>
                {checkSmallPageNoToShow(item) && (
                  <li className="text-[12px]  cursor-pointer px-1">{item}</li>
                )}
              </>
            );
          }
          if (item > activePage) {
            return (
              <>
                {checkLargePageNoToShow(item) && (
                  <li className="text-[12px]  cursor-pointer px-1">{item}</li>
                )}
              </>
            );
          }

          {
            item === activePage && (
              <li className="text-[12px]  cursor-pointer px-1">{item}</li>
            );
          }
        }
      )}
      {activePage + 3 < totalPages && <li>...</li>}

      <li>
        <span className="sr-only">Next</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </li>
    </ul>
  );
}
