// api.ts

const BASE_URL = "http://localhost:3333";

// Fonction pour créer les headers avec le token si disponible
function createHeaders(): Headers {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const token = localStorage.getItem("token");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}

// Gestionnaire d'erreurs commun
function handleErrorResponse(error: unknown): never {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
    throw {
      ok: false,
      data: null,
      error: {
        code: "NETWORK_ERROR",
        message: error.message,
      },
    };
  }

  console.error("Unknown API error:", error);
  throw {
    ok: false,
    data: null,
    error: {
      code: "UNKNOWN_ERROR",
      message: "An unknown error occurred",
    },
  };
}

// Fonction utilitaire générique avec fetch
export async function apiRequest<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: unknown,
  config?: RequestInit
): Promise<T> {
  try {
    const fullUrl = `${BASE_URL}${url}`;
    const headers = createHeaders();

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...config,
      signal: AbortSignal.timeout(10000), // Timeout de 10s
    });

    // if (!response.ok) {
    //   const errorData = await response.json().catch(() => ({}));
    //   throw {
    //     ok: false,
    //     data: null,
    //     error: {
    //       code: errorData.code || "HTTP_ERROR",
    //       message: errorData.message || response.statusText,
    //     },
    //   };
    // }

    return (await response.json()) as T;
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Fonctions spécifiques pour chaque méthode HTTP
export const api = {
  get: <T>(url: string, config?: RequestInit) =>
    apiRequest<T>("GET", url, undefined, config),

  post: <T>(url: string, data?: unknown, config?: RequestInit) =>
    apiRequest<T>("POST", url, data, config),

  put: <T>(url: string, data?: unknown, config?: RequestInit) =>
    apiRequest<T>("PUT", url, data, config),

  patch: <T>(url: string, data?: unknown, config?: RequestInit) =>
    apiRequest<T>("PATCH", url, data, config),

  delete: <T>(url: string, config?: RequestInit) =>
    apiRequest<T>("DELETE", url, undefined, config),
};
