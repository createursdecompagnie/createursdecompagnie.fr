(self.webpackChunkcreateursdecompagnie_fr=self.webpackChunkcreateursdecompagnie_fr||[]).push([[625],{3329:(e,t,n)=>{"use strict";n.r(t),n.d(t,{contentTitle:()=>L,default:()=>Z,frontMatter:()=>S,metadata:()=>M,toc:()=>z});var r=n(7462),a=n(7294),l=n(3905),i=n(6010);const c={localTime:"localTime_yuoo",calendarEntry:"calendarEntry_V70G",calendarEntryTime:"calendarEntryTime_RQfh",calendarEntryTitle:"calendarEntryTitle_RGya",calendarEntryCalendar:"calendarEntryCalendar_gP3_",calendarTabDimanche:"calendarTabDimanche_r2Zm",calendarTabLundi:"calendarTabLundi_vUo8",calendarTabMardi:"calendarTabMardi_RKZf",calendarTabMercredi:"calendarTabMercredi_A92n",calendarTabJeudi:"calendarTabJeudi_T775",calendarTabVendredi:"calendarTabVendredi_cj4E",calendarTabSamedi:"calendarTabSamedi_jnI0",popupTitle:"popupTitle_qzzN",popupSubtitle:"popupSubtitle_zLE9",popupHeader:"popupHeader_z8gh"};var o=n(2389),u=n(7392),s=n(7094),d=n(2466);const m="tabList__CuJ",f="tabItem_LNqP";function p(e){var t,n;const{lazy:l,block:c,defaultValue:o,values:p,groupId:v,className:h}=e,b=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),x=null!=p?p:b.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),g=(0,u.l)(x,((e,t)=>e.value===t.value));if(g.length>0)throw new Error('Docusaurus error: Duplicate values "'+g.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.');const y=null===o?o:null!=(t=null!=o?o:null==(n=b.find((e=>e.props.default)))?void 0:n.props.value)?t:b[0].props.value;if(null!==y&&!x.some((e=>e.value===y)))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+x.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");const{tabGroupChoices:w,setTabGroupChoices:E}=(0,s.U)(),[D,_]=(0,a.useState)(y),k=[],{blockElementScrollPositionUntilNextRender:T}=(0,d.o5)();if(null!=v){const e=w[v];null!=e&&e!==D&&x.some((t=>t.value===e))&&_(e)}const N=e=>{const t=e.currentTarget,n=k.indexOf(t),r=x[n].value;r!==D&&(T(t),_(r),null!=v&&E(v,String(r)))},C=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{var r;const t=k.indexOf(e.currentTarget)+1;n=null!=(r=k[t])?r:k[0];break}case"ArrowLeft":{var a;const t=k.indexOf(e.currentTarget)-1;n=null!=(a=k[t])?a:k[k.length-1];break}}null==(t=n)||t.focus()};return a.createElement("div",{className:(0,i.Z)("tabs-container",m)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":c},h)},x.map((e=>{let{value:t,label:n,attributes:l}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:D===t?0:-1,"aria-selected":D===t,key:t,ref:e=>k.push(e),onKeyDown:C,onFocus:N,onClick:N},l,{className:(0,i.Z)("tabs__item",f,null==l?void 0:l.className,{"tabs__item--active":D===t})}),null!=n?n:t)}))),l?(0,a.cloneElement)(b.filter((e=>e.props.value===D))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==D})))))}function v(e){const t=(0,o.Z)();return a.createElement(p,(0,r.Z)({key:String(t)},e))}const h="tabItem_Ymn6";function b(e){let{children:t,hidden:n,className:r}=e;return a.createElement("div",{role:"tabpanel",className:(0,i.Z)(h,r),hidden:n},t)}var x=n(3148),g=n(8084),y=n(6377),w=n.n(y),E=n(2345);function D(e,t){let n=[...e];for(let r=n.length-1;r>0;r--){let e=Math.floor(t()*(r+1));[n[r],n[e]]=[n[e],n[r]]}return n}function _(e){var t=w()(e.title);let n=D(e.attendees,t);return a.createElement(x.yR,{members:[(e.maintrack,"")].concat(e.presenters.concat(n)).slice(0,6)})}function k(e){var t=w()(e.title);let n=e.presenters.concat(D(e.attendees,t)),r=n.length;return r>1?"https://multitwitch.live/"+n.join("/"):1==r?"https://www.twitch.tv/"+n[0]:""}function T(e){let t={minimumIntegerDigits:2,useGrouping:!1};return a.createElement(a.Fragment,null,e.getHours().toLocaleString("fr-FR",t),":",e.getMinutes().toLocaleString("fr-FR",t))}function N(e){let t=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][e.getDay()];return a.createElement(a.Fragment,null,t," ",T(e))}function C(){const{planning:e}=(0,g.eZ)("social-community-plugin");let t=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],n=e.map((function(e){let n=new Date(e.start);return{weekDay:t[n.getDay()],date:n.getDate(),dateString:n.toDateString()}})).filter((function(e,t,n){return!t||e.dateString!=n[t-1].dateString}));const r=new Date,l=r.toDateString();return a.createElement(a.Fragment,null,a.createElement(v,null,n.map(((t,n)=>a.createElement(b,{key:n,value:t.dateString,label:t.date,default:t.dateString==l,attributes:{className:c["calendarTab"+t.weekDay]}},a.createElement("div",{className:"container"},a.createElement("div",{className:"row"},e.map(((e,n)=>{let l=new Date(e.start),o=new Date(e.end),u=r>=l&&r<=o;if(t.dateString==l.toDateString())return a.createElement(E.Z,{key:n,trigger:a.createElement("div",{className:(0,i.Z)("col col--12",c.calendarEntry)},a.createElement("div",null,a.createElement("span",{className:c.calendarEntryTime},u?"LIVE":T(l)),"-\xa0",a.createElement("span",{className:c.calendarEntryTitle},e.title)),a.createElement("div",{className:c.calendarEntryCalendar},_(e))),modal:!0},(t=>a.createElement("div",{className:"card"},a.createElement("div",{className:(0,i.Z)("card__header",c.popupHeader)},a.createElement("button",{"aria-label":"Close",className:"clean-btn close",type:"button",onClick:t},a.createElement("span",{"aria-hidden":"true"},"\xd7")),a.createElement("div",{className:"avatar"},a.createElement("div",{className:"avatar__intro"},a.createElement("h4",{className:c.popupTitle},e.title),a.createElement("small",null,N(l)," - ",N(o))))),a.createElement("div",{className:"card__body"},a.createElement("p",null,e.description),function(e){let t=e.presenters.length;if(t>0)return a.createElement(a.Fragment,null,a.createElement("h5",{className:c.popupSubtitle},t>1?"Pr\xe9sentateurs":"Pr\xe9sentateur"),a.createElement(x.K9,{members:e.presenters}))}(e),function(e){let t=e.attendees.length;if(t>0){var n=w()(e.title);let r=D(e.attendees,n);return a.createElement(a.Fragment,null,a.createElement("h5",{className:c.popupSubtitle},t>1?"Participants":"Participant"),a.createElement(x.K9,{members:r}))}}(e)),a.createElement("div",{className:"card__footer"},a.createElement("a",{className:"button button--block button--primary",href:k(e)},"Regarder en Live")))))})))))))),a.createElement("span",{className:c.localTime},"Horaires en temps local ",function(e){let t=e.getTimezoneOffset(),n=Math.abs(t),r={minimumIntegerDigits:2,useGrouping:!1};return a.createElement(a.Fragment,null,"UTC",t<=0?"+":"-",(~~(n/60)).toLocaleString("fr-FR",r),":",(n%60).toLocaleString("fr-FR",r))}(r)))}const S={title:"CDC\u202f2022",description:"Le planning de l'\xe9v\xe8nement caritatif CDC\u202f2022"},L=void 0,M={type:"mdx",permalink:"/evenement/cdc2022/planning",source:"@site/src/pages/evenement/cdc2022/planning.md",title:"CDC\u202f2022",description:"Le planning de l'\xe9v\xe8nement caritatif CDC\u202f2022",frontMatter:{title:"CDC\u202f2022",description:"Le planning de l'\xe9v\xe8nement caritatif CDC\u202f2022"}},z=[],j={toc:z};function Z(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},j,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("nav",{"aria-label":"breadcrumbs",className:"page-breadcrumbs"},(0,l.kt)("ul",{className:"breadcrumbs"},(0,l.kt)("li",{className:"breadcrumbs__item"},(0,l.kt)("a",{className:"breadcrumbs__link",href:"/"},(0,l.kt)("svg",{viewBox:"0 0 24 24",className:"breadcrumbs-home"},(0,l.kt)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})))),(0,l.kt)("li",{className:"breadcrumbs__item"},(0,l.kt)("span",{className:"breadcrumbs__link"},"CDC\u202f2022")),(0,l.kt)("li",{className:"breadcrumbs__item"},(0,l.kt)("a",{className:"breadcrumbs__link",href:"/evenement/cdc2022/planning"},"Le planning")))),(0,l.kt)("h1",{className:"text--center"},"Le planning"),(0,l.kt)(C,{mdxType:"Planning"}))}Z.isMDXComponent=!0},6377:(e,t,n)=>{var r=n(4832),a=n(8652),l=n(801),i=n(2030),c=n(3618),o=n(9049),u=n(1971);u.alea=r,u.xor128=a,u.xorwow=l,u.xorshift7=i,u.xor4096=c,u.tychei=o,e.exports=u},4832:function(e,t,n){var r;!function(e,a,l){function i(e){var t,n=this,r=(t=4022871197,function(e){e=String(e);for(var n=0;n<e.length;n++){var r=.02519603282416938*(t+=e.charCodeAt(n));r-=t=r>>>0,t=(r*=t)>>>0,t+=4294967296*(r-=t)}return 2.3283064365386963e-10*(t>>>0)});n.next=function(){var e=2091639*n.s0+2.3283064365386963e-10*n.c;return n.s0=n.s1,n.s1=n.s2,n.s2=e-(n.c=0|e)},n.c=1,n.s0=r(" "),n.s1=r(" "),n.s2=r(" "),n.s0-=r(e),n.s0<0&&(n.s0+=1),n.s1-=r(e),n.s1<0&&(n.s1+=1),n.s2-=r(e),n.s2<0&&(n.s2+=1),r=null}function c(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function o(e,t){var n=new i(e),r=t&&t.state,a=n.next;return a.int32=function(){return 4294967296*n.next()|0},a.double=function(){return a()+11102230246251565e-32*(2097152*a()|0)},a.quick=a,r&&("object"==typeof r&&c(r,n),a.state=function(){return c(n,{})}),a}a&&a.exports?a.exports=o:n.amdD&&n.amdO?void 0===(r=function(){return o}.call(t,n,t,a))||(a.exports=r):this.alea=o}(0,e=n.nmd(e),n.amdD)},9049:function(e,t,n){var r;!function(e,a,l){function i(e){var t=this,n="";t.next=function(){var e=t.b,n=t.c,r=t.d,a=t.a;return e=e<<25^e>>>7^n,n=n-r|0,r=r<<24^r>>>8^a,a=a-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-r|0,t.d=r<<16^n>>>16^a,t.a=a-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):n+=e;for(var r=0;r<n.length+20;r++)t.b^=0|n.charCodeAt(r),t.next()}function c(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function o(e,t){var n=new i(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&("object"==typeof r&&c(r,n),a.state=function(){return c(n,{})}),a}a&&a.exports?a.exports=o:n.amdD&&n.amdO?void 0===(r=function(){return o}.call(t,n,t,a))||(a.exports=r):this.tychei=o}(0,e=n.nmd(e),n.amdD)},8652:function(e,t,n){var r;!function(e,a,l){function i(e){var t=this,n="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r),t.next()}function c(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function o(e,t){var n=new i(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&("object"==typeof r&&c(r,n),a.state=function(){return c(n,{})}),a}a&&a.exports?a.exports=o:n.amdD&&n.amdO?void 0===(r=function(){return o}.call(t,n,t,a))||(a.exports=r):this.xor128=o}(0,e=n.nmd(e),n.amdD)},3618:function(e,t,n){var r;!function(e,a,l){function i(e){var t=this;t.next=function(){var e,n,r=t.w,a=t.X,l=t.i;return t.w=r=r+1640531527|0,n=a[l+34&127],e=a[l=l+1&127],n^=n<<13,e^=e<<17,n^=n>>>15,e^=e>>>12,n=a[l]=n^e,t.i=l,n+(r^r>>>16)|0},function(e,t){var n,r,a,l,i,c=[],o=128;for(t===(0|t)?(r=t,t=null):(t+="\0",r=0,o=Math.max(o,t.length)),a=0,l=-32;l<o;++l)t&&(r^=t.charCodeAt((l+32)%t.length)),0===l&&(i=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,l>=0&&(i=i+1640531527|0,a=0==(n=c[127&l]^=r+i)?a+1:0);for(a>=128&&(c[127&(t&&t.length||0)]=-1),a=127,l=512;l>0;--l)r=c[a+34&127],n=c[a=a+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,c[a]=r^n;e.w=i,e.X=c,e.i=a}(t,e)}function c(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function o(e,t){null==e&&(e=+new Date);var n=new i(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&(r.X&&c(r,n),a.state=function(){return c(n,{})}),a}a&&a.exports?a.exports=o:n.amdD&&n.amdO?void 0===(r=function(){return o}.call(t,n,t,a))||(a.exports=r):this.xor4096=o}(0,e=n.nmd(e),n.amdD)},2030:function(e,t,n){var r;!function(e,a,l){function i(e){var t=this;t.next=function(){var e,n,r=t.x,a=t.i;return e=r[a],n=(e^=e>>>7)^e<<24,n^=(e=r[a+1&7])^e>>>10,n^=(e=r[a+3&7])^e>>>3,n^=(e=r[a+4&7])^e<<7,e=r[a+7&7],n^=(e^=e<<13)^e<<9,r[a]=n,t.i=a+1&7,n},function(e,t){var n,r=[];if(t===(0|t))r[0]=t;else for(t=""+t,n=0;n<t.length;++n)r[7&n]=r[7&n]<<15^t.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&0===r[n];++n);for(8==n?r[7]=-1:r[n],e.x=r,e.i=0,n=256;n>0;--n)e.next()}(t,e)}function c(e,t){return t.x=e.x.slice(),t.i=e.i,t}function o(e,t){null==e&&(e=+new Date);var n=new i(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&(r.x&&c(r,n),a.state=function(){return c(n,{})}),a}a&&a.exports?a.exports=o:n.amdD&&n.amdO?void 0===(r=function(){return o}.call(t,n,t,a))||(a.exports=r):this.xorshift7=o}(0,e=n.nmd(e),n.amdD)},801:function(e,t,n){var r;!function(e,a,l){function i(e){var t=this,n="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^e^e<<1)|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r),r==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function c(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function o(e,t){var n=new i(e),r=t&&t.state,a=function(){return(n.next()>>>0)/4294967296};return a.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},a.int32=n.next,a.quick=a,r&&("object"==typeof r&&c(r,n),a.state=function(){return c(n,{})}),a}a&&a.exports?a.exports=o:n.amdD&&n.amdO?void 0===(r=function(){return o}.call(t,n,t,a))||(a.exports=r):this.xorwow=o}(0,e=n.nmd(e),n.amdD)},1971:function(e,t,n){var r;!function(a,l,i){var c,o=256,u=i.pow(o,6),s=i.pow(2,52),d=2*s,m=255;function f(e,t,n){var r=[],m=b(h((t=1==t?{entropy:!0}:t||{}).entropy?[e,x(l)]:null==e?function(){try{var e;return c&&(e=c.randomBytes)?e=e(o):(e=new Uint8Array(o),(a.crypto||a.msCrypto).getRandomValues(e)),x(e)}catch(r){var t=a.navigator,n=t&&t.plugins;return[+new Date,a,n,a.screen,x(l)]}}():e,3),r),f=new p(r),g=function(){for(var e=f.g(6),t=u,n=0;e<s;)e=(e+n)*o,t*=o,n=f.g(1);for(;e>=d;)e/=2,t/=2,n>>>=1;return(e+n)/t};return g.int32=function(){return 0|f.g(4)},g.quick=function(){return f.g(4)/4294967296},g.double=g,b(x(f.S),l),(t.pass||n||function(e,t,n,r){return r&&(r.S&&v(r,f),e.state=function(){return v(f,{})}),n?(i.random=e,t):e})(g,m,"global"in t?t.global:this==i,t.state)}function p(e){var t,n=e.length,r=this,a=0,l=r.i=r.j=0,i=r.S=[];for(n||(e=[n++]);a<o;)i[a]=a++;for(a=0;a<o;a++)i[a]=i[l=m&l+e[a%n]+(t=i[a])],i[l]=t;(r.g=function(e){for(var t,n=0,a=r.i,l=r.j,i=r.S;e--;)t=i[a=m&a+1],n=n*o+i[m&(i[a]=i[l=m&l+t])+(i[l]=t)];return r.i=a,r.j=l,n})(o)}function v(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function h(e,t){var n,r=[],a=typeof e;if(t&&"object"==a)for(n in e)try{r.push(h(e[n],t-1))}catch(l){}return r.length?r:"string"==a?e:e+"\0"}function b(e,t){for(var n,r=e+"",a=0;a<r.length;)t[m&a]=m&(n^=19*t[m&a])+r.charCodeAt(a++);return x(t)}function x(e){return String.fromCharCode.apply(0,e)}if(b(i.random(),l),e.exports){e.exports=f;try{c=n(5042)}catch(g){}}else void 0===(r=function(){return f}.call(t,n,t,e))||(e.exports=r)}("undefined"!=typeof self?self:this,[],Math)},5042:()=>{}}]);