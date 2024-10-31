"use client";
import * as React from "react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold">Your Name</h1>
        <ModeToggle />
      </div>
    </nav>
  );
} 