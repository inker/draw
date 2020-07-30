(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{466:function(e,t,n){"use strict";t.a=e=>String.fromCharCode(65+e)},468:function(e,t,n){"use strict";const a=n(4).b.div`
`;t.a=a},469:function(e,t,n){"use strict";const a=n(4).b.div`
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
`;t.a=a},470:function(e,t,n){"use strict";const a=n(4).b.div`
  display: flex;
  flex-direction: column;
  min-width: 65%;
  margin: 0px 5px 10px 5px;
`;t.a=a},471:function(e,t,n){"use strict";const a=n(4).b.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 35%;
  margin: 0px 5px 10px 5px;

  @media (max-width: 999px) {
    align-items: center;
  }
`;t.a=a},472:function(e,t,n){"use strict";const a=n(4).b.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    width: 100%;
    flex-direction: column;
  }
`;t.a=a},473:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(482),i=n(4);var l=i.b.div`
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
`,c=n(468),s=n(478);var d=Object(i.b)(s.a)`
  transform: box-shadow 1s linear;
  ${e=>e.highlighted&&"\n  "}
`,u=n(483);const m=i.a`
  filter: grayscale(0.5);
  opacity: 0.4;
`,p=i.a`
  color: #f70;
`;var f=Object(i.b)(u.a)`
  ${e=>e.depleted&&m}
  ${e=>e.highlighted&&p}
`,b=n(479);const g=i.a`
  color: blue;
`,h=i.a`
  filter: grayscale(0.5);
  opacity: 0.4;
`;var x=Object(i.b)(b.a)`
  ${e=>e.selected&&g}
  ${e=>e.picked&&h}
`;var v=Object(a.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:a,selectedTeams:o,background:i,color:l})=>r.a.createElement(d,{highlighted:e},r.a.createElement(f,{highlighted:e,depleted:!n||a.length===n.length,background:i,color:l},"Pot ",t+1),r.a.createElement(c.a,null,n.map(e=>{var t;const{name:n,country:i,shortName:l,pairing:c}=e;return r.a.createElement(x,{key:e.id,"data-cellid":e.id,title:c&&"paired with "+(null!==(t=c.shortName)&&void 0!==t?t:c.name),selected:!!(null==o?void 0:o.includes(e)),picked:a.includes(e),country:null!=i?i:n},null!=l?l:n)})))),w=n(192);const y=i.b.div`
  display: flex;
  border: none;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: -1px;

  &:last-child {
    margin-bottom: 0px;
  }
`,k=Object(i.b)(x)`
  width: 50%;
  margin-right: 0px;
`;var E=Object(a.memo)(({isCurrent:e,potNum:t,teams:n,pickedTeams:a,selectedTeams:o,background:i,color:l})=>r.a.createElement(d,{highlighted:e},r.a.createElement(f,{highlighted:e,depleted:!n||a.length===n.length,background:i,color:l},"Pot ",t+1),r.a.createElement(c.a,null,w(n.length/2).map(e=>{const t=[n[2*e],n[2*e+1]];return r.a.createElement(y,{key:e},t.map(e=>{var t;const{name:n,country:i,shortName:l,pairing:c}=e;return r.a.createElement(k,{key:e.id,"data-cellid":e.id,title:c&&"paired with "+(null!==(t=c.shortName)&&void 0!==t?t:c.name),selected:!!o&&o.includes(e),picked:a.includes(e),country:null!=i?i:n},null!=l?l:n)}))}))));t.a=Object(a.memo)(({initialPots:e,pots:t,selectedTeams:n,currentPotNum:a,split:i})=>r.a.createElement(l,{limitWidth:!i},e.map((l,c)=>{const s=i?E:v,d=c===a,u=o(e[c],t[c],null!=n?n:[]);return r.a.createElement(s,{key:l[0].id,potNum:c,isCurrent:d,teams:l,pickedTeams:u,selectedTeams:n,background:"rgba(0, 0, 0, 0.75)",color:"#fff"})})))},474:function(e,t,n){"use strict";var a=n(0),r=n(194),o=n.n(r),i=n(480),l=n(497),c=n(495);let s;var d=(e,...t)=>{s||(s=document.createElement("style"),document.head.appendChild(s));const n=Object(c.a)("styled-element-"),a=((e,...t)=>e.reduce((e,n,a)=>`${e}${n}${l(t[a])?"":t[a]}`,""))(e,...t);return s.textContent+=`.${n}{${a}}`,n};const u=e=>((e,t)=>new Promise(n=>{e.addEventListener(t,(function a(r){e.removeEventListener(t,a),n(r)}))}))(e,"transitionend"),m=d`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`,p=d`
  color: initial;
  position: fixed;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: border-box;
`,f=document.createElement("div");function b(e,{left:t,top:n}){const a=t+1,r=n+1;e.style.transform=`translate3d(${a}px, ${r}px, 0px)`}f.classList.add(m),document.body.insertBefore(f,document.getElementById("app"));var g=async(e,t,n)=>{const a=function(e){const{width:t,fontFamily:n}=getComputedStyle(e),a=e.cloneNode(!0);a.classList.add(p);const{style:r}=a;return r.width=t,r.fontFamily=n,a.textContent=e.textContent,b(a,e.getBoundingClientRect()),a}(e);f.appendChild(a);const r=t.getBoundingClientRect();a.style.transition=`transform ${n}ms ease-in-out`,b(a,r),await u(a),i.a&&await o()(0),f.removeChild(a)};t.a=Object(a.memo)(({from:e,to:t,duration:n,data:r,onAnimationEnd:o})=>((e=>{const t=Object(a.useRef)(!1);t.current||(t.current=!0,e())})(()=>{const a=document.querySelector(e),i=document.querySelector(t);a instanceof HTMLElement&&i instanceof HTMLElement&&g(a,i,n).then(()=>{o&&o(r)})}),null))},475:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(4),i=n(494),l=n(493),c=n(466),s=n(192);var d=o.b.div`
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

  ${e=>e.possible?o.a`
    color: ${e.color};
  `:o.a`
    color: #000;
    border-color: rgba(0,0,0,0);
    filter: opacity(0.25);
  `}
`;const u=o.b.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;var m=Object(a.memo)(({numGroups:e,possibleGroups:t})=>{const n=e>>1;return r.a.createElement(u,null,s(e).map(e=>{const a=Object(c.a)(e);return r.a.createElement(d,{key:a,color:e<n?"red":"blue",possible:t.includes(e)},a)}))});const p=o.b.div`
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
`,f=o.b.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`,b=o.b.span`
  display: inline-block;
`,g=o.b.strong`
  font-weight: 600;
`,h=o.b.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;t.a=Object(a.memo)(({long:e,calculating:t,completed:n,selectedTeam:o,pickedGroup:s,possibleGroups:d,numGroups:u,reset:x})=>{var v,w;const y=Object(a.useRef)(null),k=Object(a.useRef)(null);Object(a.useEffect)(()=>{k.current=n?null:o},[n,o]);const E=null!==(v=k.current)&&void 0!==v?v:o;return t?r.a.createElement(p,null,r.a.createElement(f,null,r.a.createElement("div",null,"Calculation is taking too long."),r.a.createElement("div",null,"And"," ",r.a.createElement(i.a,{href:"https://github.com/inker/draw/issues/14",target:"_blank",rel:"noopener"},"here's why"),"."))):n?r.a.createElement(p,null,r.a.createElement(h,null,r.a.createElement("div",null,"Draw completed!"),r.a.createElement(l.a,{onClick:x},"Restart"))):null!==s?(y.current=r.a.createElement(p,null,r.a.createElement("div",null,e&&E?r.a.createElement("span",null,r.a.createElement(g,null,null!==(w=E.shortName)&&void 0!==w?w:E.name)," goes to group"):r.a.createElement("span",null,"Group")," ",r.a.createElement(g,null,Object(c.a)(s)),"!")),y.current):E?r.a.createElement(p,null,d?r.a.createElement("div",null,"Possible groups for"," ",r.a.createElement(b,null,r.a.createElement(g,null,E.name),":"),r.a.createElement(m,{numGroups:u,possibleGroups:d})):y.current):r.a.createElement(p,null,"Pick a ball")})},476:function(e,t,n){"use strict";var a=n(0);const r=[],o="COLLECTION_ADD",i="COLLECTION_REMOVE";function l(e,t){switch(t.type){case o:return[...e,t.payload];case i:return e.filter(e=>e!==t.payload);default:throw new Error("Unknown action: "+t.type)}}t.a=()=>{const[e,t]=Object(a.useReducer)(l,r),n=e=>{t({type:o,payload:e})},c=e=>{t({type:i,payload:e})};return[e,Object(a.useMemo)(()=>({add:n,remove:c}),[])]}},477:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(4),i=n(492);var l=Object(o.b)(i.a)`
  background: ${e=>e.selected?"#004":e.notSelected?"#ddd":"radial-gradient(#fff, #004)"};

  cursor: ${e=>e.noHover?"not-allowed":"pointer"};

  &:hover {
    ${e=>!e.noHover&&o.a`
      background: radial-gradient(#ccf, #ccf);
    `};
  }
`;const c=o.b.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`;t.a=Object(a.memo)(({forceNoSelect:e,display:t,pot:n,selectedTeam:o,onPick:i})=>{const s=Object(a.useCallback)(e=>{const t=e.target,a=n.findIndex(e=>e.id===t.dataset.teamid);i(a,n)},[n,i]),d=e||o;return r.a.createElement(c,null,t&&n.map(t=>{var n;return r.a.createElement(l,{key:t.id,"data-teamid":t.id,selected:t===o,notSelected:e||!!o&&t!==o,noHover:!!d,onClick:d?void 0:s},null!==(n=t.shortName)&&void 0!==n?n:t.name)}))})},478:function(e,t,n){"use strict";const a=n(4).b.div`
  border: #aaa solid 1px;
  margin: 0px 5px 10px 5px;
  width: 150px;
  min-width: 0;

  @media (max-width: 999px) {
    margin: 0px 3px 6px 3px;
  }
`;t.a=a},479:function(e,t,n){"use strict";var a=n(4),r=n(496),o=n(469);var i=Object(a.b)(o.a)`
  padding-left: 3px;
  padding-right: 3px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 999px) {
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, sans-serif;
  }
`;const l=Object(a.b)(i)`
  background-position: 3px;
  background-size: 16px;
  background-repeat: no-repeat;

  padding-left: 22px;

  @media (max-width: 999px) {
    background-position: 2px;
    background-size: 12px;
    padding-left: 16px;
  }
`,c=Object(a.b)(l)`
  ${({country:e})=>e&&a.a`
    background-image: url('${Object(r.a)(e)}');
  `}
`;t.a=c},482:function(e,t,n){var a=n(498),r=n(501),o=n(70),i=n(503),l=o((function(e,t){return i(e)?a(e,r(t,1,i,!0)):[]}));e.exports=l},483:function(e,t,n){"use strict";var a=n(4),r=n(469);const o=Object(a.b)(r.a)`
  justify-content: center;
  font-weight: 600;
  background-color: ${e=>e.background};
  color: ${e=>e.color};
`;t.a=o},492:function(e,t,n){"use strict";var a=n(4);var r=a.b.div`
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
`;const o=Object(a.b)(r)`
  ${e=>e.selected?a.a`
    font-size: 0.8em;
    font-weight: bold;
    color: white;
  `:a.a`
    font-size: 0;
    background: radial-gradient(#004, #002, #002);
  `}

  @media (max-width: 999px) {
    font-size: ${e=>e.selected?8:0}px;
  }
`;t.a=o},497:function(e,t){e.exports=function(e){return null==e}},498:function(e,t,n){var a=n(72),r=n(499),o=n(500),i=n(28),l=n(41),c=n(73);e.exports=function(e,t,n,s){var d=-1,u=r,m=!0,p=e.length,f=[],b=t.length;if(!p)return f;n&&(t=i(t,l(n))),s?(u=o,m=!1):t.length>=200&&(u=c,m=!1,t=new a(t));e:for(;++d<p;){var g=e[d],h=null==n?g:n(g);if(g=s||0!==g?g:0,m&&h==h){for(var x=b;x--;)if(t[x]===h)continue e;f.push(g)}else u(t,h,s)||f.push(g)}return f}},499:function(e,t,n){var a=n(71);e.exports=function(e,t){return!!(null==e?0:e.length)&&a(e,t,0)>-1}},500:function(e,t){e.exports=function(e,t,n){for(var a=-1,r=null==e?0:e.length;++a<r;)if(n(t,e[a]))return!0;return!1}},501:function(e,t,n){var a=n(74),r=n(502);e.exports=function e(t,n,o,i,l){var c=-1,s=t.length;for(o||(o=r),l||(l=[]);++c<s;){var d=t[c];n>0&&o(d)?n>1?e(d,n-1,o,i,l):a(l,d):i||(l[l.length]=d)}return l}},502:function(e,t,n){var a=n(20),r=n(43),o=n(6),i=a?a.isConcatSpreadable:void 0;e.exports=function(e){return o(e)||r(e)||!!(i&&e&&e[i])}},503:function(e,t,n){var a=n(42),r=n(12);e.exports=function(e){return r(e)&&a(e)}},504:function(e,t,n){"use strict";var a=n(0);var r=class{constructor(){this.callbacks=new Map}add(e,t){this.callbacks.set(e,t)}addAndGetId(e){const t=Math.random().toString(36).slice(2);return this.add(t,e),t}resolve(e,t){this.getCallbackAndDelete(e)(null,t)}reject(e,t){this.getCallbackAndDelete(e)(t)}getCallbackAndDelete(e){const t=this.callbacks.get(e);if(!t)throw new Error("no resolver with id = "+e);return this.callbacks.delete(e),t}};const o=(e,t)=>(n,a)=>{n?t(n):e(a)};var i=class{constructor(){this.manager=new r}getPromise(e){return new Promise(async(t,n)=>{const a=o(t,n);this.manager.add(e,a)})}getPromiseWithId(e){return new Promise(async(t,n)=>{const a=o(t,n),r=this.manager.addAndGetId(a);e&&e(r)})}resolve(e,t){this.manager.resolve(e,t)}reject(e,t){this.manager.reject(e,t)}},l=n(195),c=n.n(l);var s=class{constructor(e,t){this.asyncManager=new i,this.timeout=t,this.worker=e,this.worker.onmessage=e=>{const{messageId:t,data:n}=e.data;this.asyncManager.resolve(t,n)}}sendAndReceive(e){const t=this.asyncManager.getPromiseWithId(t=>{this.worker.postMessage({messageId:t,data:e})});return void 0===this.timeout?t:c()(t,this.timeout)}terminate(){this.worker.terminate()}};t.a=e=>{const t=Object(a.useMemo)(()=>new s(new e,12e4),[]);return Object(a.useEffect)(()=>()=>{t.terminate()},[]),Object(a.useCallback)(t.sendAndReceive.bind(t),[t])}},505:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(4),i=n(466),l=n(482),c=n(192),s=n(478),d=n(483),u=n(468),m=n(479);const p=o.c`
  from {
    background-color: white;
    box-shadow: 0 0 20px #08f;
  }
  to {}
`,f=o.c`
  from {
    background-color: #ff8;
  }
  to {}
`,b=o.a`
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${p} 1s ease;
  box-shadow: 0 0 5px #6af;
`,g=o.a`
  animation: ${f} 5s normal forwards;
`;var h=Object(o.b)(m.a)`
  ${e=>e.possible&&b}
  ${e=>e.picked&&g}
`,x=n(481),v=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in x?e.name:void 0};var w=Object(a.memo)(({maxTeams:e,groupLetter:t,teams:n,potNum:a,possible:o,airborneTeams:i,background:m,color:p})=>{const f=l(n,i);return r.a.createElement(s.a,null,r.a.createElement(d.a,{background:m,color:p},"Group"," ",t),r.a.createElement(u.a,null,f.map(e=>{var t;return r.a.createElement(h,{country:v(e),picked:!0},null!==(t=e.shortName)&&void 0!==t?t:e.name)}),c(f.length,e).map(e=>r.a.createElement(h,{key:e,possible:e===a&&o,"data-cellid":`${t}${e}`}))))});const y=o.b.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`;t.a=Object(a.memo)(({maxTeams:e,currentPotNum:t,groups:n,possibleGroups:a,airborneTeams:o,groupColors:l})=>r.a.createElement(y,null,null==n?void 0:n.map((c,s)=>{const d=Object(i.a)(s),u=l&&l[~~(s/n.length*l.length)];return r.a.createElement(w,{key:d,maxTeams:e,groupLetter:d,teams:c,potNum:t,possible:!!(null==a?void 0:a.includes(s)),airborneTeams:o,background:u})})))},506:function(e,t,n){"use strict";var a=n(0),r=n(194),o=n.n(r);const i={key:null,isTimedOut:!1},l="TIMEOUT_VALUE_SET",c="TIMEOUT_RESET";function s(e,t){switch(t.type){case l:return{key:t.payload,isTimedOut:!!t.payload&&t.payload===e.key};case c:return i;default:throw new Error("Unknown action: "+t)}}t.a=e=>{const[t,n]=Object(a.useReducer)(s,i),r=async t=>{n({type:l,payload:t}),await o()(e),n({type:l,payload:t})},d=()=>{n({type:c})},u=Object(a.useMemo)(()=>({set:r,reset:d}),[]);return[t.isTimedOut,u]}}}]);