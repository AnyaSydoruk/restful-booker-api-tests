import { apiClient } from "./api.client.js";
import { config, endpoints } from "../config/index.js";

export async function getAuthToken() {
  const response = await apiClient.post(endpoints.auth, {
    body: config.credentials,
  });

  return response.body.token;
}
