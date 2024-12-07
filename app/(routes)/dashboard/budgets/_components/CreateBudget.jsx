"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/configs/db";
import { budgetTable } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CreateBudget = () => {
  const [emoji, setEmoji] = useState("😊");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [amount, setAmount] = useState();
  const [name, setName] = useState();
  const { user } = useUser();

  const handleCreateBudget = async () => {
    const result = await db
      .insert(budgetTable)
      .values({
        name: name,
        amount: amount,
        icon: emoji,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ insertedId: budgetTable.id });
    if (result) {
      toast("New budget created!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex gap-2 items-center font-semibold bg-slate-100 p-10 rounded-md flex-col border-2 border-dashed cursor-pointer hover:shadow-md transition-all">
            <h2 className="text-3xl">+</h2>
            <h2 className="text-xl">Create Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setOpenEmoji((prev) => !prev)}
                className="mt-3"
              >
                {emoji}
              </Button>
              <div className="mt-3 w-full flex">
                <EmojiPicker
                  open={openEmoji}
                  style={{ width: "100%" }}
                  onEmojiClick={(e) => setEmoji(e.emoji)}
                />
              </div>
              <div className="mt-4">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Home Decor"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g. ₹5000"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={handleCreateBudget}
                disabled={!(name && amount)}
                className="mt-5 w-full"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
