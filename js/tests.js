/* ---------- Test cases (Section 12 of the report) ---------- */
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function runTests(){const rows=[];const add=(n,size,exp,fn)=>{const t=performance.now();let out,pass;try{[out,pass]=fn()}catch(e){out="Error: "+e.message;pass=false}
  rows.push(`<tr><td>${n}</td><td>${size}</td><td>${exp}</td><td>${out}</td><td><span class="tag ${pass?"good":"fail"}">${pass?"Pass":"Fail"}</span></td><td>${(performance.now()-t).toFixed(2)} ms</td></tr>`)};
 const sum=(a,k)=>a.reduce((s,x)=>s+x[k],0);
 add("1. Small attraction set","4 attractions, 5 nodes","DP value equals brute-force value; routes finite",()=>{
  const it=ATTR.slice(0,4),a=selKnap2(it,16,1500),b=selBrute(it,16,1500),r=plan(it,G,"H",480,1500,"knap2");
  return[`DP value ${sum(a,"v")}, brute value ${sum(b,"v")}, travel ${r.travel} min`,sum(a,"v")===sum(b,"v")&&isFinite(r.travel)]});
 add("2. Tight time limit","6 attractions, capacity 4 units","Total duration ≤ 4 units",()=>{
  const s=selKnap1(ATTR.slice(0,6),4);return[`Selected ${s.map(a=>a.name).join(", ")||"none"}; duration ${sum(s,"d")} units`,sum(s,"d")<=4]});
 add("3. Tight budget","5 attractions, budget ₹100","Total ticket cost ≤ ₹100",()=>{
  const r=plan(ATTR.slice(0,5),G,"H",600,100,"knap2");return[`Cost ₹${r.cost}, value ${r.value}`,r.cost<=100]});
 add("4. Disconnected location","10 nodes, 1 unreachable","Unreachable attraction excluded; distance = ∞",()=>{
  const{dist}=dijkstra(G,"H"),r=plan(ATTR,G,"H",720,3000,"knap2");
  return[`dist[VAL] = ${dist.VAL}; skipped: ${r.bad.map(a=>a.name).join(", ")}`,dist.VAL===Infinity&&!r.sel.some(a=>a.node==="VAL")]});
 add("5. Larger dataset","100 attractions, 150 nodes, 400 edges","Feasible candidate and route totals returned",()=>{
  const R=rng(7),ri=n=>Math.floor(R()*n),ids=[...Array(150).keys()].map(String),ed=[];
  for(let i=1;i<150;i++)ed.push([ids[i],ids[ri(i)],5+ri(36)]);
  while(ed.length<400){const u=ri(150),v=ri(150);if(u!==v)ed.push([ids[u],ids[v],5+ri(36)])}
  const g=buildGraph(ids,ed),it=[...Array(100).keys()].map(i=>({id:i,name:"A"+i,node:ids[ri(150)],v:1+ri(10),c:10*ri(31),d:1+ri(4)}));
  const r=plan(it,g,"0",720,2000,"knap2");
  return[`${r.sel.length} stops, value ${r.value}, cost ₹${r.cost}, total ${hm(r.total)}, feasible: ${r.feasible}`,r.feasible]});
 $("tres").innerHTML="<table><tr><th>Test case</th><th>Input size</th><th>Expected</th><th>Actual output</th><th>Result</th><th>Time</th></tr>"+rows.join("")+"</table>"}
$("runT").onclick=runTests;
