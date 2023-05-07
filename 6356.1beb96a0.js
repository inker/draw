(()=>{"use strict";var r,e,o={97532:(r,e,o)=>{o.d(e,{Z:()=>l});var s=o(73303),t=o.n(s),n=o(16746);var a=o(76303);const i=new Set(["Kazakhstan","Russia","Belarus","Lithuania","Latvia","Estonia","Norway","Finland","Sweden","Iceland","Faroe Islands"]);function c(r,e){const o=e-(e>>1),s=r=>i.has(r.country),n=r=>s(r)?1:0;return r=>t()(r,n)<=o}const l=(r,e)=>{const o=(0,a.Z)(r),s=c(0,e);return(r,e,t)=>{const a=e[t],i=(0,n.Z)(e);var c;return!(a.length>i||a.some((c=r.country,r=>r.country===c))||a.some(o(r))||!s([...a,r])||r.pairing&&((r,e)=>{const o=r.length>>1,s=e<o?0:o;return r.slice(s,s+o)})(e,t).some(function(r){const e=function(r){const{id:e}=r;return r=>r.id===e}(r);return r=>r.some(e)}(r.pairing)))}}},76303:(r,e,o)=>{o.d(e,{Z:()=>d});var s=o(95062),t=o.n(s),n=o(97527),a=o.n(n);const i=[{countries:["Russia","Ukraine"],predicate:(c=2014,l=Number.MAX_SAFE_INTEGER,r=>r>=c&&r<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var c,l;const u={predicate:a()},p=i.map((r=>({...u,...r}))),d=r=>{const e=(r=>{const e=new Map;for(const{countries:o,predicate:s}of p)s(r)&&(e.set(o[0],o[1]),e.set(o[1],o[0]));return e.get.bind(e)})(r);return r=>{const o=e(r.country);return void 0===o?t():r=>r.country===o}}},6356:(r,e,o)=>{var s=o(30845),t=o(6284),n=o(97532);const a=([r,e])=>JSON.stringify({year:r,groupSize:e}),i=(0,s.Z)(n.Z,((r,e)=>a(r)===a(e)));addEventListener("message",(r=>{const{messageId:e,data:{season:o,pots:s,groups:n,selectedTeam:a}}=r.data,c=i(o,s.length),l=(0,t.u)(s,n,a,c);postMessage({messageId:e,data:{pickedGroup:l}})}))},16746:(r,e,o)=>{o.d(e,{Z:()=>s});const s=r=>r.reduce(((r,e)=>Math.min(e.length,r)),Number.MAX_SAFE_INTEGER)}},s={};function t(r){var e=s[r];if(void 0!==e)return e.exports;var n=s[r]={id:r,loaded:!1,exports:{}};return o[r](n,n.exports,t),n.loaded=!0,n.exports}t.m=o,t.x=()=>{var r=t.O(void 0,[3748,6902,7180,3520,4833],(()=>t(6356)));return r=t.O(r)},r=[],t.O=(e,o,s,n)=>{if(!o){var a=1/0;for(u=0;u<r.length;u++){for(var[o,s,n]=r[u],i=!0,c=0;c<o.length;c++)(!1&n||a>=n)&&Object.keys(t.O).every((r=>t.O[r](o[c])))?o.splice(c--,1):(i=!1,n<a&&(a=n));if(i){r.splice(u--,1);var l=s();void 0!==l&&(e=l)}}return e}n=n||0;for(var u=r.length;u>0&&r[u-1][2]>n;u--)r[u]=r[u-1];r[u]=[o,s,n]},t.n=r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return t.d(e,{a:e}),e},t.d=(r,e)=>{for(var o in e)t.o(e,o)&&!t.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:e[o]})},t.f={},t.e=r=>Promise.all(Object.keys(t.f).reduce(((e,o)=>(t.f[o](r,e),e)),[])),t.u=r=>({3520:"vendors-cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~el-gs-worker~wc-gs-worker~~~~",3748:"vendors-cl-gs~cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko~cl-ko-worker~el-gs~el-gs-worker~el-ko~el-ko-worker~wc-gs~wc-gs-worker~~~~~~",4833:"vendors-",6902:"vendors-cl-gs~cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko~el-gs~el-gs-worker~el-ko~wc-gs~wc-gs-worker~~~~",7180:"vendors-cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko-worker~el-gs-worker~el-ko-worker~wc-gs-worker~~~~~~"}[r]+"."+{3520:"caf656fa",3748:"242c35f5",4833:"c0a34eff",6902:"3e122429",7180:"8a6ec3e0"}[r]+".js"),t.miniCssF=r=>{},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),t.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),t.nmd=r=>(r.paths=[],r.children||(r.children=[]),r),(()=>{var r;t.g.importScripts&&(r=t.g.location+"");var e=t.g.document;if(!r&&e&&(e.currentScript&&(r=e.currentScript.src),!r)){var o=e.getElementsByTagName("script");if(o.length)for(var s=o.length-1;s>-1&&!r;)r=o[s--].src}if(!r)throw new Error("Automatic publicPath is not supported in this browser");r=r.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=r})(),(()=>{var r={6356:1,9039:1};t.f.i=(e,o)=>{r[e]||importScripts(t.p+t.u(e))};var e=self.webpackChunkdraw=self.webpackChunkdraw||[],o=e.push.bind(e);e.push=e=>{var[s,n,a]=e;for(var i in n)t.o(n,i)&&(t.m[i]=n[i]);for(a&&a(t);s.length;)r[s.pop()]=1;o(e)}})(),e=t.x,t.x=()=>Promise.all([3748,6902,7180,3520,4833].map(t.e,t)).then(e);t.x()})();