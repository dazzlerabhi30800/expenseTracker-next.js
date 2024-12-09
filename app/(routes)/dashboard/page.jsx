"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { budgetTable, expenseTable } from "@/configs/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/configs/db";

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
  console.log(budgetList);
  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p>Here's whats happening to your money, let's manage your expense</p>
      <CardInfo budgetList={budgetList} />
    </div>
  );
}
