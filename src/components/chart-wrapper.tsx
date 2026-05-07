"use client";

import dynamic from "next/dynamic";
import React from "react";

const CareerGrowthChart = dynamic(() => import("@/components/career-growth-chart").then(mod => mod.CareerGrowthChart), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-white/5 animate-pulse rounded-xl" />
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartWrapper({ data }: { data?: any[] }) {
  return <CareerGrowthChart data={data} />;
}
