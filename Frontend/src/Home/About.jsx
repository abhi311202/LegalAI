import React from "react";
import ReadMore from "./ReadMore";

function About() {
  return (
    <>
      <hr className="my-20"></hr>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div
          className="hero"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/room-with-desk-monitor-wall_1262781-132285.jpg?semt=ais_hybrid)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="text-neutral-content h-full p-20 ">
            <div className="max-w-full">
              <h1 className="mb-5 text-4xl font-bold">About Us</h1>
              <p className="mb-5 text-xl">
                In the legal sector, handling large volumes of documents is a
                routine but essential task. Legal practitioners, researchers,
                and even clients frequently deal with extensive paperwork that
                demands careful review and analysis. However, this manual
                process is time-consuming, prone to errors, and can lead to
                inefficiencies within the legal workflow. Our solution aims to
                address these challenges through the power of Artificial
                Intelligence and Machine Learning.
              </p>
              <ReadMore />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
