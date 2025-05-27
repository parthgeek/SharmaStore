import React from "react";
import HeroSection from "../components/Middle/HeroSection";
import Services from "../components/Footers/Services";
import Trusted from "../components/Footers/Trusted";
import FeatureProduct from "../components/Middle/Featureproduct";


const Home = () => {
  const data = {
    name: "Sharma Store",
  };

  return (
    <>
      <HeroSection myData={data} />
        <FeatureProduct/>
        <Services/>
        <Trusted/>
            </>
  );
};

export default Home;