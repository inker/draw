"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[8654,4714],{44714:(e,t,n)=>{n.r(t);var s=n(30845),a=n(6284),r=n(75472),o=n.n(r),c=n(6557),d=n.n(c),i=n(49995),u=n.n(i),f=n(73303),l=n.n(f),h=n(66604),g=n.n(h),p=n(16746);function m([e,t]){const n=o()(t,(e=>e.id));return JSON.stringify({year:e,teams:n})}const M=(0,s.Z)(((e,t)=>{const n=(e=>e<2026?8:16)(e),s=t.length/n,a=t.flatMap((e=>e.confederation??e.confederations)),r=u()(a,d()),o=g()(r,(e=>{const t=e/n;return[Math.floor(t),Math.ceil(t)]})),c=Object.entries(o);return(e,t,n)=>{const a=t[n],r=(0,p.Z)(t);if(a.length>r)return!1;const o=[...a,e],d=s-o.length;return c.every((([e,[t,n]])=>{const s=l()(o,(t=>(t.confederation?t.confederation===e:t.confederations.has(e))?1:0));return s<=n&&s+d>=t}))}}),((e,t)=>m(e)===m(t)));addEventListener("message",(e=>{const{messageId:t,data:{season:n,pots:s,groups:r,selectedTeam:o}}=e.data,c=[o,...s.flat(),...r.flat()],d=M(n,c),i=(0,a.u)(s,r,o,d);postMessage({messageId:t,data:{pickedGroup:i}})}))},16746:(e,t,n)=>{n.d(t,{Z:()=>s});const s=e=>e.reduce(((e,t)=>Math.min(t.length,e)),Number.MAX_SAFE_INTEGER)}}]);