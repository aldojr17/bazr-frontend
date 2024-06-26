import { RefObject, useRef } from "react";

export const useScroll = <T extends HTMLDivElement>(
  options?: boolean | ScrollIntoViewOptions
): [() => void, RefObject<T>] => {
  const elRef = useRef<T>(null);
  const executeScroll = (): void => {
    if (elRef.current) {
      elRef.current.scrollIntoView(options);
    }
  };

  return [executeScroll, elRef];
};
