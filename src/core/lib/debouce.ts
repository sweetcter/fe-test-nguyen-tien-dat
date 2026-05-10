type Procedure = (...args: any[]) => void;

interface DebouncedFunction<F extends Procedure> {
  (...args: Parameters<F>): void;
  cancel: () => void;
}

export function debounce<F extends Procedure>(func: F, wait: number): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}
