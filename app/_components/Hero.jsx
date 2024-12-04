import React from "react";
import Image from "next/image";
// import dashboardImg from "@/public/dashboard.png";

const Hero = () => {
  return (
    <section className="bg-gray-50 flex flex-col flex-1 py-20 items-center gap-10">
      <div className="mx-auto max-w-screen-xl px-4 py-10 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expense
            <strong className="font-extrabold text-primary sm:block">
              Control Your Money
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Start Creating your budget and save ton of money
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      {/* <Image src={dashboardImg} width={160} height={100} alt="logo" /> */}
      <Image src={"/dashboard.png"} width={1000} height={700} alt="logo" className="mt-10 rounded-xl border-2" />
    </section>
  );
};

export default Hero;
