"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { budgetTable, expenseTable } from "@/configs/schema";
import { db } from "@/configs/db";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";

const ExpenseScreen = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(budgetTable),
        totalSpent: sql`sum(${expenseTable.amount})`.mapWith(Number),
        totalItems: sql`count(${expenseTable.id})`.mapWith(Number),
      })
      .from(budgetTable)
      .leftJoin(expenseTable, eq(budgetTable.id, expenseTable.budgetId))
      .where(eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(budgetTable.id, id))
      .groupBy(budgetTable.id);
    setBudgetInfo(result[0]);
  };

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense id={id} user={user} refreshData={() => getBudgetInfo()} />
      </div>
    </div>
  );
};

export default ExpenseScreen;
