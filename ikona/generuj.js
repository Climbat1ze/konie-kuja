const {chromium}=require('playwright');const fs=require('fs');
function syr(p){const L=64,R=262,head=L+p*(R-L-6);let t="";
for(let i=1;i<10;i++){const x=L+i*(R-L)/10;t+=`<line x1="${x}" y1="12" x2="${x}" y2="${i%5?18:22}" stroke="#141414" stroke-width="2"/>`}
return `<rect x="${head}" y="12" width="${R-head}" height="24" fill="#b5e61d"/><rect x="${L}" y="10" width="${R-L}" height="28" rx="3" fill="none" stroke="#141414" stroke-width="4"/>${t}<line x1="${L-8}" y1="2" x2="${L-8}" y2="46" stroke="#141414" stroke-width="5"/><path d="M${R} 16 L${R+14} 20 L${R+14} 28 L${R} 32 Z" fill="#d9d9d9" stroke="#141414" stroke-width="3"/><line x1="${R+14}" y1="24" x2="326" y2="24" stroke="#141414" stroke-width="3"/><rect x="${head}" y="12" width="7" height="24" fill="#141414"/><rect x="${head-58}" y="19" width="58" height="10" fill="#fff" stroke="#141414" stroke-width="3"/><rect x="${head-64}" y="4" width="8" height="40" rx="2" fill="#e3201b" stroke="#141414" stroke-width="3"/>`}
// syringe content spans x≈0..330 (plunger thumb at head-64 ≈ 0 when p≈0.33), y 0..48; center (165,24)
function svg(size,kind){
  const fit={fg:0.68,legacy:0.86,round:0.80}[kind]; // fraction of canvas for syringe length (diagonal)
  const len=330, s=size*fit/len;
  const bg=kind==="legacy"?`<rect x="${size*0.04}" y="${size*0.04}" width="${size*0.92}" height="${size*0.92}" rx="${size*0.18}" fill="#fff" stroke="#141414" stroke-width="${size*0.02}"/>`:kind==="round"?`<circle cx="${size/2}" cy="${size/2}" r="${size*0.47}" fill="#fff" stroke="#141414" stroke-width="${size*0.02}"/>`:"";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><defs><filter id="w"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter></defs>${bg}<g transform="translate(${size/2} ${size/2}) rotate(-45) scale(${s}) translate(-165 -24)"><g filter="url(#w)">${syr(0.4)}</g></g></svg>`}
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const D={mdpi:[48,108],hdpi:[72,162],xhdpi:[96,216],xxhdpi:[144,324],xxxhdpi:[192,432]};
for(const [d,[lg,fg]] of Object.entries(D)){fs.mkdirSync(`out/mipmap-${d}`,{recursive:true});
 for(const [name,size,kind] of [["ic_launcher",lg,"legacy"],["ic_launcher_round",lg,"round"],["ic_launcher_foreground",fg,"fg"]]){
  await p.setViewportSize({width:size,height:size});await p.setContent(`<html><body style="margin:0;background:transparent">${svg(size,kind)}</body></html>`);
  await p.screenshot({path:`out/mipmap-${d}/${name}.png`,omitBackground:true,clip:{x:0,y:0,width:size,height:size}});}}
await p.setViewportSize({width:512,height:512});await p.setContent(`<html><body style="margin:0">${svg(512,"legacy")}</body></html>`);await p.screenshot({path:'out/ikona-512.png',omitBackground:true});
await b.close()})();
