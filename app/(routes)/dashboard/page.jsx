import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Dashboard() {
  return (
    <div className="p-2">
      <UserButton />
    </div>
  );
}
