"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme !== "dark");

  useEffect(() => {
    setIsLight(theme !== "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <div className="flex flex-row items-center gap-x-2 ml-auto">
      <div
        className="relative flex items-center p-3 bg-gray-200 dark:bg-zinc-800 rounded-3xl w-14 cursor-pointer transition-all duration-300"
        onClick={toggleTheme}
      >
        <div
          className={`absolute h-4 w-4 rounded-full transition-transform duration-300 ${
            isLight
              ? "bg-white transform -translate-x-2"
              : "bg-gray-200 transform translate-x-6"
          }`}
        ></div>
      </div>
      <div>{isLight ? <Sun size={20} /> : <Moon size={20} />}</div>
    </div>
  );
}
