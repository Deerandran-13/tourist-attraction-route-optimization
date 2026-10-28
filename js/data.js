/* ---------- Sample data (edit freely) ---------- */
const NODES={H:{n:"Hotel (start)",x:70,y:200},VOC:{n:"VOC Park and Zoo",x:210,y:290},GAS:{n:"Forest Museum",x:340,y:335},
 PER:{n:"Perur Temple",x:100,y:345},GDN:{n:"GD Naidu Museum",x:230,y:120},MM:{n:"Marudhamalai",x:380,y:55},
 BT:{n:"Black Thunder",x:520,y:125},AY:{n:"Adiyogi",x:570,y:240},SIR:{n:"Siruvani Falls",x:620,y:335},VAL:{n:"Valparai View",x:640,y:50},
 RC:{n:"Race Course Walk",x:120,y:75},BOT:{n:"Botanical Garden",x:330,y:205},KUT:{n:"Kovai Kutralam",x:455,y:295}};
const EDGES=[["H","VOC",15],["H","GDN",20],["VOC","GDN",10],["VOC","GAS",12],["H","PER",25],["PER","VOC",18],["H","MM",35],["MM","BT",30],
 ["BT","AY",25],["AY","SIR",20],["GAS","SIR",40],["GDN","AY",45],["MM","GDN",30],
 ["H","RC",12],["RC","GDN",10],["GAS","KUT",25],["KUT","AY",30],["GDN","BOT",15],["VOC","BOT",14]];
// value 1-10, cost in rupees, duration in 30-minute units
const ATTR=[{id:1,name:"VOC Park and Zoo",node:"VOC",v:7,c:50,d:2},{id:2,name:"Marudhamalai Temple",node:"MM",v:8,c:0,d:3},
 {id:3,name:"Adiyogi Statue",node:"AY",v:9,c:0,d:3},{id:4,name:"Black Thunder Park",node:"BT",v:8,c:900,d:6},
 {id:5,name:"Siruvani Waterfalls",node:"SIR",v:9,c:100,d:4},{id:6,name:"GD Naidu Museum",node:"GDN",v:6,c:80,d:2},
 {id:7,name:"Perur Pateeswarar Temple",node:"PER",v:6,c:0,d:2},{id:8,name:"Forest Museum",node:"GAS",v:5,c:30,d:1},
 {id:9,name:"Valparai Viewpoint",node:"VAL",v:10,c:0,d:3},
 {id:10,name:"Race Course Walkway",node:"RC",v:4,c:0,d:2},{id:11,name:"Botanical Garden",node:"BOT",v:5,c:20,d:2},
 {id:12,name:"Kovai Kutralam Falls",node:"KUT",v:7,c:60,d:3}];
const U=30,BU=10; // minutes per time unit, rupees per budget unit

