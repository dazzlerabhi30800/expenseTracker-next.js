import { db } from "@/configs/db";
import { expenseTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseTable = ({ expenseList, refreshData }) => {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(expenseTable)
      .where(eq(expenseTable.id, expense.id));
    if (result) {
      toast("Expense deleted");
      refreshData();
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg my-4">Latest Expenses</h2>
      <div className="grid grid-cols-4 p-2 bg-slate-300 font-bold">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      {expenseList?.map((item, index) => (
        <div key={index} className="grid grid-cols-4 p-2 bg-slate-100 border-b">
          <h2>{item?.name}</h2>
          <h2>{item.amount}</h2>
          <h2>{item.createdAt}</h2>
          <h2 onClick={() => deleteExpense(item)}>
            <Trash className="text-red-400 cursor-pointer" />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTable;
