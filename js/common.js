/* Shared helpers */
const $=id=>document.getElementById(id),G=buildGraph(Object.keys(NODES),EDGES);
const hm=m=>`${Math.floor(m/60)}h ${String(Math.round(m%60)).padStart(2,"0")}m`;
const METHODS={knap2:"Knapsack DP (time + budget)",knap1:"Knapsack DP (time only)",greedy:"Greedy",brute:"Brute force"};
