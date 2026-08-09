import Navbar from "../../components/Navbar";
import Hero from "../../components/landingpage/hero/Hero";
import HowItWorks from "../../components/landingpage/howitworks/HowItWorks";
import Testimonials from "../../components/landingpage/testimonial/Testimonials";
import FAQ from "../../components/landingpage/faq/FAQ";
const LandingPage = () => {
  return (
    <div className="min-h-screen w-full font-mono  bg-[#f5ffc2] ">
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        {/*
        <VideoSection />
        
   
        */}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
