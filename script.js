const destinations=[
{name:"Beach Escape",emoji:"🏖️",desc:"Sunny coast, salty air & warm sand.",weather:"Sunny ☀️",days:3,challenge:"UV alert! Protect yourself from the sun.",essential:["Sunscreen","Sunglasses","Sandals","Towel"],good:["T-shirt","Shorts","Swimsuit"],bad:["Winter Jacket","Scarf"]},
{name:"Mountain Adventure",emoji:"🏔️",desc:"Cool air, trails & changing weather.",weather:"Cool ⛅",days:4,challenge:"Temperature can drop quickly after sunset.",essential:["Jacket","Hiking Shoes","Water Bottle","First Aid"],good:["T-shirt","Umbrella","Socks"],bad:["Sandals","Swimsuit"]},
{name:"City Explorer",emoji:"🏙️",desc:"Walk, discover, eat & explore.",weather:"Warm 🌤️",days:3,challenge:"You'll be walking a lot today.",essential:["Comfortable Shoes","Water Bottle","Power Bank"],good:["T-shirt","Sunglasses","Umbrella"],bad:["Swimsuit","Winter Jacket"]},
{name:"Rainy Trip",emoji:"🌧️",desc:"Cloudy skies and surprise showers.",weather:"Rainy 🌧️",days:3,challenge:"Rain can arrive at any moment!",essential:["Umbrella","Raincoat","Waterproof Bag"],good:["Jacket","Comfortable Shoes"],bad:["Sunglasses","Swimsuit"]},
{name:"Winter Journey",emoji:"❄️",desc:"Cold streets and snowy views.",weather:"Cold ❄️",days:5,challenge:"Keep warm—layers are your best friend.",essential:["Winter Jacket","Scarf","Socks","Gloves"],good:["Comfortable Shoes","Water Bottle"],bad:["Swimsuit","Sandals"]}
];
const items=[
["T-shirt","👕"],["Shorts","🩳"],["Sandals","🩴"],["Sunscreen","🧴"],["Sunglasses","🕶️"],["Umbrella","☂️"],["Jacket","🧥"],["Winter Jacket","🧣"],["Scarf","🧣"],["Swimsuit","🩱"],["Towel","🧻"],["Hiking Shoes","🥾"],["Comfortable Shoes","👟"],["Water Bottle","💧"],["First Aid","🩹"],["Raincoat","🌂"],["Waterproof Bag","🎒"],["Power Bank","🔋"],["Socks","🧦"],["Gloves","🧤"]
];
let selectedDestination=null, packed=[];
const $=s=>document.querySelector(s);

function renderDestinations(){
 $("#destinationGrid").innerHTML=destinations.map((d,i)=>`<article class="destination" onclick="chooseDestination(${i})"><div class="big">${d.emoji}</div><h3>${d.name}</h3><p>${d.desc}</p><small>${d.weather} · ${d.days} DAYS →</small></article>`).join("");
}
window.chooseDestination=i=>{
 selectedDestination=destinations[i]; packed=[];
 $("#destinationView").classList.remove("active");$("#packingView").classList.add("active");
 $("#tripTitle").textContent=selectedDestination.emoji+" "+selectedDestination.name;
 $("#tripMeta").textContent=`${selectedDestination.weather} · ${selectedDestination.days} days · Capacity 10 items`;
 $("#challenge").innerHTML=`⚡ <b>Travel Challenge</b><br>${selectedDestination.challenge}`;
 renderItems(); updateSuitcase(); setStep(1); window.scrollTo(0,0);
};
function renderItems(){
 $("#itemGrid").innerHTML=items.map(([name,emoji])=>`<button class="item ${packed.includes(name)?"selected":""}" onclick="toggleItem('${name}')"><span class="emoji">${emoji}</span><span>${name}</span></button>`).join("");
}
window.toggleItem=name=>{
 if(packed.includes(name)) packed=packed.filter(x=>x!==name);
 else if(packed.length<10) packed.push(name);
 else {alert("Your suitcase is full! Remove an item first.");return}
 renderItems();updateSuitcase();
};
function updateSuitcase(){
 $("#capacityText").textContent=`${packed.length} / 10`;
 $("#capacityFill").style.width=(packed.length*10)+"%";
 $("#packedItems").innerHTML=packed.length?packed.map(name=>`<span class="packed" title="${name}">${items.find(x=>x[0]===name)[1]}</span>`).join(""):`<div class="empty-state">Your suitcase is waiting...</div>`;
 $("#analyzeBtn").disabled=packed.length===0;
}
function setStep(n){document.querySelectorAll(".step").forEach((s,i)=>s.classList.toggle("active",i===n))}
window.goToDestinations=()=>{$("#packingView").classList.remove("active");$("#destinationView").classList.add("active");setStep(0)}
$("#analyzeBtn").onclick=()=>{
 const d=selectedDestination;
 const missing=d.essential.filter(x=>!packed.includes(x));
 const unnecessary=packed.filter(x=>d.bad.includes(x));
 const useful=packed.filter(x=>d.essential.includes(x)||d.good.includes(x));
 let score=Math.round((useful*12)+(d.essential.filter(x=>packed.includes(x)).length*10)-(unnecessary.length*8));
 score=Math.max(0,Math.min(100,score));
 let title=score>=90?"Travel Pro! ✈️":score>=70?"Almost Ready! 🎒":score>=45?"Needs a Little Work 🤔":"Let's Repack!";
 let message=score>=90?"Excellent choices! Your suitcase looks ready for the adventure.":score>=70?"You're nearly ready. A few smart changes could make your trip smoother.":"Your suitcase still has room for improvement. Check the missing essentials!";
 $("#packingView").classList.remove("active");$("#resultView").classList.add("active");setStep(2);
 $("#resultCard").innerHTML=`<div class="grade">PACKING SCORE</div><div class="score">${score}%</div><h1>${title}</h1><p>${message}</p><div class="result-columns"><div class="result-box"><h3>✅ GOOD CHOICES</h3><ul>${useful.length?useful.map(x=>`<li>${x}</li>`).join(""):"<li>Try adding useful items</li>"}</ul></div><div class="result-box"><h3>⚠️ MISSING</h3><ul>${missing.length?missing.map(x=>`<li>${x}</li>`).join(""):"<li>Nothing essential is missing!</li>"}</ul></div><div class="result-box"><h3>❌ MAYBE UNNECESSARY</h3><ul>${unnecessary.length?unnecessary.map(x=>`<li>${x}</li>`).join(""):"<li>Looks sensible!</li>"}</ul></div></div>`;
 window.scrollTo(0,0);
};
window.restart=()=>{packed=[];selectedDestination=null;$("#resultView").classList.remove("active");$("#destinationView").classList.add("active");setStep(0);window.scrollTo(0,0)}
$("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");$("#themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾"};
renderDestinations();
