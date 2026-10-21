import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const value = (names, fallback) => { const index=args.findIndex(v=>names.includes(v)); return index>=0 ? args[index+1] ?? fallback : fallback; };
const child=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'dev','--webpack','--hostname',value(['--host','--hostname'],'0.0.0.0'),'--port',value(['--port'],process.env.PORT ?? '4173')],{stdio:'inherit',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
