import { useEffect, useCallback, useRef } from 'react';

export type EventCallback<T = any> = (payload: T) => void;

export interface UseEventBusOptions {
  /** Lock duration in milliseconds to prevent spam-clicks */
  lockDurationMs?: number;
}

/**
 * A global Event Bus hook for cross-component communication.
 * Implements a lock mechanism to prevent spam triggering of critical events.
 */
export function useEventBus<T = any>(
  eventName: string,
  onEvent?: EventCallback<T>,
  options: UseEventBusOptions = { lockDurationMs: 1000 }
) {
  const isLocked = useRef(false);

  useEffect(() => {
    if (!onEvent) return;

    const handleEvent = (e: CustomEvent<T>) => {
      onEvent(e.detail);
    };

    window.addEventListener(eventName, handleEvent as EventListener);

    return () => {
      window.removeEventListener(eventName, handleEvent as EventListener);
    };
  }, [eventName, onEvent]);

  const emit = useCallback(
    (payload?: T) => {
      if (isLocked.current) {
        console.warn(`[EventBus] Event ${eventName} is currently locked to prevent spam.`);
        return false;
      }

      isLocked.current = true;
      const event = new CustomEvent<T>(eventName, { detail: payload as T });
      window.dispatchEvent(event);

      setTimeout(() => {
        isLocked.current = false;
      }, options.lockDurationMs);

      return true;
    },
    [eventName, options.lockDurationMs]
  );

  return { emit };
}
