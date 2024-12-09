import React from "react";
import { useAuth } from "../context/AuthProvider";
import Login from "../components/Login";
const handleClick1 = () => {
  window.location.href = "../ChatPage/DocumentSummarization";
};
const handleClick2 = () => {
  window.location.href = "../ChatPage/DocumentClassification";
};

const handle3 = () => {
  document.getElementById("Login1").showModal();
};

function Content1() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <> 
      <hr className="my-20"></hr>
      <div className="max-w-screen-xl container mx-auto md:px-20 px-4">
        <div className="flex w-full flex-col lg:flex-row gap-5">
          <div
            onClick={authUser ? handleClick1 : handle3}
            className="relative cursor-pointer card bg-black opacity-90 hover:opacity-100 hover:shadow-xl hover:shadow-slate-600 text-white rounded-box grid h-96 md:w-1/2 flex-grow place-items-center bg-[url('https://img.freepik.com/premium-photo/checklist-complete-online-evaluation-questionnaire-digital-form-checklist_539854-2950.jpg?w=1380')] bg-center-bottom"
          >
            <h1 className="text-4xl text-white font-bold">Summarization</h1>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div
            onClick={authUser ? handleClick2 : handle3}
            className="cursor-pointer card bg-black opacity-90 hover:opacity-100 hover:shadow-xl hover:shadow-slate-600 text-white rounded-box grid h-96 md:w-1/2 flex-grow place-items-center bg-[url('https://img.freepik.com/premium-photo/businessman-pressing-multimedia-type-modern-buttons-with-virtual-background-document-management-system-dms-searching-managing-corporate-files-information_1210714-482.jpg?w=1060')] bg-left-bottom"
          >
            <h1 className="text-4xl text-white font-bold opacity-100">Classification</h1>
          </div>
        </div>
      </div>
      <Login />
    </>
  );
}

export default Content1;
