import React from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/landingpage/hero/Hero";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full font-mono  bg-[#f5ffc2] ">
      <Navbar />

      <main>
        <Hero />
        {/*
        <VideoSection />
        <HowItWorks />
        <Testimonials />
        <FAQ /> */}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
