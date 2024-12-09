import React from "react";
import { useAuth } from "../context/AuthProvider";
import Login from "../components/Login";

const Download = () => {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  const handleDownload1 = () => {
    // https://drive.google.com/file/d/1Se926U28J5JSvJM--JHwy2j3TszIgWwK/view?usp=sharing
    const fileId = "1Se926U28J5JSvJM--JHwy2j3TszIgWwK"; // Replace with your file ID
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "PlanOfWork.pdf"); // Optional: set the downloaded file's name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <hr className="my-20"></hr>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 p-5">
        <h1 className="mb-20 text-4xl font-bold text-center">
          Legal AI Documents
        </h1>
        <div class="flex flex-row justify-around text-center text-white">
          <div
            className="cursor-pointer basis-1/4 bg-black p-10 rounded-xl opacity-90 hover:opacity-100 hover:shadow-xl hover:shadow-slate-600 dark:bg-base-100 dark:text-black"
            // onClick={handleDownload1}
            onClick={
              authUser
                ? handleDownload1
                : () => document.getElementById("Login1").showModal()
            }
          >
            Plan of Work
          </div>
          <div
            className="cursor-pointer basis-1/4 bg-black p-10 rounded-xl opacity-90 hover:opacity-100 hover:shadow-xl hover:shadow-slate-600 dark:bg-base-100 dark:text-black"
            // onClick={() => document.getElementById("my_modal_4").showModal()}
            onClick={
              authUser
                ? () => document.getElementById("my_modal_4").showModal()
                : () => document.getElementById("Login1").showModal()
            }
          >
            Progress Report
          </div>
          <div
            className="cursor-pointer basis-1/4 bg-black p-10 rounded-xl opacity-90 hover:opacity-100 hover:shadow-xl hover:shadow-slate-600 dark:bg-base-100 dark:text-black"
            // onClick={() => document.getElementById("my_modal_4").showModal()}
            onClick={
              authUser
                ? () => document.getElementById("my_modal_4").showModal()
                : () => document.getElementById("Login1").showModal()
            }
          >
            Final Presentation
          </div>
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black ">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-red-600">
              Not Yet Uploaded...
            </h3>
            {/* <p className="py-4 text-black">
                Not Yet Uploaded...
                </p> */}
          </div>
        </dialog>
        {/* <Login /> */}
      </div>
    </>
  );
};

export default Download;
