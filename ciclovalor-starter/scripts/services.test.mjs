import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
async function waitFor(url) {
  for(let i=0;i<100;i++) {try {const r=await fetch(url);if(r.status<500)return;}catch{} await new Promise(r=>setTimeout(r,100));}
  throw new Error(`Server did not start: ${url}`);
}
test('Services publishes only web and grants only web → api',async()=>{
  const config=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
  for(const key of ['framework','buildCommand','installCommand','outputDirectory','functions'])assert.ok(!(key in config));
  assert.equal(config.rewrites.length,1);
  assert.equal(config.rewrites[0].destination.service,'web');
  assert.deepEqual(config.services.web.bindings,[{type:'service',service:'api',format:'url',env:'CICLOVALOR_API_URL'}]);
  assert.ok(!config.services.api.bindings);
});
test('Next runtime uses the bound API URL; no public API or URL disclosure',async()=>{
  const api=spawn(process.execPath,['apps/api/dist/apps/api/src/main.js'],{env:{...process.env,PORT:'3096'},stdio:'ignore'});
  let calls=0;
  const proxy=createServer(async(req,res)=>{
    if(req.url!=='/api/home'){res.writeHead(404).end();return;}
    calls++;
    try {const upstream=await fetch('http://127.0.0.1:3096/api/home');res.writeHead(upstream.status,{'Content-Type':'application/json'});res.end(await upstream.text());}
    catch{res.writeHead(502).end();}
  });
  await new Promise(resolve=>proxy.listen(3097,'127.0.0.1',resolve));
  let web;
  try {
    await waitFor('http://127.0.0.1:3096/api/health');
    web=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3098'],{env:{...process.env,VERCEL:'1',CICLOVALOR_API_URL:'http://127.0.0.1:3097/',NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
    await waitFor('http://127.0.0.1:3098/');
    const response=await fetch('http://127.0.0.1:3098/');
    assert.equal(response.status,200);
    const html=await response.text();
    assert.match(html,/CicloValor/);
    assert.match(html,/Ecoponto do Centro/);
    assert.ok(calls>0,'The page must actually call the bound API');
    assert.ok(!html.includes('http://127.0.0.1:3097'),'Internal URL must not appear in rendered HTML');
    assert.equal((await fetch('http://127.0.0.1:3098/api/home/')).status,404,'Nest routes must not become public on the web service');
  } finally {
    if(web){web.kill('SIGTERM');await new Promise(resolve=>web.once('exit',resolve));}
    api.kill('SIGTERM');await new Promise(resolve=>api.once('exit',resolve));
    await new Promise(resolve=>proxy.close(resolve));
  }
});
