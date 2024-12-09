import React, { useEffect, useState } from "react";
import { formatPrice } from "@/configs/formatNumber";
import { PiggyBank, Receipt, Wallet } from "lucide-react";

const CardInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    budgetList && calculateBudget();
  }, [budgetList]);

  const calculateBudget = () => {
    setLoading(true);
    let total_Budget = 0;
    let total_Spent = 0;
    budgetList.forEach((element) => {
      total_Budget += element.amount;
      total_Spent += element.totalSpent;
    });
    setTotalBudget(total_Budget);
    setTotalSpent(total_Spent);
    setLoading(false);
  };
  return (
    <div>
      {budgetList && !loading ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">{formatPrice(totalBudget)}</h2>
            </div>
            <PiggyBank className="bg-primary text-white p-3 rounded-[50%] h-12 w-12" />
          </div>
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">Total Spent</h2>
              <h2 className="font-bold text-2xl">{formatPrice(totalSpent)}</h2>
            </div>
            <Receipt className="bg-primary text-white p-3 rounded-[50%] h-12 w-12" />
          </div>
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">Total Budgets</h2>
              <h2 className="font-bold text-2xl">{budgetList.length}</h2>
            </div>
            <Wallet className="bg-primary text-white p-3 rounded-[50%] h-12 w-12" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-[150px] w-full bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
