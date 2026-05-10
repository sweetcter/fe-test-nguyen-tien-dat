import { cn } from '@/utils';
import type { HTMLAttributes } from 'react';

const Skeleton = ({
  loading,
  children,
  fallback,
  ...rest
}: {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      {loading
        ? (fallback ?? (
            <div
              {...rest}
              className={cn(`h-3 w-2/3 animate-pulse rounded-md bg-zinc-200/70`, rest.className)}
            />
          ))
        : children}
    </>
  );
};

export default Skeleton;
