import { useCallback, useMemo, useRef, useEffect } from 'react';

/**
 * Hook لقياس أداء المكون
 * Performance Monitoring Hook
 */
export function usePerformance(componentName: string) {
  const renderTimeRef = useRef<number>(Date.now());
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    renderCountRef.current++;
    const renderTime = Date.now() - renderTimeRef.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[Performance] ${componentName}: render #${renderCountRef.current} took ${renderTime}ms`
      );
    }
  });

  return {
    renderCount: renderCountRef.current,
  };
}

/**
 * Hook للتحكم في debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook للتحكم في throttle
 */
export function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const lastUpdatedRef = useRef<number>(Date.now());

  React.useEffect(() => {
    const now = Date.now();
    if (now >= lastUpdatedRef.current + interval) {
      lastUpdatedRef.current = now;
      setThrottledValue(value);
    } else {
      const handler = setTimeout(() => {
        lastUpdatedRef.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(handler);
    }
  }, [value, interval]);

  return throttledValue;
}
