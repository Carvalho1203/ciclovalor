import { connection } from 'next/server';
import Home from '@/components/home';
import { homeData } from '@/shared/home-data';
import { fetchServiceHome } from '@/server/home';
export default async function Page() {
  if (process.env.VERCEL === '1' || process.env.CICLOVALOR_API_URL) {
    // Bindings exist in Functions at runtime, never during the build.
    await connection();
    const data = await fetchServiceHome(process.env.CICLOVALOR_API_URL);
    return <Home initialData={data}/>;
  }
  return <Home initialData={homeData}/>;
}
