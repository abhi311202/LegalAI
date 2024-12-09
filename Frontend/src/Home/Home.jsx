import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import Content1 from "./Content1";
import Hero from "./Hero";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import About from "./About";
import Download from "./Download";
import Navbar1 from "../components/Navbar1";
import Service from "./Service";
import Login from "../components/Login";
import AdminLogin from "../components/AdminLogin";

function Home() {
  const { section } = useParams();

  useEffect(() => {
    if (section) {
      // Find the element by ID and scroll to it
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section]);

  return (
    <>
      {/* <Navbar /> */}
      <Navbar1 />
      <Hero />
      <section id="about"></section>
      <Banner />
      <section id="services"></section>
      {/* <Content1 /> */}
      <Service />
      <section id="team">
        <Freebook />
      </section>
      <section id="About"></section>
      <About />
      <Download />
      <Footer />
      <Login/>
      <AdminLogin/>
    </>
  );
}

export default Home;
