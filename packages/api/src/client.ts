export interface FetchClientOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function fetchClient<T = any>(endpoint: string, options: FetchClientOptions = {}): Promise<T> {
  const { params, ...customConfig } = options;

  // Base URL resolution
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
  let url = `${baseUrl}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  // Read locale from NEXT_LOCALE cookie (set by next-intl)
  let locale = 'vi';
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]*)/);
    locale = match ? match[1] : 'vi';
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
      ...customConfig.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = 'An error occurred while processing the request.';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }

      // Automatically map HTTP 400/500 errors to global toast notifications
      if (response.status >= 400 && typeof window !== 'undefined') {
        const event = new CustomEvent('SHOW_TOAST', {
          detail: {
            title: `Error ${response.status}`,
            description: errorMessage,
            variant: 'destructive',
          }
        });
        window.dispatchEvent(event);
      }

      throw new Error(errorMessage);
    }

    // For 204 No Content or empty responses
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch' && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('SHOW_TOAST', {
        detail: {
          title: 'Network Error',
          description: 'Failed to connect to the server. Please check your connection.',
          variant: 'destructive',
        }
      }));
    }
    throw error;
  }
}
