"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { budgetTable, expenseTable } from "@/configs/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/configs/db";
import BarChartDashboard from "./_components/BarChartDashboard";

export default function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(budgetTable),
        totalSpent: sql`sum(${expenseTable.amount})`.mapWith(Number),
        totalItems: sql`count(${expenseTable.id})`.mapWith(Number),
      })
      .from(budgetTable)
      .leftJoin(expenseTable, eq(budgetTable.id, expenseTable.budgetId))
      .where(eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(budgetTable.id)
      .orderBy(desc(budgetTable.id));
    setBudgetList(result);
    // setLoading(false);
  };
  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p>Here's whats happening to your money, let's manage your expense</p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
        </div>
        <div>Other Component</div>
      </div>
    </div>
  );
}
