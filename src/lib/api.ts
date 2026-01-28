const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);

    this.name = 'ApiError';
  }
}

const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit & { token?: string }
): Promise<T> => {
  const { token, ...fetchOptions } = options || {};

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, { ...fetchOptions, headers, cache: 'no-store' });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new ApiError(
        response.status,
        errorData?.message || response.statusText,
        errorData
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(
      `API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const api = {
  get: <T>(endpoint: string, token?: string) =>
    fetchApi<T>(endpoint, { method: 'GET', token }),

  post: <T, B = any>(endpoint: string, body?: B, token?: string) =>
    fetchApi<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      token,
    }),

  put: <T, B = any>(endpoint: string, body?: B, token?: string) =>
    fetchApi<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      token,
    }),

  patch: <T, B = any>(endpoint: string, body?: B, token?: string) =>
    fetchApi<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      token,
    }),

  delete: <T>(endpoint: string, token?: string) =>
    fetchApi<T>(endpoint, { method: 'DELETE', token }),
};

export { ApiError };
