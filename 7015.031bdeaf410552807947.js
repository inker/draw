(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[7015],{35888:e=>{"use strict";e.exports=JSON.parse('["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"]')},12988:(e,t,n)=>{"use strict";e.exports=n(35888)},88668:(e,t,n)=>{var r=n(83369),o=n(90619),a=n(72385);function i(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=a,e.exports=i},47443:(e,t,n)=>{var r=n(42118);e.exports=function(e,t){return!!(null==e?0:e.length)&&r(e,t,0)>-1}},1196:e=>{e.exports=function(e,t,n){for(var r=-1,o=null==e?0:e.length;++r<o;)if(n(t,e[r]))return!0;return!1}},14636:(e,t,n)=>{var r=n(22545),o=n(35694),a=n(1469),i=n(44144),s=n(65776),l=n(36719),c=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=a(e),d=!n&&o(e),u=!n&&!d&&i(e),m=!n&&!d&&!u&&l(e),p=n||d||u||m,f=p?r(e.length,String):[],h=f.length;for(var v in e)!t&&!c.call(e,v)||p&&("length"==v||u&&("offset"==v||"parent"==v)||m&&("buffer"==v||"byteLength"==v||"byteOffset"==v)||s(v,h))||f.push(v);return f}},62488:e=>{e.exports=function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}},70151:(e,t,n)=>{var r=n(278),o=n(73480);e.exports=function(e){return o(r(e))}},20731:(e,t,n)=>{var r=n(88668),o=n(47443),a=n(1196),i=n(29932),s=n(7518),l=n(74757);e.exports=function(e,t,n,c){var d=-1,u=o,m=!0,p=e.length,f=[],h=t.length;if(!p)return f;n&&(t=i(t,s(n))),c?(u=a,m=!1):t.length>=200&&(u=l,m=!1,t=new r(t));e:for(;++d<p;){var v=e[d],g=null==n?v:n(v);if(v=c||0!==v?v:0,m&&g==g){for(var x=h;x--;)if(t[x]===g)continue e;f.push(v)}else u(t,g,c)||f.push(v)}return f}},21078:(e,t,n)=>{var r=n(62488),o=n(37285);e.exports=function e(t,n,a,i,s){var l=-1,c=t.length;for(a||(a=o),s||(s=[]);++l<c;){var d=t[l];n>0&&a(d)?n>1?e(d,n-1,a,i,s):r(s,d):i||(s[s.length]=d)}return s}},9454:(e,t,n)=>{var r=n(44239),o=n(37005);e.exports=function(e){return o(e)&&"[object Arguments]"==r(e)}},38749:(e,t,n)=>{var r=n(44239),o=n(41780),a=n(37005),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&o(e.length)&&!!i[r(e)]}},280:(e,t,n)=>{var r=n(25726),o=n(86916),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return o(e);var t=[];for(var n in Object(e))a.call(e,n)&&"constructor"!=n&&t.push(n);return t}},69877:e=>{var t=Math.floor,n=Math.random;e.exports=function(e,r){return e+t(n()*(r-e+1))}},25127:(e,t,n)=>{var r=n(73480),o=n(52628);e.exports=function(e){return r(o(e))}},22545:e=>{e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},47415:(e,t,n)=>{var r=n(29932);e.exports=function(e,t){return r(t,(function(t){return e[t]}))}},74757:e=>{e.exports=function(e,t){return e.has(t)}},37285:(e,t,n)=>{var r=n(62705),o=n(35694),a=n(1469),i=r?r.isConcatSpreadable:void 0;e.exports=function(e){return a(e)||o(e)||!!(i&&e&&e[i])}},25726:e=>{var t=Object.prototype;e.exports=function(e){var n=e&&e.constructor;return e===("function"==typeof n&&n.prototype||t)}},86916:(e,t,n)=>{var r=n(5569)(Object.keys,Object);e.exports=r},31167:(e,t,n)=>{e=n.nmd(e);var r=n(31957),o=t&&!t.nodeType&&t,a=o&&e&&!e.nodeType&&e,i=a&&a.exports===o&&r.process,s=function(){try{var e=a&&a.require&&a.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=s},5569:e=>{e.exports=function(e,t){return function(n){return e(t(n))}}},90619:e=>{e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},72385:e=>{e.exports=function(e){return this.__data__.has(e)}},73480:(e,t,n)=>{var r=n(69877);e.exports=function(e,t){var n=-1,o=e.length,a=o-1;for(t=void 0===t?o:t;++n<t;){var i=r(n,a),s=e[i];e[i]=e[n],e[n]=s}return e.length=t,e}},91966:(e,t,n)=>{var r=n(20731),o=n(21078),a=n(5976),i=n(29246),s=a((function(e,t){return i(e)?r(e,o(t,1,i,!0)):[]}));e.exports=s},35694:(e,t,n)=>{var r=n(9454),o=n(37005),a=Object.prototype,i=a.hasOwnProperty,s=a.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(e){return o(e)&&i.call(e,"callee")&&!s.call(e,"callee")};e.exports=l},29246:(e,t,n)=>{var r=n(98612),o=n(37005);e.exports=function(e){return o(e)&&r(e)}},44144:(e,t,n)=>{e=n.nmd(e);var r=n(55639),o=n(95062),a=t&&!t.nodeType&&t,i=a&&e&&!e.nodeType&&e,s=i&&i.exports===a?r.Buffer:void 0,l=(s?s.isBuffer:void 0)||o;e.exports=l},14293:e=>{e.exports=function(e){return null==e}},36719:(e,t,n)=>{var r=n(38749),o=n(7518),a=n(31167),i=a&&a.isTypedArray,s=i?o(i):r;e.exports=s},3674:(e,t,n)=>{var r=n(14636),o=n(280),a=n(98612);e.exports=function(e){return a(e)?r(e):o(e)}},83608:(e,t,n)=>{var r=n(69877),o=n(16612),a=n(18601),i=parseFloat,s=Math.min,l=Math.random;e.exports=function(e,t,n){if(n&&"boolean"!=typeof n&&o(e,t,n)&&(t=n=void 0),void 0===n&&("boolean"==typeof t?(n=t,t=void 0):"boolean"==typeof e&&(n=e,e=void 0)),void 0===e&&void 0===t?(e=0,t=1):(e=a(e),void 0===t?(t=e,e=0):t=a(t)),e>t){var c=e;e=t,t=c}if(n||e%1||t%1){var d=l();return s(e+d*(t-e+i("1e-"+((d+"").length-1))),t)}return r(e,t)}},69983:(e,t,n)=>{var r=n(70151),o=n(25127),a=n(1469);e.exports=function(e){return(a(e)?r:o)(e)}},95062:e=>{e.exports=function(){return!1}},52628:(e,t,n)=>{var r=n(47415),o=n(3674);e.exports=function(e){return null==e?[]:r(e,o(e))}},45033:(e,t,n)=>{"use strict";n.d(t,{Z:()=>C});var r=n(67294),o=n(29163),a=n(10746);const i=a.Z.withComponent("button"),s=(0,o.ZP)(i)`
  padding: initial;
  border: initial;
  background-color: initial;
`;var l=n(89311);const c=(0,r.memo)((({children:e,delay:t})=>(e=>{const[t,n]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{const t=setTimeout((()=>{n(!0)}),e);return()=>{clearTimeout(t)}}),[]),t})(t)?r.createElement(r.Fragment,null,e):null));var d=n(80737),u=n(96026);const m=o.ZP.div`
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

  ${e=>e.possible?o.iv`
    color: ${e.color};
  `:o.iv`
    border-color: rgba(0,0,0,0);
    filter: opacity(0.25);
  `}
`,p=o.ZP.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`,f=(0,r.memo)((({numGroups:e,possibleGroups:t})=>{const n=e>>1;return r.createElement(p,null,u(e).map((e=>{const o=(0,d.Z)(e);return r.createElement(m,{key:o,color:e<n?"red":"blue",possible:t.includes(e)},o)})))})),h=o.ZP.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`,v=(0,r.memo)((()=>r.createElement(h,null,r.createElement("div",null,"Calculation is taking too long."),r.createElement("div",null,"And"," ",r.createElement(a.Z,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener"},"here's why"),"."))));var g=n(26962),x=n.n(g);const b=o.vJ`
  body * {
    transition-property: none !important;
    animation: none !important;
  }
`,y=n.e(2154).then(n.bind(n,49629)),w=()=>({downloadClicked:null,transitionsEnabled:!0}),E=(0,r.memo)((({completed:e,groupsElement:t})=>{const[{downloadClicked:n,transitionsEnabled:o},a]=(0,r.useState)(w),i=(0,r.useCallback)((e=>{a({downloadClicked:e,transitionsEnabled:!1})}),[a]);(0,r.useEffect)((()=>{(async()=>{if(n){try{const e=t.current;if(!e)throw new Error("groups element is null");await x()(0);const r=await y;await r.default(e,n)}catch(e){console.error(e)}i(null)}})()}),[n]),(0,r.useEffect)((()=>{e||a({downloadClicked:null,transitionsEnabled:!0})}),[e]);const l=(0,r.useCallback)((()=>i("png")),[i]),c=(0,r.useCallback)((()=>i("svg")),[i]);return e&&t?r.createElement("div",null,!o&&r.createElement(b,null),"Download as ",r.createElement(s,{onClick:l},"PNG"),", ",r.createElement(s,{onClick:c},"SVG")):null})),Z=o.ZP.div`
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
`,k=o.ZP.span`
  display: inline-block;
`,j=o.ZP.strong`
  font-weight: 600;
`,P=o.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 12px;
  }
`,C=(0,r.memo)((({long:e,completed:t,selectedTeam:n,pickedGroup:o,possibleGroups:a,isDisplayPossibleGroupsText:i,numGroups:u,groupsElement:m,reset:p})=>{var h,g;const x=(0,r.useRef)(null),b=(0,r.useRef)(null);(0,r.useEffect)((()=>{b.current=t?null:n}),[t,n]);const y=null!==(h=b.current)&&void 0!==h?h:n;return t?r.createElement(Z,null,r.createElement(P,null,r.createElement("div",null,"Draw completed!"),r.createElement(E,{completed:t,groupsElement:m}),r.createElement(s,{onClick:p},"Restart"))):null!==o?(x.current=r.createElement(Z,null,r.createElement("div",null,e&&y?r.createElement("span",null,r.createElement(j,null,null!==(g=y.shortName)&&void 0!==g?g:y.name)," goes to group"):r.createElement("span",null,"Group")," ",r.createElement(j,null,(0,d.Z)(o)),"!")),x.current):y?r.createElement(Z,null,i?r.createElement("div",null,"Possible groups for"," ",r.createElement(k,null,r.createElement(j,null,y.name),":"),a?r.createElement(f,{numGroups:u,possibleGroups:a}):r.createElement("div",null,r.createElement(l.Z,{initialNum:0,maxNum:10,interval:2e3}),r.createElement(c,{delay:1e4},r.createElement(v,null)))):x.current):r.createElement(Z,null,"Pick a ball")}))},92317:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(29163).ZP.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 35%;
  margin: 0 5px 10px 5px;

  @media (max-width: 999px) {
    align-items: center;
  }
`},19992:(e,t,n)=>{"use strict";n.d(t,{Z:()=>y});var r=n(67294),o=n(29163),a=n(64982),i=n(14293),s=n(46087);let l;var c=n(73935),d=n(12988);const u=(0,r.memo)((({tagName:e,modalRoot:t,children:n})=>{const o=(0,r.useMemo)((()=>{const t=d.includes(e)&&"svg"!==e?"http://www.w3.org/1999/xhtml":"http://www.w3.org/2000/svg";return document.createElementNS(t,e)}),[e,t]),a=(0,r.useRef)(o);return(0,r.useEffect)((()=>(t.appendChild(o),()=>{t.removeChild(o)})),[]),c.createPortal(n,a.current)})),m=((e,...t)=>{l||(l=document.createElement("style"),document.head.appendChild(l));const n=(0,s.Z)("styled-element-"),r=((e,...t)=>e.reduce(((e,n,r)=>`${e}${n}${i(t[r])?"":t[r]}`),""))(e,...t);return l.textContent+=`.${n}{${r}}`,n})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,p=document.createElement("div");p.classList.add(m),document.body.insertBefore(p,document.getElementById("app"));const f=(0,r.memo)((({children:e})=>r.createElement(u,{tagName:"div",modalRoot:p},e)));var h=n(930);const v=(0,o.ZP)(h.Z)`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 1000;
  user-select: none;
  pointer-events: none;
`,g=e=>"string"==typeof e?document.querySelector(e):e.current,x=e=>`transform ${e}ms ease-in-out`;function b(e){const{left:t,top:n}=e.getBoundingClientRect();return`translate3d(${t}px, ${n}px, 0px)`}const y=(0,r.memo)((({from:e,to:t,duration:n,team:o,onAnimationEnd:i})=>{var s;const l=(0,r.useMemo)((()=>g(e)),[e]),c=(0,r.useMemo)((()=>g(t)),[t]),[d,u]=(0,r.useState)(l);(0,r.useLayoutEffect)((()=>{d===l&&u(c)}),[d]);const m=(0,r.useMemo)((()=>({transform:d instanceof HTMLElement?b(d):"",transition:d===c?x(n):""})),[d,c,n]),p=(0,r.useCallback)((e=>{"transform"===e.propertyName&&(null==i||i())}),[i]);return d&&r.createElement(f,null,r.createElement(v,{country:(0,a.Z)(o),style:m,onTransitionEnd:p},null!==(s=o.shortName)&&void 0!==s?s:o.name))}))},31080:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(29163).ZP.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    width: 100%;
    flex-direction: column;
  }
`},1245:(e,t,n)=>{"use strict";n.d(t,{Z:()=>k});var r=n(67294),o=n(29163),a=n(91966);const i=o.ZP.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  & > * {
    flex: 1;
    flex-basis: 22%;
    ${e=>e.limitWidth&&o.iv`
      max-width: 160px;
    `};

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`;var s=n(96026),l=n(68398),c=n(24729),d=n(42048);const u=(0,o.ZP)(d.Z)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n  "}
`;var m=n(13963);const p=o.iv`
  filter: grayscale(0.5);
  opacity: 0.4;
`,f=o.iv`
  color: #f70;
`,h=(0,o.ZP)(m.Z)`
  ${e=>e.depleted&&p}
  ${e=>e.highlighted&&f}
`,v=(0,o.ZP)(c.Z)`
  & + & {
    border-left: ${e=>e.theme.border};
  }
`;var g=n(930);const x=o.iv`
  color: ${e=>e.theme.isDarkMode?"yellow":"blue"};
`,b=o.iv`
  filter: grayscale(0.5);
  opacity: 0.4;
`,y=(0,o.ZP)(g.Z)`
  ${e=>e.selected&&x}
  ${e=>e.picked&&b}
`,w=(0,r.memo)((({teams:e,pickedTeams:t,selectedTeams:n})=>r.createElement(l.Z,null,e.map((e=>{var o;const{name:a,country:i,shortName:s,pairing:l}=e;return r.createElement(v,{key:e.id},r.createElement(y,{"data-cellid":e.id,title:l&&"paired with "+(null!==(o=l.shortName)&&void 0!==o?o:l.name),selected:!!(null==n?void 0:n.includes(e)),picked:t.includes(e),country:null!=i?i:a},null!=s?s:a))}))))),E=(0,r.memo)((({isCurrent:e,potNum:t,teams:n,pickedTeams:o,selectedTeams:a,numCols:i,headerStyles:d})=>{const m=n.length/i;return r.createElement(u,{highlighted:e},r.createElement("thead",null,r.createElement(l.Z,null,r.createElement(c.Z,{colSpan:i},r.createElement(h,{highlighted:e,depleted:!n||o.length===n.length,styles:d},"Pot ",t+1)))),r.createElement("tbody",null,s(m).map((e=>{const t=e*i,l=s(i).map((e=>n[t+e]));return r.createElement(w,{key:l.map((e=>e.id)).join(":"),teams:l,selectedTeams:a,pickedTeams:o})}))))})),Z=o.iv`
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
`,k=(0,r.memo)((({initialPots:e,pots:t,selectedTeams:n,currentPotNum:o,split:s})=>r.createElement(i,{limitWidth:!s},e.map(((i,l)=>{const c=l===o,d=a(e[l],t[l],null!=n?n:[]);return r.createElement(E,{key:i[0].id,potNum:l,isCurrent:c,teams:i,pickedTeams:d,selectedTeams:n,numCols:s?2:1,headerStyles:Z})})))))},48415:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(29163).ZP.div`
  display: flex;
  flex-direction: column;
  min-width: 65%;
  margin: 0 5px 10px 5px;
`},53565:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(67294),o=n(29163);const a=o.ZP.div`
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
`,i=(0,o.ZP)(a)`
  ${e=>e.selected?o.iv`
    font-size: 0.8em;
    font-weight: bold;
    color: white;
  `:o.iv`
    font-size: 0;
    background: radial-gradient(#004, #002, #002);
  `}

  ${e=>e.forceVisible&&o.iv`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`,s=(0,r.memo)((({noHover:e,...t})=>{const n=(0,r.useRef)(null),o=(0,r.useCallback)((t=>{const r=n.current;!e&&r&&document.activeElement===r&&"Enter"===t.key&&r.click()}),[n,e]);var a,s;return a="keydown",s=o,(0,r.useEffect)((()=>(window.addEventListener(a,s),()=>{window.removeEventListener(a,s)})),[a,s]),r.createElement(i,Object.assign({},t,{noHover:e,ref:n,tabIndex:e?void 0:0}))}))},12414:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var r=n(67294),o=n(29163),a=n(53565);const i=(0,o.ZP)(a.Z)`
  background: ${e=>e.selected?"#004":e.notSelected?"#ddd":"radial-gradient(#fff, #004)"};

  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&o.iv`
      background: radial-gradient(#ccf, #ccf);
    `};
  }
`,s=o.ZP.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`,l=(0,r.memo)((({forceNoSelect:e,display:t,displayTeams:n,pot:o,selectedTeam:a,onPick:l})=>{const c=(0,r.useCallback)((e=>{const t=e.target,n=o.findIndex((e=>e.id===t.dataset.teamid));l(n,o)}),[o,l]),d=e||a;return r.createElement(s,null,t&&o.map((t=>{var o;return r.createElement(i,{key:t.id,"data-teamid":t.id,selected:t===a,notSelected:e||!!a&&t!==a,forceVisible:n,noHover:!!d,onClick:d?void 0:c},null!==(o=t.shortName)&&void 0!==o?o:t.name)})))}))},49634:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(29163).ZP.span`
  display: flex;
  align-items: center;

  text-align: center;
  text-decoration: none;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 12px;

  @media (max-width: 999px) {
    font-family: Roboto, sans-serif;
    font-size: 10px;
  }
`},24729:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(29163).ZP.td`
  height: 20px;
  padding: 0;
  background-color: ${e=>e.theme.isDarkMode?"#58595e":"white"};

  @media (max-width: 999px) {
    height: 14px;
  }
`},97256:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(29163),o=n(49634);const a=(0,r.ZP)(o.Z)`
  margin: 0 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${e=>e.theme.isDarkMode&&r.iv`
    text-shadow: 0.5px 0.5px 1px #222;
  `}

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`},930:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(29163),o=n(52482),a=n(97256);const i=(0,r.ZP)(a.Z)`
  background-position-y: 1px;
  background-size: 16px;
  background-repeat: no-repeat;

  padding-left: 19px;

  @media (max-width: 999px) {
    background-size: 12px;
    padding-left: 13px;
  }
`,s=(0,r.ZP)(i)`
  ${({country:e})=>e&&r.iv`
    background-image: url('${(0,o.Z)(e)}');
  `}
`},93749:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(29163),o=n(97256);const a=(0,r.ZP)(o.Z)`
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '.';
  }
`},13963:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(29163),o=n(49634);const a=(0,r.ZP)(o.Z)`
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: 600;
  ${e=>e.styles};
`},68398:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(29163).ZP.tr`
  border: ${e=>e.theme.border};
`},42048:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(29163).ZP.table`
  table-layout: fixed;
  border-left: ${e=>e.theme.border};
  border-right: ${e=>e.theme.border};
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 5px 10px 5px;
  width: 150px;
  min-width: 0;

  @media (max-width: 999px) {
    width: max-content;
    margin: 0 3px 6px 3px;
  }
`},80737:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=e=>String.fromCharCode(65+e)},64982:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(89105);const o=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in r.Z?e.name:void 0}},86893:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294);const o=(e,t)=>{const n=(0,r.useRef)(!1);(0,r.useEffect)((()=>{n.current?e():n.current=!0}),t)}},72935:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294);const o=e=>{const t=(0,r.useRef)();return(0,r.useEffect)((()=>{t.current=e})),t.current}},43887:(e,t,n)=>{"use strict";n.d(t,{Z:()=>u});var r=n(67294);Object.create;Object.create;function o(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}const a=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}},i=(e,t)=>(n,r)=>{n?t(n):e(r)};const s=class{constructor(){this.manager=new a}getPromise(e){return new Promise((async(t,n)=>{const r=i(t,n);this.manager.add(e,r)}))}getPromiseWithId(e){return new Promise((async(t,n)=>{const r=i(t,n),o=this.manager.addAndGetId(r);e&&e(o)}))}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}};var l,c;l=new WeakMap,c=new WeakMap;const d=class{constructor(e){l.set(this,void 0),c.set(this,new s),function(e,t,n){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");t.set(e,n)}(this,l,e),o(this,l).onmessage=e=>{const{messageId:t,data:n}=e.data;o(this,c).resolve(t,n)}}sendAndReceive(e){return o(this,c).getPromiseWithId((t=>{o(this,l).postMessage({messageId:t,data:e})}))}terminate(){o(this,l).terminate()}},u=e=>{const t=(0,r.useMemo)((()=>new d(new e)),[e]);return(0,r.useEffect)((()=>()=>{t.terminate()}),[t]),(0,r.useCallback)(t.sendAndReceive.bind(t),[t])}}}]);