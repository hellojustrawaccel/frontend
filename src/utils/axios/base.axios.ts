class BackendApiError extends Error {
  public status?: number;
  public data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);

    this.name = 'BackendApiError';
    this.status = status;
    this.data = data;
  }
}

export { BackendApiError };
