/* ---------- UI ---------- */
$("list").innerHTML=ATTR.map(a=>`<label class="att"><input type="checkbox" data-id="${a.id}" checked>
 <span>${a.name}<small>Value ${a.v} · ₹${a.c} · ${a.d*U} min</small></span></label>`).join("");
["hrs","bud","met"].forEach(i=>$(i).oninput=render);document.querySelectorAll("#list input").forEach(c=>c.onchange=render);

function drawMap(res){const used=new Set(),order={};
 res.legs.forEach((l,i)=>{order[l.a.node]=i+1;for(let k=0;k<l.path.length-1;k++)used.add([l.path[k],l.path[k+1]].sort().join())});
 let s='<svg viewBox="0 0 700 380" role="img" aria-label="Route map">';
 EDGES.forEach(([u,v,w])=>{const A=NODES[u],B=NODES[v];s+=`<line class="edge ${used.has([u,v].sort().join())?"r":""}" x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}"/>
  <text class="w" x="${(A.x+B.x)/2}" y="${(A.y+B.y)/2-4}" text-anchor="middle">${w}</text>`});
 for(const k in NODES){const n=NODES[k],isBad=res.bad.some(a=>a.node===k)||k==="VAL";
  s+=`<circle class="nd ${k==="H"?"s":""} ${isBad?"x":""}" cx="${n.x}" cy="${n.y}" r="${order[k]||k==="H"?13:9}"/>`;
  if(order[k])s+=`<text x="${n.x}" y="${n.y+4}" text-anchor="middle" style="font-weight:700">${order[k]}</text>`;
  s+=`<text x="${n.x}" y="${n.y+(n.y>300?-20:28)}" text-anchor="middle">${n.n}</text>`}
 return s+"</svg>"}

function render(){const Hm=+$("hrs").value*60,B=+$("bud").value,m=$("met").value;
 $("hv").textContent=$("hrs").value;$("bv").textContent=B;
 const ids=[...document.querySelectorAll("#list input:checked")].map(c=>+c.dataset.id),items=ATTR.filter(a=>ids.includes(a.id));
 const r=plan(items,G,"H",Hm,B,m);
 if(r.skipped){$("sum").innerHTML='<p>Brute force is limited to 20 attractions. Choose another algorithm.</p>';$("itin").innerHTML="";return}
 $("sum").innerHTML=`<div class="stats">
  <div class="stat"><b>${r.value}</b><span>total value</span></div><div class="stat"><b>₹${r.cost}</b><span>of ₹${B} budget</span></div>
  <div class="stat"><b>${hm(r.visit)}</b><span>visiting</span></div><div class="stat"><b>${hm(r.travel)}</b><span>travelling</span></div>
  <div class="stat"><b>${hm(r.total)}</b><span>of ${hm(Hm)}</span></div></div>
  <p><span class="tag ${r.feasible?"good":"fail"}">${r.feasible?"All constraints satisfied":"Constraint violated: "+(r.cost>B?"over budget":"over time")}</span>
  ${r.bad.length?` <span class="note">Unreachable and skipped: ${r.bad.map(a=>a.name).join(", ")}</span>`:""}
  <span class="note"> ${METHODS[m]}, ${r.ms.toFixed(2)} ms</span></p>`;
 $("itin").innerHTML=r.legs.length?r.legs.map(l=>`<li><b>${l.a.name}</b> — ${l.a.d*U} min, ₹${l.a.c}, value ${l.a.v}
  <div class="path">${l.min} min by road: ${l.path.map(p=>NODES[p].n).join(" → ")}</div></li>`).join(""):"<p>No attraction fits these limits. Increase your time or budget.</p>";
 $("map").innerHTML=drawMap(r);
 $("cmp").innerHTML="<table><tr><th>Algorithm</th><th>Value</th><th>Cost</th><th>Total time</th><th>Feasible</th><th>Runtime</th></tr>"+
  Object.keys(METHODS).map(k=>{const x=plan(items,G,"H",Hm,B,k);return x.skipped?"":`<tr><td>${METHODS[k]}</td><td>${x.value}</td><td>₹${x.cost}</td><td>${hm(x.total)}</td>
  <td><span class="tag ${x.feasible?"good":"fail"}">${x.feasible?"Yes":"No"}</span></td><td>${x.ms.toFixed(2)} ms</td></tr>`}).join("")+"</table>"}


const PRESETS={half:{h:5,b:300,m:"knap2"},family:{h:8,b:1500,m:"knap2"},full:{h:12,b:3000,m:"knap2"},greedy:{h:4,b:500,m:"greedy"}};
$("pre").onchange=e=>{const p=PRESETS[e.target.value];if(!p)return;$("hrs").value=p.h;$("bud").value=p.b;$("met").value=p.m;
 document.querySelectorAll("#list input").forEach(c=>c.checked=true);render()};
render();
