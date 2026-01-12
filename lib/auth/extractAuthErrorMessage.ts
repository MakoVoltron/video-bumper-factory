export function extractAuthErrorMessage(error: unknown): string {
  if (typeof error !== "object" || error === null) {
    return "Something went wrong";
  }

  // Better Auth APIError shape
  if ("body" in error) {
    const body = error.body;

    if (typeof body === "object" && body !== null && "message" in body) {
      if (typeof body.message === "string") {
        return body.message;
      }
    }
  }

  // Fallback
  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Authentication failed.";
}
