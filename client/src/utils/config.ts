let publicConfig: { API_URL: string } | null = null;

export async function getPublicConfig() {
  if (publicConfig) return publicConfig;

  try {
    const response = await fetch('/api/public-config');
    publicConfig = await response.json();
    return publicConfig;
  } catch (error) {
    console.error('Failed to fetch public config:', error);
    return { API_URL: 'http://localhost:5000' }; // Fallback URL
  }
}