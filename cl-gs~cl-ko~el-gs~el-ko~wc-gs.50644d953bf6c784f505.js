(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t){e.exports=function(){return!1}},120:function(e,t,n){var r=n(428);e.exports=function(e,t){var n=-1,o=e.length,a=o-1;for(t=void 0===t?o:t;++n<t;){var i=r(n,a),c=e[i];e[i]=e[n],e[n]=c}return e.length=t,e}},121:function(e,t,n){var r=n(435),o=n(66),a=Object.prototype,i=a.hasOwnProperty,c=a.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(e){return o(e)&&i.call(e,"callee")&&!c.call(e,"callee")};e.exports=l},122:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},123:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1);var i=a.b.div`
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */

  width: 67px;
  height: 67px;

  margin: 2px;
  padding: 10px;

  font-family: 'Arial Narrow', 'Ubuntu Condensed', sans-serif;
  text-align: center;
  text-overflow: ellipsis;
  color: white;

  background: radial-gradient(#004, #002, #002);
  border-radius: 100%;
  cursor: pointer;
  user-select: none;

  @media (max-width: 999px) {
    flex-flow: row wrap;

    & > * {
      flex: 1;
      flex-basis: 22%;
    }

    width: 21px;
    height: 21px;
  }
`;const c=Object(a.b)(i)`
  ${e=>e.selected?a.a`
    font-size: 0.8em;
    font-weight: bold;
    color: white;
  `:a.a`
    font-size: 0;
    background: radial-gradient(#004, #002, #002);
  `}

  ${e=>e.forceVisible&&a.a`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`;t.a=Object(r.memo)(({noHover:e,...t})=>{const n=Object(r.useRef)(null),a=Object(r.useCallback)(t=>{const r=n.current;!e&&r&&document.activeElement===r&&"Enter"===t.key&&r.click()},[n,e]);var i,l;return i="keydown",l=a,Object(r.useEffect)(()=>(window.addEventListener(i,l),()=>{window.removeEventListener(i,l)}),[i,l]),o.a.createElement(c,Object.assign({},t,{noHover:e,ref:n,tabIndex:e?void 0:0}))})},427:function(e,t,n){var r=n(27),o=n(120);e.exports=function(e){return o(r(e))}},428:function(e,t){var n=Math.floor,r=Math.random;e.exports=function(e,t){return e+n(r()*(t-e+1))}},429:function(e,t,n){var r=n(120),o=n(430);e.exports=function(e){return r(o(e))}},430:function(e,t,n){var r=n(431),o=n(432);e.exports=function(e){return null==e?[]:r(e,o(e))}},431:function(e,t,n){var r=n(19);e.exports=function(e,t){return r(t,(function(t){return e[t]}))}},432:function(e,t,n){var r=n(433),o=n(440),a=n(102);e.exports=function(e){return a(e)?r(e):o(e)}},433:function(e,t,n){var r=n(434),o=n(121),a=n(82),i=n(436),c=n(115),l=n(437),s=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=a(e),u=!n&&o(e),d=!n&&!u&&i(e),p=!n&&!u&&!d&&l(e),f=n||u||d||p,m=f?r(e.length,String):[],b=m.length;for(var x in e)!t&&!s.call(e,x)||f&&("length"==x||d&&("offset"==x||"parent"==x)||p&&("buffer"==x||"byteLength"==x||"byteOffset"==x)||c(x,b))||m.push(x);return m}},434:function(e,t){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},435:function(e,t,n){var r=n(18),o=n(66);e.exports=function(e){return o(e)&&"[object Arguments]"==r(e)}},436:function(e,t,n){(function(e){var r=n(7),o=n(103),a=t&&!t.nodeType&&t,i=a&&"object"==typeof e&&e&&!e.nodeType&&e,c=i&&i.exports===a?r.Buffer:void 0,l=(c?c.isBuffer:void 0)||o;e.exports=l}).call(this,n(122)(e))},437:function(e,t,n){var r=n(438),o=n(22),a=n(439),i=a&&a.isTypedArray,c=i?o(i):r;e.exports=c},438:function(e,t,n){var r=n(18),o=n(114),a=n(66),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&o(e.length)&&!!i[r(e)]}},439:function(e,t,n){(function(e){var r=n(25),o=t&&!t.nodeType&&t,a=o&&"object"==typeof e&&e&&!e.nodeType&&e,i=a&&a.exports===o&&r.process,c=function(){try{var e=a&&a.require&&a.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=c}).call(this,n(122)(e))},440:function(e,t,n){var r=n(441),o=n(442),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return o(e);var t=[];for(var n in Object(e))a.call(e,n)&&"constructor"!=n&&t.push(n);return t}},441:function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},442:function(e,t,n){var r=n(443)(Object.keys,Object);e.exports=r},443:function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},444:function(e,t){e.exports=function(e){return null==e}},445:function(e,t,n){var r=n(446),o=n(449),a=n(450),i=n(19),c=n(22),l=n(451);e.exports=function(e,t,n,s){var u=-1,d=o,p=!0,f=e.length,m=[],b=t.length;if(!f)return m;n&&(t=i(t,c(n))),s?(d=a,p=!1):t.length>=200&&(d=l,p=!1,t=new r(t));e:for(;++u<f;){var x=e[u],h=null==n?x:n(x);if(x=s||0!==x?x:0,p&&h==h){for(var g=b;g--;)if(t[g]===h)continue e;m.push(x)}else d(t,h,s)||m.push(x)}return m}},446:function(e,t,n){var r=n(118),o=n(447),a=n(448);function i(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=a,e.exports=i},447:function(e,t){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},448:function(e,t){e.exports=function(e){return this.__data__.has(e)}},449:function(e,t,n){var r=n(26);e.exports=function(e,t){return!!(null==e?0:e.length)&&r(e,t,0)>-1}},450:function(e,t){e.exports=function(e,t,n){for(var r=-1,o=null==e?0:e.length;++r<o;)if(n(t,e[r]))return!0;return!1}},451:function(e,t){e.exports=function(e,t){return e.has(t)}},452:function(e,t,n){var r=n(453),o=n(454);e.exports=function e(t,n,a,i,c){var l=-1,s=t.length;for(a||(a=o),c||(c=[]);++l<s;){var u=t[l];n>0&&a(u)?n>1?e(u,n-1,a,i,c):r(c,u):i||(c[c.length]=u)}return c}},453:function(e,t){e.exports=function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}},454:function(e,t,n){var r=n(6),o=n(121),a=n(82),i=r?r.isConcatSpreadable:void 0;e.exports=function(e){return a(e)||o(e)||!!(i&&e&&e[i])}},455:function(e,t,n){var r=n(102),o=n(66);e.exports=function(e){return o(e)&&r(e)}},59:function(e,t,n){"use strict";t.a=e=>String.fromCharCode(65+e)},62:function(e,t,n){"use strict";const r=n(1).b.div`
  border: #aaa solid 1px;
  margin: 0 5px 10px 5px;
  width: 150px;
  min-width: 0;

  @media (max-width: 999px) {
    margin: 0 3px 6px 3px;
  }
`;t.a=r},64:function(e,t,n){"use strict";var r=n(1),o=n(119),a=n(91);var i=Object(r.b)(a.a)`
  padding-left: 3px;
  padding-right: 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`;const c=Object(r.b)(i)`
  background-position: 3px;
  background-size: 16px;
  background-repeat: no-repeat;

  padding-left: 22px;

  @media (max-width: 999px) {
    background-position: 2px;
    background-size: 12px;
    padding-left: 16px;
  }
`,l=Object(r.b)(c)`
  ${({country:e})=>e&&r.a`
    background-image: url('${Object(o.a)(e)}');
  `}
`;t.a=l},69:function(e,t,n){var r=n(427),o=n(429),a=n(82);e.exports=function(e){return(a(e)?r:o)(e)}},70:function(e,t,n){"use strict";const r=n(1).b.div`
`;t.a=r},71:function(e,t,n){"use strict";const r=n(1).b.div`
  display: flex;
  flex-direction: column;
  min-width: 65%;
  margin: 0 5px 10px 5px;
`;t.a=r},72:function(e,t,n){"use strict";const r=n(1).b.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 35%;
  margin: 0 5px 10px 5px;

  @media (max-width: 999px) {
    align-items: center;
  }
`;t.a=r},73:function(e,t,n){"use strict";const r=n(1).b.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    width: 100%;
    flex-direction: column;
  }
`;t.a=r},74:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(89),i=n(1);var c=i.b.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  & > * {
    flex: 1;
    flex-basis: 22%;
    ${e=>e.limitWidth?"max-width: 160px":""};

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`,l=n(70),s=n(62);var u=Object(i.b)(s.a)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n  "}
`,d=n(90);const p=i.a`
  filter: grayscale(0.5);
  opacity: 0.4;
`,f=i.a`
  color: #f70;
`;var m=Object(i.b)(d.a)`
  ${e=>e.depleted&&p}
  ${e=>e.highlighted&&f}
`,b=n(64);const x=i.a`
  color: blue;
`,h=i.a`
  filter: grayscale(0.5);
  opacity: 0.4;
`;var g=Object(i.b)(b.a)`
  ${e=>e.selected&&x}
  ${e=>e.picked&&h}
`;var v=Object(r.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:a,background:i,color:c})=>o.a.createElement(u,{highlighted:e},o.a.createElement(m,{highlighted:e,depleted:!n||r.length===n.length,background:i,color:c},"Pot ",t+1),o.a.createElement(l.a,null,n.map(e=>{var t;const{name:n,country:i,shortName:c,pairing:l}=e;return o.a.createElement(g,{key:e.id,"data-cellid":e.id,title:l&&"paired with "+(null!==(t=l.shortName)&&void 0!==t?t:l.name),selected:!!(null==a?void 0:a.includes(e)),picked:r.includes(e),country:null!=i?i:n},null!=c?c:n)})))),y=n(60);const w=i.b.div`
  display: flex;
  border: none;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: -1px;

  &:last-child {
    margin-bottom: 0;
  }
`,j=Object(i.b)(g)`
  width: 50%;
  margin-right: 0;
`;var E=Object(r.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:r,selectedTeams:a,background:i,color:c})=>o.a.createElement(u,{highlighted:e},o.a.createElement(m,{highlighted:e,depleted:!n||r.length===n.length,background:i,color:c},"Pot ",t+1),o.a.createElement(l.a,null,y(n.length/2).map(e=>{const t=[n[2*e],n[2*e+1]];return o.a.createElement(w,{key:e},t.map(e=>{var t;const{name:n,country:i,shortName:c,pairing:l}=e;return o.a.createElement(j,{key:e.id,"data-cellid":e.id,title:l&&"paired with "+(null!==(t=l.shortName)&&void 0!==t?t:l.name),selected:!!a&&a.includes(e),picked:r.includes(e),country:null!=i?i:n},null!=c?c:n)}))}))));t.a=Object(r.memo)(({initialPots:e,pots:t,selectedTeams:n,currentPotNum:r,split:i})=>o.a.createElement(c,{limitWidth:!i},e.map((c,l)=>{const s=i?E:v,u=l===r,d=a(e[l],t[l],null!=n?n:[]);return o.a.createElement(s,{key:c[0].id,potNum:l,isCurrent:u,teams:c,pickedTeams:d,selectedTeams:n,background:"rgba(0, 0, 0, 0.75)",color:"#fff"})})))},76:function(e,t,n){"use strict";var r=n(0),o=n(67),a=n.n(o),i=n(101),c=n(444),l=n(117);let s;var u=(e,...t)=>{s||(s=document.createElement("style"),document.head.appendChild(s));const n=Object(l.a)("styled-element-"),r=((e,...t)=>e.reduce((e,n,r)=>`${e}${n}${c(t[r])?"":t[r]}`,""))(e,...t);return s.textContent+=`.${n}{${r}}`,n};const d=e=>((e,t)=>new Promise(n=>{e.addEventListener(t,(function r(o){e.removeEventListener(t,r),n(o)}))}))(e,"transitionend"),p=u`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,f=u`
  color: initial;
  position: fixed;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: border-box;
`,m=document.createElement("div");function b(e,{left:t,top:n}){const r=t+1,o=n+1;e.style.transform=`translate3d(${r}px, ${o}px, 0px)`}m.classList.add(p),document.body.insertBefore(m,document.getElementById("app"));var x=async(e,t,n)=>{const r=function(e){const{width:t,fontFamily:n}=getComputedStyle(e),r=e.cloneNode(!0);r.classList.add(f);const{style:o}=r;return o.width=t,o.fontFamily=n,r.textContent=e.textContent,b(r,e.getBoundingClientRect()),r}(e);m.appendChild(r);const o=t.getBoundingClientRect();r.style.transition=`transform ${n}ms ease-in-out`,b(r,o),await d(r),i.a&&await a()(0),m.removeChild(r)};t.a=Object(r.memo)(({from:e,to:t,duration:n,data:o,onAnimationEnd:a})=>((e=>{const t=Object(r.useRef)(!1);t.current||(t.current=!0,e())})(()=>{const r=document.querySelector(e),i=document.querySelector(t);r instanceof HTMLElement&&i instanceof HTMLElement&&x(r,i,n).then(()=>{a&&a(o)})}),null))},77:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1);var i=a.b.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: orange;
  }
`;const c=i.withComponent("div");var l=Object(a.b)(c)`
`,s=n(59),u=n(60);var d=a.b.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  height: 25px;
  margin: 2px;

  border-width: 1px;
  border-style: solid;
  border-radius: 100%;

  font-size: 18px;

  ${e=>e.possible?a.a`
    color: ${e.color};
  `:a.a`
    color: #000;
    border-color: rgba(0,0,0,0);
    filter: opacity(0.25);
  `}
`;const p=a.b.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;var f=Object(r.memo)(({numGroups:e,possibleGroups:t})=>{const n=e>>1;return o.a.createElement(p,null,u(e).map(e=>{const r=Object(s.a)(e);return o.a.createElement(d,{key:r,color:e<n?"red":"blue",possible:t.includes(e)},r)}))});const m=a.b.div`
  width: 100%;
  font-size: 1.25em;
  line-height: 150%;
  vertical-align: middle;

  margin-top: 30px;
  margin-bottom: 30px;

  user-select: none;

  @media (max-width: 999px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`,b=a.b.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`,x=a.b.span`
  display: inline-block;
`,h=a.b.strong`
  font-weight: 600;
`,g=a.b.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;t.a=Object(r.memo)(({long:e,calculating:t,completed:n,selectedTeam:a,pickedGroup:c,possibleGroups:u,numGroups:d,reset:p})=>{var v,y;const w=Object(r.useRef)(null),j=Object(r.useRef)(null);Object(r.useEffect)(()=>{j.current=n?null:a},[n,a]);const E=null!==(v=j.current)&&void 0!==v?v:a;return t?o.a.createElement(m,null,o.a.createElement(b,null,o.a.createElement("div",null,"Calculation is taking too long."),o.a.createElement("div",null,"And"," ",o.a.createElement(i,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener"},"here's why"),"."))):n?o.a.createElement(m,null,o.a.createElement(g,null,o.a.createElement("div",null,"Draw completed!"),o.a.createElement(l,{onClick:p},"Restart"))):null!==c?(w.current=o.a.createElement(m,null,o.a.createElement("div",null,e&&E?o.a.createElement("span",null,o.a.createElement(h,null,null!==(y=E.shortName)&&void 0!==y?y:E.name)," goes to group"):o.a.createElement("span",null,"Group")," ",o.a.createElement(h,null,Object(s.a)(c)),"!")),w.current):E?o.a.createElement(m,null,u?o.a.createElement("div",null,"Possible groups for"," ",o.a.createElement(x,null,o.a.createElement(h,null,E.name),":"),o.a.createElement(f,{numGroups:d,possibleGroups:u})):w.current):o.a.createElement(m,null,"Pick a ball")})},79:function(e,t,n){"use strict";var r=n(0);const o=[],a="COLLECTION_ADD",i="COLLECTION_REMOVE";function c(e,t){switch(t.type){case a:return[...e,t.payload];case i:return e.filter(e=>e!==t.payload);default:throw new Error("Unknown action: "+t.type)}}t.a=()=>{const[e,t]=Object(r.useReducer)(c,o),n=e=>{t({type:a,payload:e})},l=e=>{t({type:i,payload:e})};return[e,Object(r.useMemo)(()=>({add:n,remove:l}),[])]}},81:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(1),i=n(123);var c=Object(a.b)(i.a)`
  background: ${e=>e.selected?"#004":e.notSelected?"#ddd":"radial-gradient(#fff, #004)"};

  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&a.a`
      background: radial-gradient(#ccf, #ccf);
    `};
  }
`;const l=a.b.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;t.a=Object(r.memo)(({forceNoSelect:e,display:t,displayTeams:n,pot:a,selectedTeam:i,onPick:s})=>{const u=Object(r.useCallback)(e=>{const t=e.target,n=a.findIndex(e=>e.id===t.dataset.teamid);s(n,a)},[a,s]),d=e||i;return o.a.createElement(l,null,t&&a.map(t=>{var r;return o.a.createElement(c,{key:t.id,"data-teamid":t.id,selected:t===i,notSelected:e||!!i&&t!==i,forceVisible:n,noHover:!!d,onClick:d?void 0:u},null!==(r=t.shortName)&&void 0!==r?r:t.name)}))})},89:function(e,t,n){var r=n(445),o=n(452),a=n(23),i=n(455),c=a((function(e,t){return i(e)?r(e,o(t,1,i,!0)):[]}));e.exports=c},90:function(e,t,n){"use strict";var r=n(1),o=n(91);const a=Object(r.b)(o.a)`
  justify-content: center;
  font-weight: 600;
  background-color: ${e=>e.background};
  color: ${e=>e.color};
`;t.a=a},91:function(e,t,n){"use strict";const r=n(1).b.div`
  display: flex;
  align-items: center;

  height: 21px;
  margin: -1px -1px -1px -1px;
  border: #aaa solid 1px;

  text-align: center;
  text-decoration: none;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 12px;

  @media (max-width: 999px) {
    height: 14px;
    font-family: Roboto, sans-serif;
    font-size: 10px;
  }
`;t.a=r}}]);