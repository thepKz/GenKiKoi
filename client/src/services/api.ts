import { getPublicConfig } from '../utils/config';

export async function makeApiCall(endpoint: string, options = {}) {
    const config = await getPublicConfig();
    if (!config) throw new Error("Failed to get public config");
    const response = await fetch(`${config.API_URL}${endpoint}`, options);
    return response.json();
  }