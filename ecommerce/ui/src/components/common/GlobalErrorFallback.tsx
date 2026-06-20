"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";

export function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  useEffect(() => {
    console.error("Global UI Error Caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border border-red-100 bg-red-50 p-8 text-center shadow-sm">
      <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
      <h2 className="mb-2 text-2xl font-semibold text-red-900">Something went wrong!</h2>
      <p className="mb-6 max-w-[500px] text-red-700">
        {error.message || "An unexpected error occurred in the application."}
      </p>
      <div className="flex gap-4">
        <Button 
          variant="default" 
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Reload Page
        </Button>
        <Button 
          variant="outline" 
          onClick={resetErrorBoundary}
          className="border-red-200 text-red-700 hover:bg-red-100"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
