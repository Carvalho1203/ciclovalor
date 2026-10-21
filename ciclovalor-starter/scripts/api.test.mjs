import { spawn } from 'node:child_process';
import { test } from 'node:test';
import assert from 'node:assert/strict';
const port=3099;
test('NestJS serves the Home contract and restricts cross-origin access',async()=>{
  const child=spawn(process.execPath,['apps/api/dist/apps/api/src/main.js'],{env:{...process.env,PORT:String(port),WEB_ORIGINS:'http://localhost:4173'},stdio:'ignore'});
  try {
    let ready=false;
    for(let attempt=0;attempt<60;attempt++){
      try {const response=await fetch(`http://127.0.0.1:${port}/api/health`);if(response.ok){ready=true;break;}} catch {}
      await new Promise(resolve=>setTimeout(resolve,100));
    }
    assert.ok(ready,'API must start successfully');
    const response=await fetch(`http://127.0.0.1:${port}/api/home`,{headers:{Origin:'http://localhost:4173'}});
    assert.equal(response.status,200);
    assert.equal(response.headers.get('access-control-allow-origin'),'http://localhost:4173');
    const home=await response.json();
    assert.equal(home.mode,'demo');
    assert.ok(home.points.length>0);
    const materialIds=new Set(home.materials.map(m=>m.id));
    assert.equal(new Set(home.points.map(p=>p.id)).size,home.points.length,'Point IDs must be unique');
    for(const point of home.points) for(const material of point.materials) assert.ok(materialIds.has(material),'Each accepted material must exist in the shared contract');
    const blocked=await fetch(`http://127.0.0.1:${port}/api/home`,{headers:{Origin:'https://unrelated.example'}});
    assert.equal(blocked.headers.get('access-control-allow-origin'),null);
    const write=await fetch(`http://127.0.0.1:${port}/api/home`,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
    assert.equal(write.status,404,'This starter must not expose discard registration');
  } finally {child.kill('SIGTERM');}
});
