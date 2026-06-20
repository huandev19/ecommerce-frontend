"use client";

import { useToast } from "./use-toast";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all min-w-[300px] ${
            t.variant === "destructive" ? "border-red-500 bg-red-50 text-red-900" :
            t.variant === "success" ? "border-green-500 bg-green-50 text-green-900" :
            "border-gray-200 bg-white text-gray-900"
          }`}
        >
          {t.variant === "destructive" ? (
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          ) : t.variant === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          ) : (
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          )}
          <div className="flex-1">
            {t.title && <h3 className="font-semibold text-sm">{t.title}</h3>}
            {t.description && <p className="text-sm opacity-90">{t.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
