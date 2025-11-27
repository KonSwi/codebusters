import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-dark text-white">
      <div className="absolute inset-0 bg-[url('/hero/devstockBaner.svg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-dark/80" />
      <div className="relative z-10 flex flex-col min-h-screen">
       {children}
      </div>
    </div>
  );
}
