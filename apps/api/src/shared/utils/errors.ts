export const error = (message: string, status = 400) => {
  const e = new Error(message) as Error & { status: number };
  e.status = status;
  return e;
};
