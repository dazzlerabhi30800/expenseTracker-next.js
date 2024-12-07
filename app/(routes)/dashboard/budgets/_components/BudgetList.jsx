"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/configs/db";
import { budgetTable, expenseTable } from "@/configs/schema";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

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
      .leftJoin(expenseTable, eq(budgetTable.id, expenseTable.id))
      .where(eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(budgetTable.id);
    setBudgetList(result);
  };
  console.log(budgetList);
  return (
    <div className="mt-7">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget />
        {budgetList?.map((budget) => (
          <BudgetItem budget={budget} key={budget.id} />
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
