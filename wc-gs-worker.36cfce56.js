"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[8654,3930],{85092:(e,t,r)=>{function n(e,t,r,l,a){if(!a(r,t,l))return!1;if(0===e.length)return!0;let u=t.map((e,t)=>t===l?[r,...e]:e),[f,...i]=e;return u.some((e,t)=>n(i,u,f,t,a))}r.d(t,{U:()=>l,u:()=>a});let l=({pots:e,groups:t,picked:r,predicate:l})=>{let a=e.flat();return t.map((e,t)=>t).filter(e=>n(a,t,r,e,l))},a=({pots:e,groups:t,picked:r,predicate:l})=>{let a=e.flat();return t.findIndex((e,u)=>n(a,t,r,u,l))}},3930:(e,t,r)=>{r.r(t);var n=r(30845),l=r(3695),a=r(85092),u=r(76873),f=r(69203),i=r(48392),d=r(62603),s=r(39506);let o=e=>e<2026?8:16;var c=r(70990);function h([e,t]){let r=(0,l.Z)(t,e=>e.id);return JSON.stringify({year:e,teams:r})}let Z=(0,n.Z)((e,t)=>{let r=o(e),n=t.length/r,l=t.flatMap(e=>e.confederation??e.confederations),a=(0,u.Z)(l,f.Z),c=(0,i.Z)(a,e=>{let t=e/r;return[Math.floor(t),Math.ceil(t)]}),h=Object.entries(c);return(e,t,r)=>{let l=t[r],a=(0,s.Z)(t);if(l.length>a)return!1;let u=[...l,e],f=n-u.length;return h.every(([e,[t,r]])=>{let n=(0,d.Z)(u,t=>{let r=t.confederation?t.confederation===e:t.confederations.has(e);return r?1:0});return n<=r&&n+f>=t})}},(e,t)=>h(e)===h(t));(0,c.Z)(e=>{let{season:t,pots:r,groups:n,selectedTeam:l}=e,u=[l,...r.flat(),...n.flat()],f=Z(t,u);return(0,a.u)({pots:r,groups:n,picked:l,predicate:f})})},39506:(e,t,r)=>{r.d(t,{Z:()=>n});let n=e=>e.reduce((e,t)=>Math.min(t.length,e),Number.MAX_SAFE_INTEGER)},70990:(e,t,r)=>{r.d(t,{Z:()=>n});let n=e=>{addEventListener("message",t=>{let{messageId:r,data:n}=t.data,l=e(n);postMessage({messageId:r,data:l})})}}}]);