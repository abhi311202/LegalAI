import React from "react";
import { ReactTyped } from "react-typed";
// import Hero_Vdo from "../../public/Hero_Vdo.mp4";
import Hero_Vdo1 from "../../public/Hero_Vdo1.mp4";

function Hero() {
  return (
    <>
      {/* <a> */}
      <div className="">
        <div className="hero min-h-screen relative">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src={Hero_Vdo1}
              // src="https://drive.google.com/uc?id=1AKJrfT1itD059rVjjlRpNsmA-Vgg8BTI"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center relative z-10">
            <div className="max-w-4xl">
              <h1 className="mb-3 text-5xl font-bold ">
                {" "}
                <ReactTyped
                  className="pl-3"
                  strings={[
                    "Search With Legal AI",
                    // "Digital Marketing",
                    // "Ethical Hackeing",
                  ]}
                  typeSpeed={100}
                  loop={true}
                  backSpeed={50}
                />
              </h1>
              <p className="mb-5">
                Transform legal workflows with AI-driven solutions that automate
                the summarization and classification of legal documents,
                enhancing accuracy and efficiency
              </p>
              {/* <button className="btn btn-primary">Get Started</button> */}
            </div>
          </div>
        </div>
      </div>
      {/* </a> */}
    </>
  );
}

export default Hero;
