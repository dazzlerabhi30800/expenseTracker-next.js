import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { budgetTable, expenseTable } from "@/configs/schema";
import { toast } from "sonner";
import moment from "moment";

const AddExpense = ({ id,  refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const addExpense = async () => {
    const result = await db
      .insert(expenseTable)
      .values({
        name: name,
        amount: amount,
        budgetId: id,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: budgetTable.id });

    if (result) {
      refreshData();
      toast("New Expense Added");
    }
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bedroom Decor"
        />
      </div>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 5,000"
        />
      </div>
      <Button
        disabled={!(name && amount)}
        onClick={addExpense}
        className="w-full mt-3"
      >
        Add New Expense
      </Button>
    </div>
  );
};

export default AddExpense;
