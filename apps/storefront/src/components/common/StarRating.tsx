"use client";

import React from "react";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function StarRating({ rating, reviewCount, size = "sm", showCount = false }: Props) {
  const sizeClass = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  const textClass = size === "lg" ? "text-sm" : "text-xs";

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.round(rating);
          return (
            <Star
              key={star}
              className={`${sizeClass} ${filled ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
            />
          );
        })}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={`${textClass} text-gray-500`}>({reviewCount})</span>
      )}
    </div>
  );
}
