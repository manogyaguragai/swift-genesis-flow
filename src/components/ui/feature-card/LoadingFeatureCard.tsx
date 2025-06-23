
import React from 'react';
import { Skeleton } from '../skeleton';

export const LoadingFeatureCard: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-glass border border-white/50 h-64">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Skeleton className="w-20 h-20 rounded-2xl" />
        <Skeleton className="w-6 h-6 rounded-full" />
        <div className="text-center space-y-2 w-full">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>
      </div>
    </div>
  );
};
