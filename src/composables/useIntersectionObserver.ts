export interface UseIntersectionObserver {
  stop: (lazyTarget?: Element) => void;
  start: (lazyTarget: Element) => void;
  isSupported: boolean;
}

export const useIntersectionObserver = (
  cb: IntersectionObserverCallback,
  target?: Element | undefined | null,
  options?: IntersectionObserverInit,
): UseIntersectionObserver => {
  const isSupported = window && 'IntersectionObserver' in window;
  const intersectionObserver = new IntersectionObserver(cb, options || { root: null });

  return {
    isSupported,
    stop: (lazyTarget?: Element) =>
      lazyTarget ? intersectionObserver.unobserve(lazyTarget) : intersectionObserver.disconnect(),
    start: (lazyTarget?: Element) => intersectionObserver.observe(target || lazyTarget),
  };
};
