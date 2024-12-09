import { useUser, UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  const { user } = useUser();
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <div>Search Bar</div>
      {user && (
        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
