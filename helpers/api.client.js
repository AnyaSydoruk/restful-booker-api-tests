import { config } from "../config/index.js";

async function request(method, path, { body, token, headers = {} } = {}) {
  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  if (body) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    requestHeaders.Cookie = `token=${token}`;
  }

  const response = await fetch(`${config.baseUrl}${path}`, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(config.timeout),
  });

  return {
    status: response.status,
    headers: response.headers,
    body: await parseBody(response),
  };
}

async function parseBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export const apiClient = {
  get: (path, options) => request("GET", path, options),
  post: (path, options) => request("POST", path, options),
  put: (path, options) => request("PUT", path, options),
  patch: (path, options) => request("PATCH", path, options),
  delete: (path, options) => request("DELETE", path, options),
};
