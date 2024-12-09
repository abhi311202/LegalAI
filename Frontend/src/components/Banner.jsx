import React from "react";
import { ArrowLongRightIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Login from "./Login";

const Banner = () => {
  return (
    <>
      <hr className="my-20"></hr>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col-reverse md:flex-row gap-x-5 md:gap-x-20">
        <div className="w-full md:w-1/2">
          {" "}
          {/*mt-8 md:mt-10*/}
          <div className="space-y-12">
            <h1 className="text-4xl font-bold">
              Hello, welcome here to learn something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
              obcaecati earum quisquam commodi cupiditate, reprehenderit rerum
              reiciendis, esse distinctio officia laborum. Non fuga mollitia
              rerum harum possimus odit beatae laborum.
            </p>

            <button className="btn btn-neutral w-1/2 btn-xs sm:btn-sm md:btn-md "
              onClick={ ()=>{document.getElementById("Login1").showModal();}}
            >
              <DocumentMagnifyingGlassIcon className="h-6 w-6 ml-2" />
              Search Documents'

            </button>
            {/* <Login/> */}
          </div>
        </div>
        <div className="w-full md:w-1/2 ">
          <img
            src="https://img.freepik.com/premium-photo/hand-writing-report-with-charts-graphs-indicating-business-analysis_822916-14969.jpg?ga=GA1.1.890005527.1695557607&semt=ais_hybrid"
            className="w-100 h-90 rounded-xl"
            alt=""
          ></img>
        </div>
      </div>
    </>
  );
};

export default Banner;
