import { ReactNode } from "react";
import { ToastProvider } from "@/app/program/toast"; // adjust import

export default function ProgramLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}

