"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[4194],{6284:(n,e,t)=>{function r(n,e,t,s,a){if(!a(t,e,s))return!1;if(0===n.length)return!0;const o=e.slice(),i=o[s];o[s]=[t,...i];const[c,...u]=n;return o.some(((n,e)=>r(u,o,c,e,a)))}t.d(e,{U:()=>s,u:()=>a});const s=(n,e,t,s)=>{const a=n.flat();return e.map(((n,e)=>e)).filter((n=>r(a,e,t,n,s)))},a=(n,e,t,s)=>{const a=n.flat();return e.findIndex(((n,o)=>r(a,e,t,o,s)))}},97532:(n,e,t)=>{t.d(e,{Z:()=>u});var r=t(73303),s=t.n(r),a=t(16746);var o=t(76303);const i=new Set(["Kazakhstan","Russia","Belarus","Lithuania","Latvia","Estonia","Norway","Finland","Sweden","Iceland","Faroe Islands"]);function c(n,e){const t=e-(e>>1),r=n=>i.has(n.country),a=n=>r(n)?1:0;return n=>s()(n,a)<=t}const u=(n,e)=>{const t=(0,o.Z)(n),r=c(0,e);return(n,e,s)=>{const o=e[s],i=(0,a.Z)(e);var c;return!(o.length>i||o.some((c=n.country,n=>n.country===c))||o.some(t(n))||!r([...o,n])||n.pairing&&((n,e)=>{const t=n.length>>1,r=e<t?0:t;return n.slice(r,r+t)})(e,s).some(function(n){const e=function(n){const{id:e}=n;return n=>n.id===e}(n);return n=>n.some(e)}(n.pairing)))}}},76303:(n,e,t)=>{t.d(e,{Z:()=>l});var r=t(95062),s=t.n(r),a=t(97527),o=t.n(a);const i=[{countries:["Russia","Ukraine"],predicate:(c=2014,u=Number.MAX_SAFE_INTEGER,n=>n>=c&&n<=u)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var c,u;const d={predicate:o()},p=i.map((n=>({...d,...n}))),l=n=>{const e=(n=>{const e=new Map;for(const{countries:t,predicate:r}of p)r(n)&&(e.set(t[0],t[1]),e.set(t[1],t[0]));return e.get.bind(e)})(n);return n=>{const t=e(n.country);return void 0===t?s():n=>n.country===t}}},20070:(n,e,t)=>{t.r(e);var r=t(30845),s=t(6284),a=t(97532);const o=([n,e])=>JSON.stringify({year:n,groupSize:e}),i=(0,r.Z)(a.Z,((n,e)=>o(n)===o(e)));addEventListener("message",(n=>{const{messageId:e,data:{season:t,pots:r,groups:a,selectedTeam:o}}=n.data,c=i(t,r.length),u=(0,s.u)(r,a,o,c);postMessage({messageId:e,data:{pickedGroup:u}})}))}}]);