"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  console.log(user);
  return (
    <div className="p-5 flex justify-between items-center border shadow-md">
      <Image src="./logo.svg" width={160} height={100} alt="logo" />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
