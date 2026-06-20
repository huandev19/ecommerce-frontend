"use client";

import { useState } from 'react';
import { useEventBus } from '@v8n/hooks';

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
};

export function toast(props: ToastProps) {
  const event = new CustomEvent('SHOW_TOAST', { detail: props });
  window.dispatchEvent(event);
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEventBus<ToastProps>('SHOW_TOAST', (payload) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...payload, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, { lockDurationMs: 0 });

  return { toasts, toast };
}
