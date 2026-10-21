import type { HomeData } from '../shared/home-data';
/** Called only by the Next.js server at request time. Never import into client code. */
export async function fetchServiceHome(baseUrl: string | undefined): Promise<HomeData> {
  if (!baseUrl) throw new Error('The web → api binding CICLOVALOR_API_URL is missing.');
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const response = await fetch(new URL('api/home', base), {
    cache: 'no-store', signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`The Home API returned HTTP ${response.status}.`);
  const value: unknown = await response.json();
  if (!value || typeof value !== 'object' || !('mode' in value) || value.mode !== 'demo'
      || !('materials' in value) || !Array.isArray(value.materials)
      || !('points' in value) || !Array.isArray(value.points)) {
    throw new Error('The Home API returned an incompatible data contract.');
  }
  return value as HomeData;
}
