import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { db } from "@/configs/db";
import { budgetTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const EditButton = ({ budgetInfo, refreshData }) => {
  const [emoji, setEmoji] = useState(budgetInfo?.icon);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  useEffect(() => {
    if (!budgetInfo) return;
    setName(budgetInfo?.name);
    setAmount(budgetInfo?.amount);
    setEmoji(budgetInfo?.icon);
  }, [budgetInfo]);

  // NOTE: function to change budget
  const handleUpdateBudget = async () => {
    const result = await db
      .update(budgetTable)
      .set({
        name: name,
        amount: amount,
        icon: emoji,
      })
      .where(eq(budgetTable.id, budgetInfo?.id))
      .returning();
    if (result) {
      toast("Budget updated");
      refreshData();
    }
  };

  return (
    <div>
      <Dialog className="flex w-full">
        <DialogTrigger className="w-full" asChild>
          <Button className="flex gap-2">
            <Pen /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
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
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mt-4">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  value={amount}
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={handleUpdateBudget}
                disabled={!(name && amount)}
                className="mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditButton;
