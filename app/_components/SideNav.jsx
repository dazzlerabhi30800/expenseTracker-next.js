'use client';
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const path = usePathname();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expense",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  return (
    <div className="h-screen p-5 border shadow-md">
      <Image src={"/logo.svg"} alt="logo" width={160} height={100} />
      <div className="mt-5">
        {menuList.map((item) => (
          <Link key={item.id} href={item.path}>
            <h2
              className={`flex gap-2 items-center p-5 text-gray-500 hover:text-primary hover:bg-blue-200 cursor-pointer transition-all ${path === item.path && "bg-blue-200 text-primary"} mb-2`}
            >
              <item.icon /> {item.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 flex items-center gap-2 px-5">
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNav;
