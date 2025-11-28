"use client";

import { Input } from "@/components/ui/input";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full mb-4">
      <Input
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11"
      />
    </div>
  );
}
