"use client";
import * as React from "react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Name
        </p>
        <div className="flex space-x-4">
          <a href="https://github.com/yourusername" className="text-sm hover:underline">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" className="text-sm hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
} 