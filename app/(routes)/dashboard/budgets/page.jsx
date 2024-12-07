import React from "react";
import BudgetList from "./_components/BudgetList";

const Budget = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">My Budget List</h2>
      <BudgetList />
    </div>
  );
};

export default Budget;
