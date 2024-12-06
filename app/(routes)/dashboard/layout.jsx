import DashboardHeader from "@/app/_components/DashboardHeader";
import SideNav from "@/app/_components/SideNav";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="fixed hidden md:block md:w-64">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
