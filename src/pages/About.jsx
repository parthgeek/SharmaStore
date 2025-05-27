import React from "react";
import HeroSection from "../components/Middle/HeroSection";
import { useProductContext } from "../context/productcontext";

const About = () => {
  const { myName } = useProductContext();

  const data = {
    name: "Thapa Ecommerce",
  };

  return (
    <>
      {myName}
      <HeroSection myData={data} />
    </>
  );
};

export default About;