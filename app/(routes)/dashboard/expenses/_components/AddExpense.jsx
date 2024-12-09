import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { budgetTable, expenseTable } from "@/configs/schema";
import { toast } from "sonner";
import moment from "moment";
import { Loader } from "lucide-react";

const AddExpense = ({ id, refreshData }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const addExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(expenseTable)
      .values({
        name: name,
        amount: amount,
        budgetId: id,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: budgetTable.id });

    setAmount("");
    setName("");

    if (result) {
      refreshData();
      toast("New Expense Added");
    }
    setLoading(false);
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bedroom Decor"
        />
      </div>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 5,000"
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={addExpense}
        className="w-full mt-3"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
};

export default AddExpense;
