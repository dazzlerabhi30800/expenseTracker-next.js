import { useUser, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import React from "react";

const DashboardHeader = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <div>Search Bar</div>
      {user && (
        <div className="flex items-center gap-4">
          <SignOutButton redirectUrl="/">
            <Button className="bg-primary">Logout</Button>
          </SignOutButton>
          <img
            src={user?.imageUrl}
            alt={user?.fullName}
            className="w-9 h-9 rounded-[50%] hidden sm:block"
          />
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
