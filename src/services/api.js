
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  console.warn(
    "EXPO_PUBLIC_API_URL is missing. Check your .env configuration."
  );
}

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(
      `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`,
      {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        typeof data?.detail === "string"
          ? data.detail
          : `Request failed with status ${response.status}`;

      throw new Error(message);
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The server took too long to respond. Please try again.");
    }

    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to Imara. Check your internet connection and try again."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function loginUser(identifier, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: identifier.trim(),
      password,
    }),
  });
}
