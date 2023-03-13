import React from "react";

const Table = ({ data }) => {
  console.log(data);
  return (
    <div className="Table mx-2 my-5 grid ">
      <table className="border-black border-separate border-spacing-1 ">
        <thead className="bg-green-600">
          <tr className="[&>th]:border-black [&>th]:border-[2px] ">
            <th>id</th>
            <th>name</th>
            <th>status</th>
          </tr>
        </thead>
        {data?.map((items, i) => (
          <tbody className="border-border-[2px]">
            <tr className="text-center [&>td]:border-black [&>td]:border-[2px] [&>td]:bg-green-300 [&>td]:p-2 [&>td>.para]:border-black [&>td>p]:border-[2px]">
              <td>{items.id}</td>
              <td>{items.name}</td>
              <td>
                {items.status}
                <p className="para">sad</p>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Table;
