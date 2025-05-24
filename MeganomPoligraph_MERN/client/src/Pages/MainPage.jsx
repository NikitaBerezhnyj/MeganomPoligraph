import React from "react";
import Loader from "../Components/Loader_Components/Loader";
import Header from "../Components/Header_Components/Header";
import Hero from "../Components/Hero_Components/Hero";
import Services from "../Components/Services_Components/Services";
import Portfolio from "../Components/Portfolio_Components/Portfolio";
import Management from "../Components/Management_Components/Management";
import About from "../Components/About_Components/About";
import Delivery from "../Components/Delivery_Components/Delivery";
import Requests from "../Components/Requests_Components/Requests";
import Footer from "../Components/Footer_Components/Footer";
import ToTopButton from "../Components/ToTopButton_Components/ToTopButton";

function MainPage() {
  return (
    <>
      <Loader />
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Management />
      <About />
      <Delivery />
      <Requests />
      <Footer />
      <ToTopButton />
    </>
  );
}

export default MainPage;
