/* H.O.S - Harun Online Stationary | app logic (demo: payments are simulated) */
(function(){
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const tsh=n=>'TSh '+Math.round(n).toLocaleString('en-US');
/* ---------- product art (inline SVG, no external images) ---------- */
function art(t,c){
  const d='#0E1A3A';
  const s={
  notebook:`<rect x="24" y="12" width="52" height="76" rx="6" fill="${c}"/><rect x="24" y="12" width="9" height="76" rx="4" fill="${d}" opacity=".25"/><rect x="40" y="26" width="28" height="16" rx="3" fill="#fff" opacity=".9"/><path d="M40 54h28M40 62h22M40 70h25" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>`,
  pen:`<g transform="rotate(35 50 50)"><rect x="42" y="8" width="16" height="64" rx="8" fill="${c}"/><rect x="42" y="30" width="16" height="8" fill="${d}" opacity=".25"/><path d="M42 72h16l-8 20z" fill="#E9ECF8"/><path d="M47 84h6l-3 8z" fill="${d}"/><rect x="55" y="14" width="3" height="26" rx="1.5" fill="#fff" opacity=".6"/></g>`,
  pencil:`<g transform="rotate(-38 50 50)"><rect x="40" y="10" width="20" height="62" fill="${c}"/><rect x="40" y="10" width="7" height="62" fill="#fff" opacity=".25"/><rect x="40" y="10" width="20" height="9" fill="#E9A4A4"/><path d="M40 72h20l-10 20z" fill="#F4D9B0"/><path d="M45 83h10l-5 9z" fill="${d}"/></g>`,
  marker:`<g transform="rotate(-30 50 50)"><rect x="34" y="34" width="32" height="48" rx="7" fill="${c}"/><rect x="40" y="14" width="20" height="24" rx="4" fill="${d}"/><rect x="42" y="44" width="16" height="22" rx="3" fill="#fff" opacity=".85"/></g>`,
  folder:`<path d="M12 28a6 6 0 0 1 6-6h22l8 9h34a6 6 0 0 1 6 6v36a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z" fill="${c}"/><path d="M12 44h76v34a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z" fill="#fff" opacity=".28"/><rect x="40" y="56" width="20" height="6" rx="3" fill="#fff"/>`,
  stapler:`<path d="M14 58h72v14a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="${d}"/><path d="M16 56c0-14 10-22 26-24l42-6c3 0 4 3 2 5l-4 6c-4 6-12 8-22 10z" fill="${c}"/><rect x="62" y="70" width="14" height="3" rx="1.5" fill="#fff" opacity=".7"/>`,
  calc:`<rect x="22" y="10" width="56" height="80" rx="9" fill="${d}"/><rect x="29" y="17" width="42" height="18" rx="4" fill="${c}"/><g fill="#fff" opacity=".85"><circle cx="35" cy="48" r="4.5"/><circle cx="50" cy="48" r="4.5"/><circle cx="65" cy="48" r="4.5"/><circle cx="35" cy="62" r="4.5"/><circle cx="50" cy="62" r="4.5"/><circle cx="65" cy="62" r="4.5"/><circle cx="35" cy="76" r="4.5"/><circle cx="50" cy="76" r="4.5"/></g><circle cx="65" cy="76" r="4.5" fill="${c}"/>`,
  paper:`<rect x="20" y="40" width="60" height="44" rx="4" fill="#fff" stroke="${d}" stroke-opacity=".2" stroke-width="2"/><rect x="20" y="30" width="60" height="44" rx="4" fill="#fff" stroke="${d}" stroke-opacity=".2" stroke-width="2"/><rect x="16" y="52" width="68" height="30" rx="4" fill="${c}"/><rect x="34" y="62" width="32" height="10" rx="3" fill="#fff" opacity=".9"/>`,
  ruler:`<g transform="rotate(-40 50 50)"><rect x="8" y="38" width="84" height="24" rx="4" fill="${c}"/><g stroke="#fff" stroke-width="2" opacity=".9"><path d="M18 38v9M28 38v6M38 38v9M48 38v6M58 38v9M68 38v6M78 38v9"/></g></g>`,
  paint:`<path d="M50 14c20 0 36 14 36 32 0 10-8 12-14 12-7 0-8 6-4 10 5 6 0 14-9 14-22 0-39-14-39-34S28 14 50 14z" fill="${c}"/><circle cx="34" cy="38" r="6" fill="#FFE14D"/><circle cx="52" cy="30" r="6" fill="#fff"/><circle cx="68" cy="40" r="6" fill="#0E1A3A"/><circle cx="30" cy="56" r="6" fill="#FF6B6B"/>`,
  bag:`<path d="M30 34c0-14 40-14 40 0" fill="none" stroke="${d}" stroke-width="5" stroke-linecap="round"/><rect x="18" y="32" width="64" height="58" rx="12" fill="${c}"/><rect x="28" y="54" width="44" height="22" rx="6" fill="#fff" opacity=".25"/><rect x="44" y="62" width="12" height="6" rx="3" fill="#fff"/>`
  };
  return `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">${s[t]||s.notebook}</svg>`;
}
const CATS=[
 {id:'notebooks',name:'Notebooks',sub:'Ruled, plain, hardcover',t:'notebook',c:'#2B4BFF'},
 {id:'writing',name:'Pens & Pencils',sub:'Smooth and long lasting',t:'pen',c:'#E5484D'},
 {id:'office',name:'Office',sub:'Files, staplers, paper',t:'folder',c:'#F59E0B'},
 {id:'art',name:'Art & Craft',sub:'Colour, draw, create',t:'paint',c:'#8B5CF6'},
 {id:'school',name:'School',sub:'Bags, rulers, kits',t:'bag',c:'#0E9F6E'}];
const P=[
 {id:1,n:'A4 Hardcover Notebook',cat:'notebooks',t:'notebook',c:'#2B4BFF',p:6500,o:null,pop:98,u:'200 pages'},
 {id:2,n:'Spiral Notebook 5 pack',cat:'notebooks',t:'notebook',c:'#0E9F6E',p:14000,o:17500,pop:90,u:'5 x 100 pages'},
 {id:3,n:'Pocket Journal',cat:'notebooks',t:'notebook',c:'#E5484D',p:3800,o:null,pop:60,u:'A6, 120 pages'},
 {id:4,n:'Gel Pens, Box of 12',cat:'writing',t:'pen',c:'#8B5CF6',p:9500,o:12000,pop:95,u:'0.5mm'},
 {id:5,n:'HB Pencils, Pack of 24',cat:'writing',t:'pencil',c:'#F59E0B',p:5200,o:null,pop:80,u:'with eraser tip'},
 {id:6,n:'Highlighter Set of 6',cat:'writing',t:'marker',c:'#F5C400',p:7800,o:9800,pop:85,u:'chisel tip'},
 {id:7,n:'Ballpoint Pens, Box of 50',cat:'writing',t:'pen',c:'#2B4BFF',p:12500,o:null,pop:88,u:'blue ink'},
 {id:8,n:'Document File Folders x10',cat:'office',t:'folder',c:'#F59E0B',p:8900,o:null,pop:70,u:'A4, assorted'},
 {id:9,n:'Heavy Duty Stapler',cat:'office',t:'stapler',c:'#E5484D',p:11000,o:13500,pop:55,u:'with 1000 staples'},
 {id:10,n:'A4 Copy Paper Ream',cat:'office',t:'paper',c:'#2B4BFF',p:13500,o:null,pop:99,u:'500 sheets, 80gsm'},
 {id:11,n:'Scientific Calculator',cat:'school',t:'calc',c:'#34D399',p:24000,o:29000,pop:92,u:'240 functions'},
 {id:12,n:'Geometry Set',cat:'school',t:'ruler',c:'#0E9F6E',p:6800,o:null,pop:66,u:'9 pieces'},
 {id:13,n:'Student Backpack',cat:'school',t:'bag',c:'#2B4BFF',p:38000,o:46000,pop:84,u:'25 litres'},
 {id:14,n:'Watercolour Paint Set',cat:'art',t:'paint',c:'#8B5CF6',p:16500,o:null,pop:72,u:'24 colours'},
 {id:15,n:'Permanent Markers x12',cat:'art',t:'marker',c:'#E5484D',p:10200,o:null,pop:58,u:'fine and bold'},
 {id:16,n:'Desk Organiser',cat:'office',t:'folder',c:'#0E9F6E',p:15800,o:19000,pop:50,u:'5 compartments'}];
const byId=id=>P.find(p=>p.id===id);
const DAY=864e5;
const fmtD=t=>new Date(t).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
/* ---------- state ---------- */
const KEY='hos-demo-v1';
const now=Date.now();
let S={cart:{},wish:[2,11],wallet:42500,
 orders:[
  {id:'HOS-20418',t:now-9*DAY,items:[{id:1,q:2},{id:4,q:1}],total:22500+0,st:3,pay:'M-Pesa'},
  {id:'HOS-20533',t:now-4*DAY,items:[{id:13,q:1},{id:12,q:1}],total:44800+3000,st:3,pay:'Wallet'},
  {id:'HOS-20690',t:now-1*DAY,items:[{id:10,q:2},{id:6,q:1}],total:34800+3000,st:1,pay:'Tigo Pesa'}],
 tx:[
  {d:now-12*DAY,l:'Wallet top up (M-Pesa)',a:60000},{d:now-9*DAY,l:'Order HOS-20418',a:-22500},
  {d:now-4*DAY,l:'Order HOS-20533',a:-47800},{d:now-3*DAY,l:'Refund: geometry set swap',a:10000},
  {d:now-2*DAY,l:'Wallet top up (Airtel Money)',a:42800}],
 prof:{name:'Amina Juma',phone:'0712 345 678',email:'amina.juma@example.com',addr:'Mikocheni B, Dar es Salaam'}};
try{const r=JSON.parse(localStorage.getItem(KEY)||'null');if(r&&r.orders)S=r}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
let toastT;const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2400)};
/* ---------- hero art ---------- */
$('#hf1').innerHTML=art('notebook','#2B4BFF');$('#hf2').innerHTML=art('pen','#E5484D');$('#hf3').innerHTML=art('calc','#34D399');
/* ---------- categories + shop ---------- */
let cat=null,query='',sort='pop';
$('#cats').innerHTML=CATS.map(c=>`<button class="cat" data-c="${c.id}" aria-pressed="false"><div style="background:${c.c}22;border-radius:12px;margin-bottom:8px;display:grid;place-items:center;height:78px">${art(c.t,c.c).replace('<svg','<svg style="height:62px;width:auto;margin:0"')}</div><b>${c.name}</b><span>${c.sub}</span></button>`).join('');
$('#cats').addEventListener('click',e=>{const b=e.target.closest('.cat');if(!b)return;cat=cat===b.dataset.c?null:b.dataset.c;renderShop();$('#shop').scrollIntoView({behavior:'smooth'})});
$('#q').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();if(location.hash!=='#home')location.hash='#home';renderShop()});
$('#sort').addEventListener('change',e=>{sort=e.target.value;renderShop()});
function renderShop(){
  $$('.cat').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.c===cat)));
  let L=P.filter(p=>(!cat||p.cat===cat)&&(!query||(p.n+' '+p.u+' '+p.cat).toLowerCase().includes(query)));
  L.sort({pop:(a,b)=>b.pop-a.pop,lo:(a,b)=>a.p-b.p,hi:(a,b)=>b.p-a.p,az:(a,b)=>a.n.localeCompare(b.n)}[sort]);
  const cn=cat?CATS.find(c=>c.id===cat).name:'All products';
  $('#shop-title').textContent=cn;$('#shop-count').textContent=L.length+' item'+(L.length===1?'':'s')+' available';
  $('#grid').innerHTML=L.length?L.map(p=>{const bg=p.c+'20',off=p.o?Math.round((1-p.p/p.o)*100):0,w=S.wish.includes(p.id);
   return `<article class="card"><div class="art" style="background:${bg}">${off?`<span class="tag">-${off}%</span>`:''}<button class="heart" data-w="${p.id}" aria-pressed="${w}" aria-label="Save ${p.n} to wishlist"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.800-8 11-8 11z"/></svg></button>${art(p.t,p.c)}</div>
   <div class="body"><h3>${p.n}</h3><span class="meta">${p.u}</span><div class="price"><b class="num">${tsh(p.p)}</b>${p.o?`<s class="num">${tsh(p.o)}</s>`:''}</div><button class="btn btn-pri btn-sm" data-add="${p.id}">Add to cart</button></div></article>`}).join(''):`<div class="empty">No products match "${query}". Try another word.</div>`;
}
$('#grid').addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');if(a){add(+a.dataset.add);return}
  const w=e.target.closest('[data-w]');if(w){const id=+w.dataset.w;S.wish=S.wish.includes(id)?S.wish.filter(x=>x!==id):[...S.wish,id];save();w.setAttribute('aria-pressed',String(S.wish.includes(id)));toast(S.wish.includes(id)?'Saved to wishlist':'Removed from wishlist')}});
/* ---------- cart ---------- */
const cartItems=()=>Object.entries(S.cart).map(([id,q])=>({p:byId(+id),q})).filter(x=>x.p&&x.q>0);
const sub=()=>cartItems().reduce((s,x)=>s+x.p.p*x.q,0);
const SHIP=3000;
function add(id){S.cart[id]=(S.cart[id]||0)+1;save();renderCart();toast('Added: '+byId(id).n)}
function renderCart(){
  const L=cartItems(),n=L.reduce((s,x)=>s+x.q,0);
  $('#cartn').textContent=n;$('#cartn').style.display=n?'grid':'none';
  $('#cartlist').innerHTML=L.length?L.map(({p,q})=>`<div class="li"><div class="th" style="background:${p.c}22">${art(p.t,p.c)}</div><div><b>${p.n}</b><span class="num">${tsh(p.p)}</span><div class="qty"><button data-m="${p.id}" aria-label="Less">-</button><output class="num">${q}</output><button data-pl="${p.id}" aria-label="More">+</button></div></div><button class="btn btn-ghost btn-sm" data-rm="${p.id}" aria-label="Remove ${p.n}">Remove</button></div>`).join(''):`<div class="empty" style="padding:60px 0">Your cart is empty.<br><br><button class="btn btn-pri" id="shopfromcart">Start shopping</button></div>`;
  const s=sub();
  $('#cartft').innerHTML=L.length?`<div class="row"><span>Subtotal</span><b class="num">${tsh(s)}</b></div><div class="row"><span>Delivery</span><b class="num">${s>=50000?'Free':tsh(SHIP)}</b></div><div class="row tot"><span>Total</span><span class="num">${tsh(s+(s>=50000?0:SHIP))}</span></div><button class="btn btn-hl" id="gocheck">Checkout securely</button><small style="color:var(--muted);text-align:center">Free delivery on orders from TSh 50,000</small>`:'';
}
$('#cartlist').addEventListener('click',e=>{
  const m=e.target.closest('[data-m]'),pl=e.target.closest('[data-pl]'),rm=e.target.closest('[data-rm]');
  if(m){const i=m.dataset.m;S.cart[i]=Math.max(0,S.cart[i]-1);if(!S.cart[i])delete S.cart[i]}
  else if(pl){S.cart[pl.dataset.pl]++}
  else if(rm){delete S.cart[rm.dataset.rm]}
  else if(e.target.id==='shopfromcart'){closeAll();location.hash='#home';return}
  else return;
  save();renderCart()});
const openCart=()=>{$('#drawer').classList.add('on');$('#scrim').classList.add('on')};
function closeAll(){$('#drawer').classList.remove('on');$('#scrim').classList.remove('on');$('#modal').classList.remove('on')}
$('#cartbtn').onclick=openCart;$('#cartx').onclick=closeAll;
$('#scrim').onclick=()=>{if($('#modal').classList.contains('on')&&ck.step===3)return;closeAll()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!(ck&&ck.step===3&&$('#modal').classList.contains('on')))closeAll()});
/* ---------- countdown ---------- */
let end=now+(5*3600+42*60)*1000;
setInterval(()=>{let d=Math.max(0,end-Date.now());const h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3),p=x=>String(x).padStart(2,'0');
 $('#cd-h').firstChild.nodeValue=p(h);$('#cd-m').firstChild.nodeValue=p(m);$('#cd-s').firstChild.nodeValue=p(s)},1000);
/* ---------- checkout ---------- */
const PAYS=[
 {id:'mpesa',n:'M-Pesa',s:'Vodacom',c:'#00A651',ab:'M',mm:1},{id:'tigo',n:'Tigo Pesa',s:'Mobile money',c:'#0A5EB7',ab:'T',mm:1},
 {id:'airtel',n:'Airtel Money',s:'Mobile money',c:'#E4002B',ab:'A',mm:1},{id:'halo',n:'HaloPesa',s:'Halotel',c:'#F58220',ab:'H',mm:1},
 {id:'card',n:'Card',s:'Visa or Mastercard',c:'#0E1A3A',ab:'VISA'},{id:'wallet',n:'H.O.S Wallet',s:'Instant',c:'#2B4BFF',ab:'W'}];
let ck={step:1,pay:'mpesa',f:{name:S.prof.name,phone:S.prof.phone,addr:S.prof.addr,slot:'Today, 3 to 6 pm'},err:''};
const ship=()=>sub()>=50000?0:SHIP, grand=()=>sub()+ship();
function openCheckout(){if(!cartItems().length)return;ck={step:1,pay:'mpesa',f:{name:S.prof.name,phone:S.prof.phone,addr:S.prof.addr,slot:'Today, 3 to 6 pm'},err:''};
  $('#drawer').classList.remove('on');$('#scrim').classList.remove('on');$('#modal').classList.add('on');renderCk()}
document.addEventListener('click',e=>{if(e.target.id==='gocheck')openCheckout()});
$('#modal').addEventListener('click',e=>{if(e.target===$('#modal')&&ck.step!==3)closeAll()});
function sidePanel(){
  return `<h3 style="font-size:18px;margin-bottom:12px">Order summary</h3>${cartItems().map(({p,q})=>`<div class="row" style="font-size:14px;margin-bottom:6px"><span>${q} x ${p.n}</span><span class="num">${tsh(p.p*q)}</span></div>`).join('')}
  <hr style="border:0;border-top:1px dashed var(--line);margin:12px 0"><div class="row"><span>Subtotal</span><span class="num">${tsh(sub())}</span></div><div class="row"><span>Delivery</span><span class="num">${ship()?tsh(ship()):'Free'}</span></div>
  <div class="row tot" style="margin-top:8px"><span>To pay</span><span class="num">${tsh(grand())}</span></div>
  <p style="font-size:12px;color:var(--muted);margin-top:14px">Demo store: no real money moves. Payments here are simulated.</p>`}
function renderCk(){
  const m=$('#mmain'),f=ck.f;$('#mside').innerHTML=sidePanel();
  const bar=`<div class="steps"><i class="on"></i><i class="${ck.step>=2?'on':''}"></i><i class="${ck.step>=3?'on':''}"></i></div>`;
  if(ck.step===1){
    m.innerHTML=`${bar}<h2 style="font-size:26px;margin-bottom:4px">Delivery details</h2><p style="color:var(--muted);margin-bottom:16px">Where should we bring your order?</p>
    <div class="fld"><label for="f-name">Full name</label><input id="f-name" value="${f.name}" autocomplete="name"></div>
    <div class="two"><div class="fld"><label for="f-phone">Phone number</label><input id="f-phone" value="${f.phone}" inputmode="tel" autocomplete="tel"></div>
    <div class="fld"><label for="f-slot">Delivery time</label><select id="f-slot">${['Today, 3 to 6 pm','Tomorrow, 9 am to 12','Tomorrow, 3 to 6 pm'].map(s=>`<option ${s===f.slot?'selected':''}>${s}</option>`).join('')}</select></div></div>
    <div class="fld"><label for="f-addr">Delivery address</label><input id="f-addr" value="${f.addr}" autocomplete="street-address"></div>
    <p style="color:var(--bad);min-height:20px;font-size:13px" id="cker">${ck.err}</p>
    <div style="display:flex;gap:10px;justify-content:space-between;flex-wrap:wrap"><button class="btn btn-ghost" id="ck-x">Cancel</button><button class="btn btn-pri" id="ck-n1">Continue to payment</button></div>`}
  else if(ck.step===2){
    const P2=PAYS.find(x=>x.id===ck.pay);
    m.innerHTML=`${bar}<h2 style="font-size:26px;margin-bottom:4px">Choose how to pay</h2><p style="color:var(--muted);margin-bottom:16px">Total <b class="num">${tsh(grand())}</b></p>
    <div class="pays">${PAYS.map(x=>`<button class="pay" data-pay="${x.id}" aria-pressed="${x.id===ck.pay}"><span class="dot" style="background:${x.c}">${x.ab}</span><span><b>${x.n}</b><span>${x.id==='wallet'?'Balance '+tsh(S.wallet):x.s}</span></span></button>`).join('')}</div>
    ${P2.mm?`<div class="fld"><label for="p-no">${P2.n} number</label><input id="p-no" value="${f.phone}" inputmode="tel"></div><p style="font-size:13px;color:var(--muted)">You will get a prompt on your phone to confirm with your PIN.</p>`:''}
    ${P2.id==='card'?`<div class="fld"><label for="c-no">Card number</label><input id="c-no" inputmode="numeric" placeholder="4242 4242 4242 4242" maxlength="19"></div><div class="two"><div class="fld"><label for="c-ex">Expiry</label><input id="c-ex" placeholder="MM/YY" maxlength="5"></div><div class="fld"><label for="c-cv">CVV</label><input id="c-cv" inputmode="numeric" maxlength="4" placeholder="123"></div></div>`:''}
    ${P2.id==='wallet'?`<p style="font-size:14px">${S.wallet>=grand()?`Paying from your wallet leaves <b class="num">${tsh(S.wallet-grand())}</b>.`:`<span style="color:var(--bad)">Your wallet has ${tsh(S.wallet)}. Top it up in your dashboard or pick another method.</span>`}</p>`:''}
    <p style="color:var(--bad);min-height:20px;font-size:13px" id="cker">${ck.err}</p>
    <div style="display:flex;gap:10px;justify-content:space-between;flex-wrap:wrap"><button class="btn btn-ghost" id="ck-b">Back</button><button class="btn btn-hl" id="ck-pay" ${P2.id==='wallet'&&S.wallet<grand()?'disabled':''}>Pay ${tsh(grand())}</button></div>`}
}
$('#mmain').addEventListener('click',e=>{
  const t=e.target.closest('button');if(!t)return;
  if(t.id==='ck-x')closeAll();
  if(t.id==='ck-n1'){const g=i=>$(i).value.trim();ck.f={name:g('#f-name'),phone:g('#f-phone'),addr:g('#f-addr'),slot:$('#f-slot').value};
    if(!ck.f.name||ck.f.phone.replace(/\D/g,'').length<9||ck.f.addr.length<4){ck.err='Enter your name, a valid phone number and a delivery address.';renderCk();return}
    ck.err='';ck.step=2;renderCk()}
  if(t.id==='ck-b'){ck.step=1;ck.err='';renderCk()}
  if(t.dataset.pay){ck.pay=t.dataset.pay;ck.err='';renderCk()}
  if(t.id==='ck-pay')startPay();
  if(t.id==='ck-view'){closeAll();location.hash='#dashboard';dtab='orders';renderDash()}
  if(t.id==='ck-more'){closeAll();location.hash='#home'}});
function startPay(){
  const P2=PAYS.find(x=>x.id===ck.pay);
  if(P2.id==='card'){const n=$('#c-no').value.replace(/\D/g,''),ex=$('#c-ex').value,cv=$('#c-cv').value;
    if(n.length<13||!/^\d\d\/\d\d$/.test(ex)||cv.length<3){ck.err='Check your card number, expiry (MM/YY) and CVV.';renderCk();return}}
  if(P2.mm){const v=$('#p-no').value.replace(/\D/g,'');if(v.length<9){ck.err='Enter the phone number linked to '+P2.n+'.';renderCk();return}ck.f.phone=$('#p-no').value}
  ck.step=3;$('.steps').outerHTML='';
  $('#mmain').innerHTML=`<div class="steps"><i class="on"></i><i class="on"></i><i class="on"></i></div><div class="proc"><div class="ring"><svg viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="46"/><circle class="fg" id="rfg" cx="50" cy="50" r="46"/></svg><div class="ck" id="rck"></div></div><h2 style="font-size:24px" id="ptitle">Contacting ${P2.n}...</h2><p style="color:var(--muted);margin-top:6px" id="psub">Please keep this window open.</p><div id="pextra"></div></div>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const r=$('#rfg');if(r)r.style.strokeDashoffset='0'}));
  const mm=P2.mm,seq=[];
  if(mm){seq.push([900,()=>{$('#ptitle').textContent='Check your phone';$('#psub').textContent='Enter your '+P2.n+' PIN to approve '+tsh(grand());$('#pextra').innerHTML=`<div class="phone">${P2.n}: Pay ${tsh(grand())} to HARUN ONLINE STATIONARY? Enter PIN to confirm.</div>`}]);}
  else seq.push([900,()=>{$('#ptitle').textContent=P2.id==='card'?'Verifying your card':'Checking wallet balance'}]);
  seq.push([2500,()=>{$('#ptitle').textContent='Confirming payment';$('#psub').textContent='Almost done...';$('#pextra').innerHTML=''}]);
  seq.push([3000,()=>finish(P2)]);
  let acc=0;seq.forEach(([d,fn])=>{acc=d>acc?d:acc+400;setTimeout(fn,acc)});
}
function finish(P2){
  const id='HOS-'+(20700+S.orders.length*7+Math.floor(Math.random()*6)),tot=grand();
  const items=cartItems().map(({p,q})=>({id:p.id,q}));
  S.orders.unshift({id,t:Date.now(),items,total:tot,st:0,pay:P2.n});
  if(P2.id==='wallet'){S.wallet-=tot;S.tx.unshift({d:Date.now(),l:'Order '+id,a:-tot})}
  S.cart={};save();renderCart();updWal();
  $('#rck').textContent='✓';$('#ptitle').textContent='Payment received';$('#psub').textContent='Thank you, '+ck.f.name.split(' ')[0]+'. Your order is confirmed.';
  $('#pextra').innerHTML=`<div class="receipt"><div class="row"><span>Order</span><b>${id}</b></div><div class="row"><span>Paid with</span><b>${P2.n}</b></div><div class="row"><span>Amount</span><b class="num" style="color:var(--ok)">${tsh(tot)}</b></div><div class="row"><span>Delivery</span><b>${ck.f.slot}</b></div><div class="row"><span>To</span><b style="text-align:right">${ck.f.addr}</b></div></div>
  <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn btn-pri" id="ck-view">Track my order</button><button class="btn btn-ghost" id="ck-more">Keep shopping</button></div>`;
  coins();
}
function coins(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  for(let i=0;i<34;i++){const c=document.createElement('div');c.className='coin';c.style.left=Math.random()*100+'vw';c.style.animationDuration=(1.6+Math.random()*1.6)+'s';c.style.animationDelay=Math.random()*.6+'s';c.style.transform='scale('+(.6+Math.random()*.8)+')';document.body.appendChild(c);setTimeout(()=>c.remove(),4200)}}
function updWal(){$('#walhd').textContent=tsh(S.wallet)}
/* ---------- dashboard ---------- */
let dtab='overview',topAmt=20000,topVia='mpesa';
const ST=['Placed','Packed','On the way','Delivered'];
const IC={overview:'<path d="M3 12 12 4l9 8M5 10v10h14V10"/>',orders:'<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',wallet:'<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M16 13h2M3 10h18"/>',wishlist:'<path d="M12 21s-8-5.200-8-11a4.600 4.600 0 0 1 8-3 4.600 4.600 0 0 1 8 3c0 5.800-8 11-8 11z"/>',profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'};
const TABS=[['overview','Overview'],['orders','My orders'],['wallet','Wallet'],['wishlist','Wishlist'],['profile','Profile']];
const itemsTxt=o=>o.items.map(i=>i.q+' x '+byId(i.id).n).join(', ');
function chart(){
  const mo=new Date(),cur=mo.getMonth(),yr=mo.getFullYear();
  const names=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hist=[38500,62000,27500,84000,51500];
  const thisM=S.orders.filter(o=>{const d=new Date(o.t);return d.getMonth()===cur&&d.getFullYear()===yr}).reduce((s,o)=>s+o.total,0);
  const data=hist.map((v,i)=>({l:names[(cur-5+i+12)%12],v})).concat([{l:names[cur],v:thisM}]);
  const max=Math.max(...data.map(d=>d.v)),top=Math.ceil(max/50000)*50000||50000,W=520,H=230,L=46,B=28,T=14,bw=38,gap=(W-L-10-bw*6)/5;
  const y=v=>T+(H-T-B)*(1-v/top);
  let g='';for(let i=0;i<=4;i++){const v=top/4*i;g+=`<line x1="${L}" x2="${W-6}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-8}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${v>=1000?v/1000+'k':v}</text>`}
  data.forEach((d,i)=>{const x=L+8+i*(bw+gap),last=i===5;g+=`<rect x="${x}" y="${y(d.v)}" width="${bw}" height="${H-B-y(d.v)}" rx="7" fill="${last?'var(--brand)':'var(--chip)'}" stroke="${last?'none':'var(--line)'}"/><text x="${x+bw/2}" y="${H-9}" text-anchor="middle" font-size="12" fill="var(--muted)">${d.l}</text>`;
    if(last)g+=`<text x="${x+bw/2}" y="${y(d.v)-6}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">${Math.round(d.v/1000)}k</text>`});
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Spending per month in TSh, last six months">${g}</svg>`}
function trackHtml(o){return `<div class="track">${ST.map((s,i)=>`<div class="${i<=o.st?'d':''}">${s}</div>`).join('')}</div>`}
function orderRows(L){return L.map(o=>`<tr><td><b>${o.id}</b></td><td>${fmtD(o.t)}</td><td class="num">${tsh(o.total)}</td><td><span class="pill ${o.st===3?'ok':'warn'}">${ST[o.st]}</span></td></tr>`).join('')}
const VIEW={
 overview(){const spent=S.orders.reduce((s,o)=>s+o.total,0),act=S.orders.filter(o=>o.st<3).length;
  return `<div class="kpis"><div class="kpi money"><span>Wallet balance</span><b class="num">${tsh(S.wallet)}</b></div><div class="kpi"><span>Total spent</span><b class="num">${tsh(spent)}</b></div><div class="kpi"><span>Orders placed</span><b class="num">${S.orders.length}</b></div><div class="kpi"><span>On the way now</span><b class="num">${act}</b></div></div>
  <div class="cols"><div class="box"><h3>Spending, last 6 months (TSh)</h3>${chart()}</div>
  <div class="box"><h3>Latest order</h3>${S.orders[0]?`<b>${S.orders[0].id}</b> <span class="pill ${S.orders[0].st===3?'ok':'warn'}">${ST[S.orders[0].st]}</span><p style="color:var(--muted);font-size:13.5px;margin-top:6px">${itemsTxt(S.orders[0])}</p>${trackHtml(S.orders[0])}`:'<p>No orders yet.</p>'}</div></div>
  <div class="box"><h3>Recent orders</h3><div class="tw"><table><thead><tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th></tr></thead><tbody>${orderRows(S.orders.slice(0,4))}</tbody></table></div></div>`},
 orders(){return `<div class="box"><h3>All orders</h3>${S.orders.map(o=>`<div class="order"><div class="row" style="flex-wrap:wrap"><div><b>${o.id}</b><div style="font-size:12.5px;color:var(--muted)">${fmtD(o.t)} · Paid with ${o.pay}</div></div><div style="text-align:right"><b class="num">${tsh(o.total)}</b><div><span class="pill ${o.st===3?'ok':'warn'}">${ST[o.st]}</span></div></div></div><p style="font-size:13.5px;color:var(--muted);margin-top:8px">${itemsTxt(o)}</p>${trackHtml(o)}<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-reorder="${o.id}">Order again</button></div></div>`).join('')}</div>`},
 wallet(){const amts=[10000,20000,50000,100000];
  return `<div class="cols"><div class="wcard"><span style="color:var(--deep-mute);font-size:13px">H.O.S Wallet balance</span><b class="num">${tsh(S.wallet)}</b><span style="font-size:13px;color:var(--deep-mute)">${S.prof.name} · Pay instantly at checkout</span></div>
  <div class="box"><h3>Add money</h3><div class="amts" id="amts">${amts.map(a=>`<button data-amt="${a}" aria-pressed="${a===topAmt}" class="num">${tsh(a)}</button>`).join('')}</div>
  <div class="fld"><label for="topvia">Pay with</label><select id="topvia">${PAYS.filter(x=>x.mm).map(x=>`<option value="${x.id}" ${x.id===topVia?'selected':''}>${x.n}</option>`).join('')}</select></div>
  <button class="btn btn-hl" id="topbtn" style="width:100%">Top up ${tsh(topAmt)}</button></div></div>
  <div class="box"><h3>Transactions</h3><div class="tw"><table><thead><tr><th>Date</th><th>Details</th><th style="text-align:right">Amount</th></tr></thead><tbody>${S.tx.map(t=>`<tr><td>${fmtD(t.d)}</td><td>${t.l}</td><td class="num ${t.a>0?'plus':'minus'}" style="text-align:right">${t.a>0?'+':'-'} ${tsh(Math.abs(t.a))}</td></tr>`).join('')}</tbody></table></div></div>`},
 wishlist(){return `<div class="box"><h3>Saved items (${S.wish.length})</h3>${S.wish.length?`<div class="grid">${S.wish.map(byId).filter(Boolean).map(p=>`<article class="card"><div class="art" style="background:${p.c}20">${art(p.t,p.c)}</div><div class="body"><h3>${p.n}</h3><div class="price"><b class="num">${tsh(p.p)}</b></div><button class="btn btn-pri btn-sm" data-add="${p.id}">Add to cart</button><button class="btn btn-ghost btn-sm" style="margin-top:6px" data-unw="${p.id}">Remove</button></div></article>`).join('')}</div>`:'<p style="color:var(--muted)">Tap the heart on any product to save it here.</p>'}</div>`},
 profile(){const p=S.prof;return `<div class="box"><h3>Profile and delivery address</h3><div class="two"><div class="fld"><label for="pf-n">Full name</label><input id="pf-n" value="${p.name}"></div><div class="fld"><label for="pf-p">Phone</label><input id="pf-p" value="${p.phone}"></div></div><div class="fld"><label for="pf-e">Email</label><input id="pf-e" value="${p.email}"></div><div class="fld"><label for="pf-a">Default delivery address</label><input id="pf-a" value="${p.addr}"></div><button class="btn btn-pri" id="pfsave">Save changes</button></div>`}};
function renderDash(){
  $('#sidenav').innerHTML=TABS.map(([k,n])=>`<button role="tab" data-t="${k}" aria-selected="${k===dtab}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>${n}</button>`).join('');
  $('#panel').innerHTML=VIEW[dtab]();$('.ava').textContent=S.prof.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();$('.me b').textContent=S.prof.name;
}
$('#sidenav').addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(b){dtab=b.dataset.t;renderDash()}});
$('#panel').addEventListener('click',e=>{
  const t=e.target.closest('button');if(!t)return;
  if(t.dataset.add){add(+t.dataset.add)}
  if(t.dataset.unw){S.wish=S.wish.filter(x=>x!==+t.dataset.unw);save();renderDash();renderShop()}
  if(t.dataset.reorder){const o=S.orders.find(x=>x.id===t.dataset.reorder);o.items.forEach(i=>S.cart[i.id]=(S.cart[i.id]||0)+i.q);save();renderCart();openCart()}
  if(t.dataset.amt){topAmt=+t.dataset.amt;renderDash()}
  if(t.id==='topbtn'){topVia=$('#topvia').value;t.disabled=true;t.textContent='Waiting for '+PAYS.find(x=>x.id===topVia).n+' PIN...';
    setTimeout(()=>{S.wallet+=topAmt;S.tx.unshift({d:Date.now(),l:'Wallet top up ('+PAYS.find(x=>x.id===topVia).n+')',a:topAmt});save();updWal();renderDash();toast('Added '+tsh(topAmt)+' to your wallet');coins()},1800)}
  if(t.id==='pfsave'){S.prof={name:$('#pf-n').value||S.prof.name,phone:$('#pf-p').value,email:$('#pf-e').value,addr:$('#pf-a').value};save();renderDash();toast('Profile saved')}});
$('#panel').addEventListener('change',e=>{if(e.target.id==='topvia')topVia=e.target.value});
/* ---------- router ---------- */
function route(){
  const h=location.hash,dash=h==='#dashboard';
  $('#view-home').hidden=dash;$('#view-dash').hidden=!dash;
  $('#nav-home').setAttribute('aria-current',dash?'false':'page');$('#nav-dash').setAttribute('aria-current',dash?'page':'false');
  if(dash){renderDash();window.scrollTo(0,0)}
  else if(h==='#shop'){const s=$('#shop');s&&s.scrollIntoView({behavior:'smooth'})}
  else window.scrollTo(0,0);
}
window.addEventListener('hashchange',()=>{closeAll();route()});
renderShop();renderCart();updWal();route();
})();
