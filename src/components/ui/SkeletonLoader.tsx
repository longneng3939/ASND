"use client";

interface SkeletonProps {
  variant?: "card" | "text" | "image" | "list";
  className?: string;
}

export function Skeleton({ variant = "card", className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-100 rounded-lg ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {variant === "card" && (
        <div className="space-y-4 p-4">
          <div className="h-48 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      )}
      {variant === "text" && (
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      )}
      {variant === "image" && (
        <div className="h-48 bg-gray-200 rounded-lg w-full" />
      )}
      {variant === "list" && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="animate-shimmer bg-gray-100 rounded-lg overflow-hidden" aria-hidden="true">
      <div className="h-full w-full" />
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="space-y-6 animate-fade-in" aria-label="Loading content">
      <Skeleton variant="image" className="h-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="card" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonSchedule() {
  return (
    <div className="space-y-4" aria-label="Loading schedule">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-6">
          <div className="flex gap-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonArtist() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading artists">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-100 rounded-lg">
          <div className="h-48 bg-gray-200 rounded-t-lg" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
