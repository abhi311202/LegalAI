import React from "react";

function Cards({ item }) {
  //   console.log(item);
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card bg-base-100 w-92 shadow-xl hover:scale-105 duration-200 dark:bg-[#222] dark:text-white dark:border p-5">
          <figure className="">
            <img src={item.image} alt="Loading..." className="size-96 rounded-xl" />
          </figure>
          <div className="card-body text-center py-0 pt-4 ">
            <h2 className="text-center font-bold text-lg">
              {item.name}
              {/* <div className="badge badge-secondary">{item.category}</div> */}
            </h2>
            <p className="text-lg">{item.title}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
