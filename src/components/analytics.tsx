"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/firebase";

export default function AnalyticsInitializer() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
