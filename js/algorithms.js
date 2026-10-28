/* ---------- Algorithms ---------- */
class Heap{constructor(){this.a=[]}get size(){return this.a.length}
 push(x){const a=this.a;a.push(x);let i=a.length-1;while(i>0){const p=(i-1)>>1;if(a[p][0]<=a[i][0])break;[a[p],a[i]]=[a[i],a[p]];i=p}}
 pop(){const a=this.a,top=a[0],last=a.pop();if(a.length){a[0]=last;let i=0;for(;;){let m=i;const L=2*i+1,R=L+1;
  if(L<a.length&&a[L][0]<a[m][0])m=L;if(R<a.length&&a[R][0]<a[m][0])m=R;if(m===i)break;[a[m],a[i]]=[a[i],a[m]];i=m}}return top}}
function buildGraph(nodeIds,edges){const g={};nodeIds.forEach(v=>g[v]=[]);edges.forEach(([u,v,w])=>{g[u].push([v,w]);g[v].push([u,w])});return g}
function dijkstra(g,s){const dist={},par={};for(const v in g){dist[v]=Infinity;par[v]=null}dist[s]=0;const h=new Heap();h.push([0,s]);
 while(h.size){const[d,u]=h.pop();if(d!==dist[u])continue;for(const[v,w]of g[u]){const nd=d+w;if(nd<dist[v]){dist[v]=nd;par[v]=u;h.push([nd,v])}}}return{dist,par}}
const pathTo=(par,t)=>{const p=[];for(;t!==null;t=par[t])p.push(t);return p.reverse()};

function selGreedy(it,T,B){const s=[...it].sort((a,b)=>b.v/b.d-a.v/a.d);let t=0,c=0;const r=[];
 for(const a of s)if(t+a.d<=T&&c+a.c<=B){r.push(a);t+=a.d;c+=a.c}return r}
function selKnap1(it,T){const n=it.length,W=T+1,dp=new Int32Array((n+1)*W);
 for(let i=1;i<=n;i++){const a=it[i-1];for(let t=0;t<=T;t++){let b=dp[(i-1)*W+t];if(a.d<=t)b=Math.max(b,a.v+dp[(i-1)*W+t-a.d]);dp[i*W+t]=b}}
 const r=[];let t=T;for(let i=n;i>0;i--)if(dp[i*W+t]!==dp[(i-1)*W+t]){r.push(it[i-1]);t-=it[i-1].d}return r.reverse()}
function selKnap2(it,T,B){const n=it.length,bc=Math.floor(B/BU),W=T+1,X=bc+1,S=W*X,dp=new Int32Array((n+1)*S);
 for(let i=1;i<=n;i++){const a=it[i-1],ci=Math.ceil(a.c/BU);
  for(let t=0;t<=T;t++)for(let b=0;b<=bc;b++){let v=dp[(i-1)*S+t*X+b];
   if(a.d<=t&&ci<=b)v=Math.max(v,a.v+dp[(i-1)*S+(t-a.d)*X+b-ci]);dp[i*S+t*X+b]=v}}
 const r=[];let t=T,b=bc;for(let i=n;i>0;i--)if(dp[i*S+t*X+b]!==dp[(i-1)*S+t*X+b]){const a=it[i-1];r.push(a);t-=a.d;b-=Math.ceil(a.c/BU)}return r.reverse()}
function selBrute(it,T,B){const n=it.length;if(n>20)return null;let best=-1,bm=0;
 for(let m=0;m<(1<<n);m++){let v=0,d=0,c=0;for(let i=0;i<n;i++)if(m>>i&1){v+=it[i].v;d+=it[i].d;c+=Math.ceil(it[i].c/BU)*BU}
  if(d<=T&&c<=B&&v>best){best=v;bm=m}}return it.filter((_,i)=>bm>>i&1)}

function orderRoute(sel,g,start){const rem=[...sel],legs=[];let cur=start,travel=0;
 while(rem.length){const{dist,par}=dijkstra(g,cur);let bi=0;rem.forEach((a,i)=>{if(dist[a.node]<dist[rem[bi].node])bi=i});
  const a=rem.splice(bi,1)[0];legs.push({a,path:pathTo(par,a.node),min:dist[a.node]});travel+=dist[a.node];cur=a.node}
 return{legs,travel}}

function plan(items,g,start,Hm,B,method){const t0=performance.now(),{dist}=dijkstra(g,start);
 const ok=items.filter(a=>dist[a.node]<Infinity),bad=items.filter(a=>dist[a.node]===Infinity);
 let T=Math.floor(Hm/U),sel,r;
 for(;;){sel=method==="greedy"?selGreedy(ok,T,B):method==="knap1"?selKnap1(ok,T):method==="brute"?selBrute(ok,T,B):selKnap2(ok,T,B);
  if(sel===null)return{skipped:true};
  r=orderRoute(sel,g,start);if(r.travel+sel.reduce((s,a)=>s+a.d*U,0)<=Hm||T<=0)break;T--}
 const value=sel.reduce((s,a)=>s+a.v,0),cost=sel.reduce((s,a)=>s+a.c,0),visit=sel.reduce((s,a)=>s+a.d*U,0);
 return{sel,bad,legs:r.legs,value,cost,visit,travel:r.travel,total:visit+r.travel,feasible:cost<=B&&visit+r.travel<=Hm,ms:performance.now()-t0}}

