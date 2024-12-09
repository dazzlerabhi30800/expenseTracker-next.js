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
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditButton from "../_components/EditButton";

const ExpenseScreen = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState();
  const router = useRouter();

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

  // NOTE: delete budget
  const deleteBudget = async () => {
    const deleteExpense = await db
      .delete(expenseTable)
      .where(eq(expenseTable.budgetId, id))
      .returning();
    if (deleteExpense) {
      const result = await db
        .delete(budgetTable)
        .where(eq(budgetTable.id, id))
        .returning();
    }
    toast("Budget Deleted!");
    router.replace("/dashboard/budgets");
  };

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
          <h2 className="text-2xl font-bold">My Expenses</h2>
        </div>
        {/* Delete Button  */}
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex gap-2 items-center">
                <Trash size={30} strokeWidth={3} /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your expense data from your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteBudget}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <EditButton
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />
        </div>
        {/* Edit Button */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-6">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense id={id} refreshData={() => getBudgetInfo()} />
      </div>
      <div className="mt-5">
        <ExpenseTable
          expenseList={expenseList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpenseScreen;
