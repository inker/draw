(()=>{"use strict";var r,e,t={62311:(r,e,t)=>{function o(r,[e,t],s,n){const i=s.findIndex((r=>1===r.length));if(!n(r,s,i))return!1;const a=[...s],c=a[i][0];a[i]=[c,r];return i+1===a.length||function([r,e],t,s){const n=t.findIndex((r=>!r.length)),[i,...a]=e,c=[...t];return c[n]=[i],r.some((e=>o(e,[r,a],c,s)))}([e.filter((e=>e!==r)),t],a,n)}t.d(e,{Z:()=>s});const s=([r,e],t,s)=>r.map(((r,e)=>e)).filter((n=>o(r[n],[r,e],t,s)))},60402:(r,e,t)=>{t.d(e,{Z:()=>s});var o=t(76303);const s=r=>{const e=(0,o.Z)(r),t=(r,t)=>{return 0===r.length||1===r.length&&(o=t,s=r[0],o.country!==s.country&&o.group!==s.group&&!e(o)(s));var o,s};return(r,e,o)=>t(e[o],r)}},76303:(r,e,t)=>{t.d(e,{Z:()=>g});var o=t(95062),s=t.n(o),n=t(97527),i=t.n(n);const a=[{countries:["Russia","Ukraine"],predicate:(c=2014,l=Number.MAX_SAFE_INTEGER,r=>r>=c&&r<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var c,l;const u={predicate:i()},p=a.map((r=>({...u,...r}))),g=r=>{const e=(r=>{const e=new Map;for(const{countries:t,predicate:o}of p)o(r)&&(e.set(t[0],t[1]),e.set(t[1],t[0]));return e.get.bind(e)})(r);return r=>{const t=e(r.country);return void 0===t?s():r=>r.country===t}}},12061:(r,e,t)=>{var o=t(30845),s=t(62311),n=t(60402);const i=([r])=>JSON.stringify({year:r}),a=(0,o.Z)(n.Z,((r,e)=>i(r)===i(e)));addEventListener("message",(r=>{const{messageId:e,data:{season:t,pots:o,matchups:n}}=r.data,i=a(t),c=(0,s.Z)(o,n,i);postMessage({messageId:e,data:{possiblePairings:c}})}))}},o={};function s(r){var e=o[r];if(void 0!==e)return e.exports;var n=o[r]={exports:{}};return t[r](n,n.exports,s),n.exports}s.m=t,s.x=()=>{var r=s.O(void 0,[3748,7180,4833],(()=>s(12061)));return r=s.O(r)},r=[],s.O=(e,t,o,n)=>{if(!t){var i=1/0;for(u=0;u<r.length;u++){for(var[t,o,n]=r[u],a=!0,c=0;c<t.length;c++)(!1&n||i>=n)&&Object.keys(s.O).every((r=>s.O[r](t[c])))?t.splice(c--,1):(a=!1,n<i&&(i=n));if(a){r.splice(u--,1);var l=o();void 0!==l&&(e=l)}}return e}n=n||0;for(var u=r.length;u>0&&r[u-1][2]>n;u--)r[u]=r[u-1];r[u]=[t,o,n]},s.n=r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return s.d(e,{a:e}),e},s.d=(r,e)=>{for(var t in e)s.o(e,t)&&!s.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:e[t]})},s.f={},s.e=r=>Promise.all(Object.keys(s.f).reduce(((e,t)=>(s.f[t](r,e),e)),[])),s.u=r=>({3748:"vendors-cl-gs~cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko~cl-ko-worker~el-gs~el-gs-worker~el-ko~el-ko-worker~wc-gs~wc-gs-worker~~~~~~",4833:"vendors-",7180:"vendors-cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko-worker~el-gs-worker~el-ko-worker~wc-gs-worker~~~~~~"}[r]+"."+{3748:"242c35f5",4833:"c0a34eff",7180:"8a6ec3e0"}[r]+".js"),s.miniCssF=r=>{},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),s.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{var r;s.g.importScripts&&(r=s.g.location+"");var e=s.g.document;if(!r&&e&&(e.currentScript&&(r=e.currentScript.src),!r)){var t=e.getElementsByTagName("script");if(t.length)for(var o=t.length-1;o>-1&&!r;)r=t[o--].src}if(!r)throw new Error("Automatic publicPath is not supported in this browser");r=r.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=r})(),(()=>{var r={2061:1,425:1};s.f.i=(e,t)=>{r[e]||importScripts(s.p+s.u(e))};var e=self.webpackChunkdraw=self.webpackChunkdraw||[],t=e.push.bind(e);e.push=e=>{var[o,n,i]=e;for(var a in n)s.o(n,a)&&(s.m[a]=n[a]);for(i&&i(s);o.length;)r[o.pop()]=1;t(e)}})(),e=s.x,s.x=()=>Promise.all([3748,7180,4833].map(s.e,s)).then(e);s.x()})();