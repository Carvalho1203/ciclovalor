import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const result=spawnSync(process.execPath,[require.resolve('next/dist/bin/next'),'build','--webpack'],{
  stdio:'inherit',env:{...process.env,VERCEL:'1',NEXT_TELEMETRY_DISABLED:'1'},
});
process.exit(result.status??1);
