(()=>{"use strict";var e={85092:(e,r,t)=>{t.d(r,{u:()=>o});let o=({pots:e,groups:r,picked:t,predicate:o})=>{let s=e.flat();return r.findIndex((e,n)=>(function e(r,t,o,s,n){if(!n(o,t,s))return!1;if(0===r.length)return!0;let i=t.with(s,[o,...t[s]]),[l,...a]=r;return i.some((r,t)=>e(a,i,l,t,n))})(s,r,t,n,o))}},97543:(e,r,t)=>{t.d(r,{Z:()=>p});var o=t(62603),s=t(39506);let n=(e,r)=>{let t=e.length>>1,o=r<t?0:t;return e.slice(o,o+t)};var i=t(80411);let l=new Set(["Belarus","Estonia","Faroe Islands","Finland","Iceland","Kazakhstan","Latvia","Lithuania","Norway","Russia","Sweden"]),a=e=>e=>l.has(e.country),c=e=>r=>r.country===e,u=e=>c(e.country),p=(e,r)=>{let t=(0,i.Z)(e),l=function(e,r){let t=r-(r>>1),s=a(e),n=e=>s(e)?1:0;return e=>(0,o.Z)(e,n)<=t}(e,r);return(e,r,o)=>{let i=r[o],a=(0,s.Z)(r);return!(i.length>a||i.some(u(e))||i.some(t(e))||!l([...i,e])||e.pairing&&n(r,o).some(function(e){let r=function(e){let{id:r}=e;return e=>e.id===r}(e);return e=>e.some(r)}(e.pairing)))}}},80411:(e,r,t)=>{t.d(r,{Z:()=>u});var o,s=t(7979),n=t(46338);let i=[{countries:["Russia","Ukraine"],predicate:(o=Number.MAX_SAFE_INTEGER,e=>e>=2014&&e<=o)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}],l={predicate:n.Z},a=i.map(e=>({...l,...e})),c=e=>{let r=a.filter(r=>r.predicate(e)).map(e=>e.countries),t=r.map(e=>e.toReversed()),o=function(e){let r=new Map;for(let[t,o]of e)r.has(t)||r.set(t,new Set),r.get(t).add(o);return r}([...r,...t]);return o.get.bind(o)},u=e=>{let r=c(e);return e=>{let t=r(e.country);return void 0===t?s.Z:e=>t.has(e.country)}}},23091:(e,r,t)=>{var o=t(30845),s=t(85092),n=t(97543),i=t(70990);let l=([e,r])=>JSON.stringify({year:e,groupSize:r}),a=(0,o.Z)(n.Z,(e,r)=>l(e)===l(r));(0,i.Z)(e=>{let{season:r,pots:t,groups:o,selectedTeam:n}=e,i=a(r,t.length);return(0,s.u)({pots:t,groups:o,picked:n,predicate:i})})},39506:(e,r,t)=>{t.d(r,{Z:()=>o});let o=e=>e.reduce((e,r)=>Math.min(r.length,e),Number.MAX_SAFE_INTEGER)},70990:(e,r,t)=>{t.d(r,{Z:()=>o});let o=e=>{addEventListener("message",r=>{let{correlationId:t,data:o}=r.data,s=e(o);postMessage({correlationId:t,data:s})})}}},r={};function t(o){var s=r[o];if(void 0!==s)return s.exports;var n=r[o]={exports:{}};return e[o](n,n.exports,t),n.exports}t.m=e,t.x=()=>{var e=t.O(void 0,[3748,6902,7180,3520,4833],()=>t(23091));return t.O(e)},(()=>{var e=[];t.O=(r,o,s,n)=>{if(o){n=n||0;for(var i=e.length;i>0&&e[i-1][2]>n;i--)e[i]=e[i-1];e[i]=[o,s,n];return}for(var l=1/0,i=0;i<e.length;i++){for(var[o,s,n]=e[i],a=!0,c=0;c<o.length;c++)l>=n&&Object.keys(t.O).every(e=>t.O[e](o[c]))?o.splice(c--,1):(a=!1,n<l&&(l=n));if(a){e.splice(i--,1);var u=s();void 0!==u&&(r=u)}}return r}})(),t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce((r,o)=>(t.f[o](e,r),r),[])),t.u=e=>""+({3520:"vendors-cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~el-gs-worker~wc-gs-worker~~~~",3748:"vendors-cl-gs~cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko~cl-ko-worker~el-gs~el-gs-worker~el-ko~el-ko-worker~wc-gs~wc-gs-worker~~~~~~",4833:"vendors-",6902:"vendors-cl-gs~cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko~el-gs~el-gs-worker~el-ko~wc-gs~wc-gs-worker~~~~",7180:"vendors-cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko-worker~el-gs-worker~el-ko-worker~wc-gs-worker~~~~~~"})[e]+"."+({3520:"ca6d1ae3",3748:"853ad294",4833:"289714ef",6902:"8daa7180",7180:"99211f36"})[e]+".js",t.miniCssF=e=>{},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.j=3091,(()=>{t.g.importScripts&&(e=t.g.location+"");var e,r=t.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var o=r.getElementsByTagName("script");if(o.length)for(var s=o.length-1;s>-1&&!e;)e=o[s--].src}if(!e)throw Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),(()=>{var e={3091:1,4194:1};t.f.i=(r,o)=>{e[r]||importScripts(t.p+t.u(r))};var r=self.webpackChunkdraw=self.webpackChunkdraw||[],o=r.push.bind(r);r.push=r=>{var[s,n,i]=r;for(var l in n)t.o(n,l)&&(t.m[l]=n[l]);for(i&&i(t);s.length;)e[s.pop()]=1;o(r)}})(),(()=>{var e=t.x;t.x=()=>Promise.all([3748,6902,7180,3520,4833].map(t.e,t)).then(e)})(),t.x()})();