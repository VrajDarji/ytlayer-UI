"use client";
import { useEffect, useState } from "react";

export const useLocation = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const origin =
    typeof window !== "undefined" && window.location.href
      ? window.location.href
      : "";

  if (!isMounted) {
    return "";
  }
  return origin;
};
