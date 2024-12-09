import { useAuth1 } from "../context/AuthProvider1";
import { useAuth } from "../context/AuthProvider";
// import { useAuth2 } from "../context/AuthProvider2";
import React from "react";

import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import AdminLogin from "../components/AdminLogin";

const services = [
  {
    step: "01",

    name: "Summarization",

    imageUrl:
      "https://img.freepik.com/premium-photo/checklist-complete-online-evaluation-questionnaire-digital-form-checklist_539854-2950.jpg?w=1380",

    description: "We use AI Model to Summarize the legal documents.",

    serve: "Summarize",
    url: "../ChatPage/DocumentSummarization",
  },

  {
    step: "02",

    name: "Classification",

    imageUrl:
      "https://img.freepik.com/premium-photo/businessman-pressing-multimedia-type-modern-buttons-with-virtual-background-document-management-system-dms-searching-managing-corporate-files-information_1210714-482.jpg?w=1060",

    description:
      "We use ML model to classify the document depending on ths case type.",

    serve: "Classify",
    url: "../ChatPage/DocumentClassification",
  },

  {
    step: "03",

    name: "Search Legal Document",

    imageUrl:
      "https://media.istockphoto.com/id/459526583/photo/magnifying-glass-over-a-map-of-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=35ZXkXiSotfqFvjqMLZB_IXbEMQ9etPwNbHG0BWAQPI=",

    description: "AI powered search functionality for the Users.",

    serve: "Search Document",
    url: "/",
  },
];

const Service = () => {
  const [authAdmin, setAuthAdmin] = useAuth1();
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <hr className="my-20"></hr>
      <section className=" mx-auto">
        <div
          class
          Name="mx-auto flex justify-center object-center px-4 py-16 sm:py-24 lg:max-w-7xl"
        >
          <div className="flex justify-center object-center flex-col gap-12 sm:gap-16">
            {/* <h2 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Services
          </h2> */}

            <div className="mx-auto grid gap-12 space-y-10 md:space-y-0 sm:gap-16 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="group h-96 w-96 [perspective:1000px] mb-[50px]"
                >
                  <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front Face */}

                    <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
                      {service.imageUrl && (
                        <img
                          className="object-cover cursor-pointer object-left h-full w-full rounded-xl"
                          src={service.imageUrl}
                          alt={service.name}
                          width={320}
                          height={320}
                        />
                      )}

                      <p className="md:my-6 text-2xl text-center">
                        {service.name}
                      </p>
                    </div>

                    {/* Back Face */}

                    <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div className="flex min-h-full flex-col items-center justify-center">
                        <h2 className="text-2xl font-bold mb-4">
                          {service.name}
                        </h2>

                        <p className="text-lg text-pretty text-center mb-4">
                          {service.description}
                        </p>

                        <a className="inline-flex">
                          <button
                            onClick={() => {
                              if(service.step==="03")
                              {
                                authUser
                                ? (window.location.href = service.url)
                                : document.getElementById("Login1").showModal();
                              }else{
                                authAdmin
                                ? (window.location.href = service.url)
                                : document.getElementById("Login2").showModal();
                              }
                            }}
                            className="my-2 bg-yellow-800 hover:bg-yellow-700 text-white font-bold py-2 px-4 w-auto rounded-full inline-flex items-center"
                          >
                            <span>{service.serve}</span>

                            <ArrowLongRightIcon className="h-6 w-6 ml-2" />
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
