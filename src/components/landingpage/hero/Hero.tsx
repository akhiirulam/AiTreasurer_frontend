import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const values = [
  { label: "Paid to Suresh", amount: 543 },
  { label: "Received from Abdulla", amount: 1000 },
  { label: "Borrowed from Bank", amount: 3200 },
  { label: "Paid to Bank", amount: 1250 },
  { label: "Received from BB Store", amount: 8500 },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % values.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const value = values[currentIndex];

  return (
    <section className="w-full px-3 pt-2 font-mono">
      <div className="relative flex min-h-[550px] w-full flex-col items-center justify-center rounded-xl bg-[#ECFFE8] px-6 py-12 sm:px-8 md:min-h-[600px] lg:min-h-[350px] lg:flex-row lg:px-12 xl:px-16">
        {/* LEFT SIDE */}
        <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Accounting made easy
          </h1>

          <p className="mt-5 max-w-xl text-sm text-gray-700 sm:text-base md:text-lg">
            Manage your business finances, transactions, customers and reports
            with AI-powered bookkeeping.
          </p>

          <button className="mt-8 rounded-lg bg-[#79ff70] px-6 py-3 text-sm font-bold transition hover:bg-[#65eb5c] sm:px-8 sm:py-3.5">
            Get Started
          </button>
        </div>

        {/* RIGHT SIDE - COUNTER */}
        <div className="mt-16 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Label */}
            <span className="text-lg font-medium text-gray-600 sm:text-xl md:text-2xl lg:text-3xl">
              {value.label}
            </span>

            {/* Counter */}
            <div className="mt-2 text-5xl font-bold text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <NumberFlow
                value={value.amount}
                trend={0}
                format={{
                  style: "currency",
                  currency: "INR",
                  notation: "compact",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
