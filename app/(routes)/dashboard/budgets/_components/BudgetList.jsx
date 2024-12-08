"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/configs/db";
import { budgetTable, expenseTable } from "@/configs/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };
  return (
    <div className="mt-7">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList.length > 0 || !loading
          ? budgetList?.map((budget) => (
              <BudgetItem budget={budget} key={budget.id} />
            ))
          : [1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 animate-pulse rounded-lg h-[150px]"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
