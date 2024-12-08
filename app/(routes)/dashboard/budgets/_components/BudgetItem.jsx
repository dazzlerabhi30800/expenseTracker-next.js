import React from "react";
import Link from "next/link";
import { formatPrice, percentWidth } from "@/configs/formatNumber";

const BudgetItem = ({ budget }) => {
  return (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
      <div className="flex flex-col justify-between p-5 border rounded-lg cursor-pointer transition-all hover:shadow-md">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 bg-slate-100 rounded-[50%]">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget?.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget?.totalItems} Item
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary">
            {formatPrice(budget?.amount)}
          </h2>
        </div>
        <div className="mt-5">
          <div className="flex justify-between items-center text-sm">
            <h2 className="text-slate-400">
              {budget.totalSpent ? formatPrice(budget.totalSpent) : 0} Spend
            </h2>
            <h2 className="text-slate-400">
              {formatPrice(budget.amount - budget.totalSpent)} Remaining
            </h2>
          </div>
          <div className="w-full h-2 bg-slate-300 rounded-full mt-3">
            <div
              style={{
                width: `${percentWidth(budget?.amount, budget?.totalSpent)}%`,
              }}
              className="h-2 bg-primary rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
