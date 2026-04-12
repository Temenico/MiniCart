const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8090/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Ocurrió un error inesperado.";

    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        message = errorBody.message;
      }
    } catch {
      message = "No fue posible procesar la respuesta del servidor.";
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export { request };
