(self.webpackChunkcreateursdecompagnie_fr=self.webpackChunkcreateursdecompagnie_fr||[]).push([[718],{3256:(e,t,n)=>{"use strict";n.r(t),n.d(t,{contentTitle:()=>Z,default:()=>P,frontMatter:()=>A,metadata:()=>R,toc:()=>F});var r=n(7462),a=n(7294),i=n(3905),l=n(3148),o=n(6010);const u={localTime:"localTime_yuoo",calendarEntry:"calendarEntry_V70G",calendarEntryTime:"calendarEntryTime_RQfh",calendarEntryTitle:"calendarEntryTitle_RGya",calendarEntryCalendar:"calendarEntryCalendar_gP3_",calendarTabDimanche:"calendarTabDimanche_r2Zm",calendarTabLundi:"calendarTabLundi_vUo8",calendarTabMardi:"calendarTabMardi_RKZf",calendarTabMercredi:"calendarTabMercredi_A92n",calendarTabJeudi:"calendarTabJeudi_T775",calendarTabVendredi:"calendarTabVendredi_cj4E",calendarTabSamedi:"calendarTabSamedi_jnI0",popupTitle:"popupTitle_qzzN",popupSubtitle:"popupSubtitle_zLE9",popupHeader:"popupHeader_z8gh"};var c=n(2466),s=n(6775),d=n(1980),m=n(7392),p=n(12);function f(e){return function(e){var t;return(null==(t=a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function v(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??f(n);return function(e){const t=(0,m.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,d._X)(i),(0,a.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(r.location.search);t.set(i,e),r.replace({...r.location,search:t.toString()})}),[i,r])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,i=v(e),[l,o]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:i}))),[u,c]=b({queryString:n,groupId:r}),[s,d]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,i]=(0,p.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:r}),m=(()=>{const e=u??s;return h({value:e,tabValues:i})?e:null})();(0,a.useLayoutEffect)((()=>{m&&o(m)}),[m]);return{selectedValue:l,selectValue:(0,a.useCallback)((e=>{if(!h({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);o(e),c(e),d(e)}),[c,d,i]),tabValues:i}}var x=n(2389);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function k(e){let{className:t,block:n,selectedValue:i,selectValue:l,tabValues:u}=e;const s=[],{blockElementScrollPositionUntilNextRender:d}=(0,c.o5)(),m=e=>{const t=e.currentTarget,n=s.indexOf(t),r=u[n].value;r!==i&&(d(t),l(r))},p=e=>{var t;let n=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const t=s.indexOf(e.currentTarget)+1;n=s[t]??s[0];break}case"ArrowLeft":{const t=s.indexOf(e.currentTarget)-1;n=s[t]??s[s.length-1];break}}null==(t=n)||t.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:l}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>s.push(e),onKeyDown:p,onClick:m},l,{className:(0,o.Z)("tabs__item",y.tabItem,null==l?void 0:l.className,{"tabs__item--active":i===t})}),n??t)})))}function w(e){let{lazy:t,children:n,selectedValue:r}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function E(e){const t=g(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",y.tabList)},a.createElement(k,(0,r.Z)({},e,t)),a.createElement(w,(0,r.Z)({},e,t)))}function N(e){const t=(0,x.Z)();return a.createElement(E,(0,r.Z)({key:String(t)},e))}const T={tabItem:"tabItem_Ymn6"};function D(e){let{children:t,hidden:n,className:r}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(T.tabItem,r),hidden:n},t)}var C=n(8084),_=n(6377),L=n.n(_),S=n(2345);function V(e,t){let n=[...e];for(let r=n.length-1;r>0;r--){let e=Math.floor(t()*(r+1));[n[r],n[e]]=[n[e],n[r]]}return n}function I(e){var t=L()(e.title);let n=V(e.attendees,t);return a.createElement(l.yR,{members:[(e.maintrack,"")].concat(e.presenters.concat(n)).slice(0,6)})}function q(e){var t=L()(e.title);let n=e.presenters.concat(V(e.attendees,t)),r=n.length;return r>1?"https://multitwitch.live/"+n.join("/"):1==r?"https://www.twitch.tv/"+n[0]:""}function M(e){let t={minimumIntegerDigits:2,useGrouping:!1};return a.createElement(a.Fragment,null,e.getHours().toLocaleString("fr-FR",t),":",e.getMinutes().toLocaleString("fr-FR",t))}function z(e){let t=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][e.getDay()];return a.createElement(a.Fragment,null,t," ",M(e))}function j(){const{planning:e}=(0,C.eZ)("social-community-plugin");let t=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],n=e.map((function(e){let n=new Date(e.start);return{weekDay:t[n.getDay()],date:n.getDate(),dateString:n.toDateString()}})).filter((function(e,t,n){return!t||e.dateString!=n[t-1].dateString}));const r=new Date,i=r.toDateString();return a.createElement(a.Fragment,null,a.createElement(N,null,n.map(((t,n)=>a.createElement(D,{key:n,value:t.dateString,label:t.date,default:t.dateString==i,attributes:{className:u["calendarTab"+t.weekDay]}},a.createElement("div",{className:"container"},a.createElement("div",{className:"row"},e.map(((e,n)=>{let i=new Date(e.start),c=new Date(e.end),s=r>=i&&r<=c;if(t.dateString==i.toDateString())return a.createElement(S.Z,{key:n,trigger:a.createElement("div",{className:(0,o.Z)("col col--12",u.calendarEntry)},a.createElement("div",null,a.createElement("span",{className:u.calendarEntryTime},s?"LIVE":M(i)),"-\xa0",a.createElement("span",{className:u.calendarEntryTitle},e.title)),a.createElement("div",{className:u.calendarEntryCalendar},I(e))),modal:!0},(t=>a.createElement("div",{className:"card"},a.createElement("div",{className:(0,o.Z)("card__header",u.popupHeader)},a.createElement("button",{"aria-label":"Close",className:"clean-btn close",type:"button",onClick:t},a.createElement("span",{"aria-hidden":"true"},"\xd7")),a.createElement("div",{className:"avatar"},a.createElement("div",{className:"avatar__intro"},a.createElement("h4",{className:u.popupTitle},e.title),a.createElement("small",null,z(i)," - ",z(c))))),a.createElement("div",{className:"card__body"},a.createElement("p",null,e.description),function(e){let t=e.presenters.length;if(t>0)return a.createElement(a.Fragment,null,a.createElement("h5",{className:u.popupSubtitle},t>1?"Pr\xe9sentateurs":"Pr\xe9sentateur"),a.createElement(l.K9,{members:e.presenters}))}(e),function(e){let t=e.attendees.length;if(t>0){var n=L()(e.title);let r=V(e.attendees,n);return a.createElement(a.Fragment,null,a.createElement("h5",{className:u.popupSubtitle},t>1?"Participants":"Participant"),a.createElement(l.K9,{members:r}))}}(e)),a.createElement("div",{className:"card__footer"},a.createElement("a",{className:"button button--block button--primary",href:q(e)},"Regarder en Live")))))})))))))),a.createElement("span",{className:u.localTime},"Horaires en temps local ",function(e){let t=e.getTimezoneOffset(),n=Math.abs(t),r={minimumIntegerDigits:2,useGrouping:!1};return a.createElement(a.Fragment,null,"UTC",t<=0?"+":"-",(~~(n/60)).toLocaleString("fr-FR",r),":",(n%60).toLocaleString("fr-FR",r))}(r)))}const A={title:"CDC\u202f2022",description:"L'\xe9v\xe8nement caritatif de Cr\xe9ateurs de Compagnie au profit de l'association L'hirondelle"},Z=void 0,R={type:"mdx",permalink:"/evenement/cdc2022",source:"@site/src/pages/evenement/cdc2022.md",title:"CDC\u202f2022",description:"L'\xe9v\xe8nement caritatif de Cr\xe9ateurs de Compagnie au profit de l'association L'hirondelle",frontMatter:{title:"CDC\u202f2022",description:"L'\xe9v\xe8nement caritatif de Cr\xe9ateurs de Compagnie au profit de l'association L'hirondelle"}},F=[{value:"L&#39;\xe9v\xe8nement",id:"l-\xe9v\xe8nement",level:2},{value:"L&#39;association",id:"l-association",level:2},{value:"Trailer",id:"trailer",level:2},{value:"Les participants",id:"les-participants",level:2},{value:"Le planning",id:"le-planning",level:2}],O={toc:F},H="wrapper";function P(e){let{components:t,...n}=e;return(0,i.kt)(H,(0,r.Z)({},O,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("nav",{"aria-label":"breadcrumbs",className:"page-breadcrumbs"},(0,i.kt)("ul",{className:"breadcrumbs"},(0,i.kt)("li",{className:"breadcrumbs__item"},(0,i.kt)("a",{className:"breadcrumbs__link",href:"/"},(0,i.kt)("svg",{viewBox:"0 0 24 24",className:"breadcrumbs-home"},(0,i.kt)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})))),(0,i.kt)("li",{className:"breadcrumbs__item"},(0,i.kt)("span",{className:"breadcrumbs__link"},"\xc9v\xe8nements pass\xe9s")),(0,i.kt)("li",{className:"breadcrumbs__item"},(0,i.kt)("a",{className:"breadcrumbs__link",href:"/evenement/cdc2022"},"CDC\u202f2022")))),(0,i.kt)("h1",{className:"text--center"},"CDC\u202f2022"),(0,i.kt)("h2",{id:"l-\xe9v\xe8nement"},"L'\xe9v\xe8nement"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"CDC\u202f2022"))," est un \xe9v\xe8nement caritatif qui s'est tenu sur ",(0,i.kt)("a",{parentName:"p",href:"https://www.twitch.tv/createursdecompagnie"},(0,i.kt)("strong",{parentName:"a"},(0,i.kt)("em",{parentName:"strong"},"Twitch")))," du ",(0,i.kt)("strong",{parentName:"p"},"21 au 23 octobre 2022")," au profit de l'association ",(0,i.kt)("a",{href:"https://hirondelle.ovh"},(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"L'Hirondelle"))),". Celui-ci a permis de r\xe9colter plus de ",(0,i.kt)("strong",{parentName:"p"},"17 000 \u20ac")," et a impliqu\xe9 une trentaine de cr\xe9ateurs."),(0,i.kt)("h2",{id:"l-association"},"L'association"),(0,i.kt)("a",{href:"https://hirondelle.ovh"},(0,i.kt)("p",{className:"text--center"},(0,i.kt)("img",{src:"/img/cdc2022/logo-l-hirondelle.png",alt:"Logo L'Hirondelle",width:"442",height:"200",loading:"lazy"}))),(0,i.kt)("p",null,"Association de protection animale, ",(0,i.kt)("a",{href:"https://hirondelle.ovh"},(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"L'Hirondelle")))," est ",(0,i.kt)("strong",{parentName:"p"},"un centre de soin")," pour animaux sauvages. L'association r\xe9cup\xe8re plus de ",(0,i.kt)("strong",{parentName:"p"},"7 000 animaux par an"),". Elle a pour but de les soigner et de les r\xe9ins\xe9rer dans leur environnement naturel."),(0,i.kt)("p",null,"L'association a aussi une partie formation, permettant de ",(0,i.kt)("strong",{parentName:"p"},"former des intervenants")," (pompiers, v\xe9t\xe9rinaires\u2026) susceptibles d\u2019\xeatre confront\xe9s \xe0 des ",(0,i.kt)("strong",{parentName:"p"},"probl\xe8mes touchant la faune sauvage"),"."),(0,i.kt)("p",null,"Ils poss\xe8dent ",(0,i.kt)("strong",{parentName:"p"},"un des plus grand centre de soins aux animaux sauvages de France")," et interviennent sur les d\xe9partements du ",(0,i.kt)("strong",{parentName:"p"},"Rh\xf4ne"),", de la ",(0,i.kt)("strong",{parentName:"p"},"Loire"),", de la ",(0,i.kt)("strong",{parentName:"p"},"Dr\xf4me")," et de l\u2019",(0,i.kt)("strong",{parentName:"p"},"Ard\xe8che"),"."),(0,i.kt)("h2",{id:"trailer"},"Trailer"),(0,i.kt)("div",{className:"center margin-bottom--lg",style:{display:"flex",justifyContent:"center"}},(0,i.kt)("video",{width:"100%",controls:!0,style:{maxWidth:"450px"}},(0,i.kt)("source",{src:"/video/cdc2022/teaser.webm",type:"video/webm"}),(0,i.kt)("source",{src:"/video/cdc2022/teaser.mp4",type:"video/mp4"}),"Your browser does not support the video tag.")),(0,i.kt)("h2",{id:"les-participants"},"Les participants"),(0,i.kt)(l.K9,{group:"cdc2022",mdxType:"CommunityListEvent"}),(0,i.kt)("br",null),(0,i.kt)("h2",{id:"le-planning"},"Le planning"),(0,i.kt)(j,{class:"margin-top--xl",mdxType:"Planning"}))}P.isMDXComponent=!0},6377:(e,t,n)=>{var r=n(4832),a=n(8652),i=n(801),l=n(2030),o=n(3618),u=n(9049),c=n(1971);c.alea=r,c.xor128=a,c.xorwow=i,c.xorshift7=l,c.xor4096=o,c.tychei=u,e.exports=c},4832:function(e,t,n){var r;!function(e,a,i){function l(e){var t=this,n=function(){var e=4022871197,t=function(t){t=String(t);for(var n=0;n<t.length;n++){var r=.02519603282416938*(e+=t.charCodeAt(n));r-=e=r>>>0,e=(r*=e)>>>0,e+=4294967296*(r-=e)}return 2.3283064365386963e-10*(e>>>0)};return t}();t.next=function(){var e=2091639*t.s0+2.3283064365386963e-10*t.c;return t.s0=t.s1,t.s1=t.s2,t.s2=e-(t.c=0|e)},t.c=1,t.s0=n(" "),t.s1=n(" "),t.s2=n(" "),t.s0-=n(e),t.s0<0&&(t.s0+=1),t.s1-=n(e),t.s1<0&&(t.s1+=1),t.s2-=n(e),t.s2<0&&(t.s2+=1),n=null}function o(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function u(e,t){var n=new l(e),r=t&&t.state,a=n.next;return a.int32=function(){return 4294967296*n.next()|0},a.double=function(){return a()+11102230246251565e-32*(2097152*a()|0)},a.quick=a,r&&("object"==typeof r&&o(r,n),a.state=function(){return o(n,{})}),a}a&&a.exports?a.exports=u:n.amdD&&n.amdO?void 0===(r=function(){return u}.call(t,n,t,a))||(a.exports=r):this.alea=u}(0,e=n.nmd(e),n.amdD)},9049:function(e,t,n){var r;!function(e,a,i){function l(e){var t=this,n="";t.next=function(){var e=t.b,n=t.c,r=t.d,a=t.a;return e=e<<25^e>>>7^n,n=n-r|0,r=r<<24^r>>>8^a,a=a-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-r|0,t.d=r<<16^n>>>16^a,t.a=a-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):n+=e;for(var r=0;r<n.length+20;r++)t.b^=0|n.charCodeAt(r),t.next()}function o(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function u(e,t){var n=new l(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&("object"==typeof r&&o(r,n),a.state=function(){return o(n,{})}),a}a&&a.exports?a.exports=u:n.amdD&&n.amdO?void 0===(r=function(){return u}.call(t,n,t,a))||(a.exports=r):this.tychei=u}(0,e=n.nmd(e),n.amdD)},8652:function(e,t,n){var r;!function(e,a,i){function l(e){var t=this,n="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r),t.next()}function o(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function u(e,t){var n=new l(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&("object"==typeof r&&o(r,n),a.state=function(){return o(n,{})}),a}a&&a.exports?a.exports=u:n.amdD&&n.amdO?void 0===(r=function(){return u}.call(t,n,t,a))||(a.exports=r):this.xor128=u}(0,e=n.nmd(e),n.amdD)},3618:function(e,t,n){var r;!function(e,a,i){function l(e){var t=this;t.next=function(){var e,n,r=t.w,a=t.X,i=t.i;return t.w=r=r+1640531527|0,n=a[i+34&127],e=a[i=i+1&127],n^=n<<13,e^=e<<17,n^=n>>>15,e^=e>>>12,n=a[i]=n^e,t.i=i,n+(r^r>>>16)|0},function(e,t){var n,r,a,i,l,o=[],u=128;for(t===(0|t)?(r=t,t=null):(t+="\0",r=0,u=Math.max(u,t.length)),a=0,i=-32;i<u;++i)t&&(r^=t.charCodeAt((i+32)%t.length)),0===i&&(l=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,i>=0&&(l=l+1640531527|0,a=0==(n=o[127&i]^=r+l)?a+1:0);for(a>=128&&(o[127&(t&&t.length||0)]=-1),a=127,i=512;i>0;--i)r=o[a+34&127],n=o[a=a+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,o[a]=r^n;e.w=l,e.X=o,e.i=a}(t,e)}function o(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function u(e,t){null==e&&(e=+new Date);var n=new l(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&(r.X&&o(r,n),a.state=function(){return o(n,{})}),a}a&&a.exports?a.exports=u:n.amdD&&n.amdO?void 0===(r=function(){return u}.call(t,n,t,a))||(a.exports=r):this.xor4096=u}(0,e=n.nmd(e),n.amdD)},2030:function(e,t,n){var r;!function(e,a,i){function l(e){var t=this;t.next=function(){var e,n,r=t.x,a=t.i;return e=r[a],n=(e^=e>>>7)^e<<24,n^=(e=r[a+1&7])^e>>>10,n^=(e=r[a+3&7])^e>>>3,n^=(e=r[a+4&7])^e<<7,e=r[a+7&7],n^=(e^=e<<13)^e<<9,r[a]=n,t.i=a+1&7,n},function(e,t){var n,r=[];if(t===(0|t))r[0]=t;else for(t=""+t,n=0;n<t.length;++n)r[7&n]=r[7&n]<<15^t.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&0===r[n];++n);for(8==n?r[7]=-1:r[n],e.x=r,e.i=0,n=256;n>0;--n)e.next()}(t,e)}function o(e,t){return t.x=e.x.slice(),t.i=e.i,t}function u(e,t){null==e&&(e=+new Date);var n=new l(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&(r.x&&o(r,n),a.state=function(){return o(n,{})}),a}a&&a.exports?a.exports=u:n.amdD&&n.amdO?void 0===(r=function(){return u}.call(t,n,t,a))||(a.exports=r):this.xorshift7=u}(0,e=n.nmd(e),n.amdD)},801:function(e,t,n){var r;!function(e,a,i){function l(e){var t=this,n="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^e^e<<1)|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r),r==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function o(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function u(e,t){var n=new l(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&("object"==typeof r&&o(r,n),a.state=function(){return o(n,{})}),a}a&&a.exports?a.exports=u:n.amdD&&n.amdO?void 0===(r=function(){return u}.call(t,n,t,a))||(a.exports=r):this.xorwow=u}(0,e=n.nmd(e),n.amdD)},1971:function(e,t,n){var r;!function(a,i,l){var o,u=256,c=l.pow(u,6),s=l.pow(2,52),d=2*s,m=u-1;function p(e,t,n){var r=[],m=b(h((t=1==t?{entropy:!0}:t||{}).entropy?[e,g(i)]:null==e?function(){try{var e;return o&&(e=o.randomBytes)?e=e(u):(e=new Uint8Array(u),(a.crypto||a.msCrypto).getRandomValues(e)),g(e)}catch(r){var t=a.navigator,n=t&&t.plugins;return[+new Date,a,n,a.screen,g(i)]}}():e,3),r),p=new f(r),x=function(){for(var e=p.g(6),t=c,n=0;e<s;)e=(e+n)*u,t*=u,n=p.g(1);for(;e>=d;)e/=2,t/=2,n>>>=1;return(e+n)/t};return x.int32=function(){return 0|p.g(4)},x.quick=function(){return p.g(4)/4294967296},x.double=x,b(g(p.S),i),(t.pass||n||function(e,t,n,r){return r&&(r.S&&v(r,p),e.state=function(){return v(p,{})}),n?(l.random=e,t):e})(x,m,"global"in t?t.global:this==l,t.state)}function f(e){var t,n=e.length,r=this,a=0,i=r.i=r.j=0,l=r.S=[];for(n||(e=[n++]);a<u;)l[a]=a++;for(a=0;a<u;a++)l[a]=l[i=m&i+e[a%n]+(t=l[a])],l[i]=t;(r.g=function(e){for(var t,n=0,a=r.i,i=r.j,l=r.S;e--;)t=l[a=m&a+1],n=n*u+l[m&(l[a]=l[i=m&i+t])+(l[i]=t)];return r.i=a,r.j=i,n})(u)}function v(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function h(e,t){var n,r=[],a=typeof e;if(t&&"object"==a)for(n in e)try{r.push(h(e[n],t-1))}catch(i){}return r.length?r:"string"==a?e:e+"\0"}function b(e,t){for(var n,r=e+"",a=0;a<r.length;)t[m&a]=m&(n^=19*t[m&a])+r.charCodeAt(a++);return g(t)}function g(e){return String.fromCharCode.apply(0,e)}if(b(l.random(),i),e.exports){e.exports=p;try{o=n(5042)}catch(x){}}else void 0===(r=function(){return p}.call(t,n,t,e))||(e.exports=r)}("undefined"!=typeof self?self:this,[],Math)},5042:()=>{}}]);