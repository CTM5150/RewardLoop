const KEY="rewardloop-demo-v1";
const defaultState={
  screen:"home", points:7420,
  pending:1830,
  transactions:[
    {title:"Demo offer completed",amount:1250},
    {title:"Demo offer completed",amount:500},
    {title:"Welcome demo balance",amount:5670}
  ]
};
let state=JSON.parse(localStorage.getItem(KEY)||"null")||defaultState;

function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function money(points){return "$"+(points/1000).toFixed(2)}
function navActive(name){return state.screen===name||state.screen==="cashout"&&name==="wallet"?"active":""}

function render(){
  const s=document.getElementById("screen");
  if(state.screen==="home") s.innerHTML=home();
  else if(state.screen==="earn") s.innerHTML=earn();
  else if(state.screen==="wallet") s.innerHTML=wallet();
  else if(state.screen==="cashout") s.innerHTML=cashout();
  else s.innerHTML=account();
  document.querySelectorAll("[data-nav]").forEach(b=>{
    b.classList.toggle("active",b.dataset.nav===state.screen || (state.screen==="cashout"&&b.dataset.nav==="wallet"));
    b.onclick=()=>{state.screen=b.dataset.nav;save();render()}
  });
  document.querySelectorAll("[data-action]").forEach(b=>b.onclick=actions);
}
function shell(title,body){return `<h2>${title}</h2>${body}`}
function home(){
 return `<h1>RewardLoop</h1>
 <div class="balance-card">
  <div class="balance-label">YOUR BALANCE</div>
  <div class="balance">${money(state.points)}</div>
  <div class="muted">Pending rewards: ${money(state.pending)}</div>
  <div class="spacer"></div>
  <button class="btn primary full" data-action="earn">EARN NOW</button>
 </div>
 <div class="spacer"></div>
 <div class="card row"><div><b>Today's earnings</b><br><span class="muted">$1.24</span></div><div><b>Lifetime</b><br><span class="muted">${money(state.points)}</span></div></div>
 <div class="notice">Prototype mode: these are demo points. No real ads, revenue, or payouts are connected.</div>`;
}
function earn(){
 return shell("Earn Rewards",`
 <p class="muted">Choose participating offers. In this prototype, the offer below is simulated.</p>
 <div class="card">
  <div class="offer-title">Try a demo sponsored offer</div>
  <p class="muted">Complete the demo activity to test the reward flow.</p>
  <div class="row"><span class="reward">+250 points</span><button class="btn primary" data-action="complete">Complete</button></div>
 </div>
 <div class="card"><b>Real offerwall coming next</b><p class="muted small">We'll connect a legitimate offer provider only after the basic app and server-side reward accounting are ready.</p></div>`);
}
function wallet(){
 return shell("Wallet",`
 <div class="balance-card"><div class="balance-label">AVAILABLE</div><div class="balance">${money(state.points)}</div><button class="btn primary full" data-action="cashout">CASH OUT</button></div>
 <div class="spacer"></div><b>Transaction history</b>
 <div class="card">${state.transactions.map(t=>`<div class="tx row"><span>${t.title}</span><span class="reward">+${t.amount.toLocaleString()} pts</span></div>`).join("")}</div>`);
}
function cashout(){
 return shell("Cash Out",`
 <div class="card"><b>Available: ${money(state.points)}</b><p class="muted">Prototype minimum: $5.00</p>
 <input id="amount" inputmode="decimal" placeholder="Amount, e.g. 5.00">
 <input id="paypal" type="email" placeholder="PayPal email (prototype only)">
 <button class="btn primary full" data-action="request">Request payout</button>
 </div>
 <div class="notice">No money is sent in this prototype. A real payout system will be added after identity, fraud, eligibility and payment-provider requirements are addressed.</div>`);
}
function account(){
 return shell("Account",`
 <div class="card"><b>Demo account</b><p class="muted">demo@rewardloop.app</p></div>
 <div class="card">
  <p>Terms</p><p>Privacy Policy</p><p>Reward Rules</p><p>Delete Account</p>
 </div>
 <button class="btn secondary full" data-action="reset">Reset demo data</button>`);
}
function actions(e){
 const a=e.currentTarget.dataset.action;
 if(a==="earn"){state.screen="earn"}
 if(a==="cashout"){state.screen="cashout"}
 if(a==="complete"){
   state.points+=250;
   state.transactions.unshift({title:"Demo offer completed",amount:250});
 }
 if(a==="request"){
   const amount=parseFloat(document.getElementById("amount")?.value||"0");
   if(amount<5){alert("Minimum demo cash-out is $5.00.");return}
   const pts=Math.round(amount*1000);
   if(pts>state.points){alert("Not enough available points.");return}
   state.points-=pts;
   state.transactions.unshift({title:"Demo payout request",amount:-pts});
   alert("Demo payout request created. No real payment was sent.");
   state.screen="wallet";
 }
 if(a==="reset"){state=JSON.parse(JSON.stringify(defaultState))}
 save();render();
}
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
render();
