"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NameInput = () => {
  const [name, setName] = useState("");

  return (
    <div className="mx-auto flex max-w-xl gap-4">
      <Input
        className="h-12 border-gray-800 placeholder:text-gray-500 focus:ring-gray-700"
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name ..."
        type="text"
        value={name}
      />
      <Button className="h-12 px-8 hover:bg-gray-700">Submit</Button>
    </div>
  );
};
