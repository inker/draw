"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[6525,595],{62311:(n,e,t)=>{function r(n,[e,t],s,o){const a=s.findIndex((n=>1===n.length));if(!o(n,s,a))return!1;const i=[...s],c=i[a][0];i[a]=[c,n];return a+1===i.length||function([n,e],t,s){const o=t.findIndex((n=>!n.length)),[a,...i]=e,c=[...t];return c[o]=[a],n.some((e=>r(e,[n,i],c,s)))}([e.filter((e=>e!==n)),t],i,o)}t.d(e,{Z:()=>s});const s=([n,e],t,s)=>n.map(((n,e)=>e)).filter((o=>r(n[o],[n,e],t,s)))},60402:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(76303);const s=n=>{const e=(0,r.Z)(n),t=(n,t)=>{return 0===n.length||1===n.length&&(r=t,s=n[0],r.country!==s.country&&r.group!==s.group&&!e(r)(s));var r,s};return(n,e,r)=>t(e[r],n)}},76303:(n,e,t)=>{t.d(e,{Z:()=>g});var r=t(95062),s=t.n(r),o=t(97527),a=t.n(o);const i=[{countries:["Russia","Ukraine"],predicate:(c=2014,u=Number.MAX_SAFE_INTEGER,n=>n>=c&&n<=u)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var c,u;const d={predicate:a()},p=i.map((n=>({...d,...n}))),g=n=>{const e=(n=>{const e=new Map;for(const{countries:t,predicate:r}of p)r(n)&&(e.set(t[0],t[1]),e.set(t[1],t[0]));return e.get.bind(e)})(n);return n=>{const t=e(n.country);return void 0===t?s():n=>n.country===t}}},70595:(n,e,t)=>{t.r(e);var r=t(30845),s=t(62311),o=t(60402);const a=([n])=>JSON.stringify({year:n}),i=(0,r.Z)(o.Z,((n,e)=>a(n)===a(e)));addEventListener("message",(n=>{const{messageId:e,data:{season:t,pots:r,matchups:o}}=n.data,a=i(t),c=(0,s.Z)(r,o,a);postMessage({messageId:e,data:{possiblePairings:c}})}))}}]);