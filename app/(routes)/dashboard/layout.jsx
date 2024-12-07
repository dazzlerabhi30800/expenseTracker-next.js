"use client";
import DashboardHeader from "@/app/_components/DashboardHeader";
import SideNav from "@/app/_components/SideNav";
import { db } from "@/configs/db";
import { budgetTable } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { user } = useUser();
  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(budgetTable)
      .where(
        eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress),
      );
    if (result.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

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
