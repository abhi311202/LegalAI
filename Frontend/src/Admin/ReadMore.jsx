import React from "react";

function ReadMore({ doc }) {
  return (
    <>
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Read More<i class="fa-solid fa-arrow-right"></i>
        </button>
        <dialog id="my_modal_3" className="modal dark:bg-black dark:text-white">
          <div className="modal-box w-11/12 max-w-7xl text-black dark:bg-[#222] dark:text-stone-50">
            <div className="p-10 ">
                <h1>{doc.title}</h1>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default ReadMore;
