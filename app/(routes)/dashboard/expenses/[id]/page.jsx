"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { budgetTable, expenseTable } from "@/configs/schema";
import { db } from "@/configs/db";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseTable from "../_components/ExpenseTable";

const ExpenseScreen = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState();

  // NOTE: Get budget info

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

    // NOTE: setting the state
    setBudgetInfo(result[0]);
    getExpenseInfo();
  };

  // NOTE: to get expense info
  const getExpenseInfo = async () => {
    const result = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.budgetId, id))
      .orderBy(desc(expenseTable.id));
    setExpenseList(result);
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
        <AddExpense id={id} refreshData={() => getBudgetInfo()} />
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseTable
          expenseList={expenseList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpenseScreen;
