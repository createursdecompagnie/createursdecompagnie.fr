"use strict";(self.webpackChunkcreateursdecompagnie_fr=self.webpackChunkcreateursdecompagnie_fr||[]).push([[291],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),m=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=m(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),p=m(r),d=a,g=p["".concat(c,".").concat(d)]||p[d]||u[d]||i;return r?n.createElement(g,s(s({ref:t},l),{},{components:r})):n.createElement(g,s({ref:t},l))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,s=new Array(i);s[0]=p;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var m=2;m<i;m++)s[m]=r[m];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},3148:(e,t,r)=>{r.d(t,{K:()=>d,n:()=>p});var n=r(7294),a=r(6010),i=r(8084);const s={communityList:"communityList_aTuq",communityMember:"communityMember_RkLj","communityMember-xs":"communityMember-xs_sAHh","communityMember-sm":"communityMember-sm_F5OA","communityMember-md":"communityMember-md_kjTh","communityMember-lg":"communityMember-lg_zs7g","communityMember-xl":"communityMember-xl_TV23",communityHome:"communityHome_R_2z"},o={Small:"sm",Medium:"md",Large:"lg",ExtraLarge:"xl"};function c(e,t){void 0===t&&(t=o.Large);let r="#";if(e&&e.socials){if("twitch"===e.socials.main_social)switch(e.socials.twitch&&e.socials.twitch.user_data&&(r=e.socials.twitch.user_data.profile_image_url),t){case o.Large:r=r.replace("300x300.png","150x150.png");break;case o.Medium:r=r.replace("300x300.png","70x70.png");break;case o.Small:r=r.replace("300x300.png","50x50.png")}!r&&e.avatar&&(r=useBaseUrl(e.avatar))}return r}function m(e){if(e&&e.socials)switch(e.socials.main_social){case"twitch":if(e.socials.twitch&&e.socials.twitch.user_data)return"https://www.twitch.tv/"+e.socials.twitch.login;break;case"twitter":if(e.socials.twitch&&e.socials.twitch.user_data)return"https://twitter.com/"+e.socials.twitch.login;break;case"instagram":if(e.socials.twitch&&e.socials.twitch.user_data)return"https://www.instagram.com/"+e.socials.twitch.login;break;case"tiktok":if(e.socials.twitch&&e.socials.twitch.user_data)return"https://www.tiktok.com/@"+e.socials.twitch.login;break;case"youtube":case"discord":if(e.socials[e.socials.main_social]&&e.socials[e.socials.main_social].link)return e.socials[e.socials.main_social].link}return"#"}const l=e=>{let{member:t,size:r=o.Medium}=e;return n.createElement(n.Fragment,null,t&&n.createElement("a",{href:m(t),className:(0,a.Z)(s.communityMember,s["communityMember-"+r])},n.createElement("div",{className:"avatar"},n.createElement("img",{className:"avatar__photo",alt:t.name,src:c(t,r),loading:"lazy"}))))};function u(e){const{members:t}=(0,i.eZ)("social-community-plugin");return n.createElement("div",{className:e.className},null==t?void 0:t.map((t=>n.createElement(n.Fragment,null,(!e.group||t.groups.includes(e.group))&&n.createElement(l,{key:t.name,member:t,size:e.size})))))}function p(){return n.createElement(u,{className:(0,a.Z)(s.communityList,s.communityHome),group:"member",size:o.Large})}function d(e){return n.createElement(u,{className:(0,a.Z)(s.communityList),group:e.group,size:o.Small})}},1614:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>c,toc:()=>m});var n=r(7462),a=(r(7294),r(3905)),i=r(3148);const s={title:"Sans Croquettes Twitch",description:"L'\xe9v\xe8nement caritatif au profit de Sans Croquettes Fixes qui donna naissance \xe0 Cr\xe9ateurs de Compagnie"},o=void 0,c={type:"mdx",permalink:"/evenement/sans-croquettes-twitch",source:"@site/src/pages/evenement/sans-croquettes-twitch.md",title:"Sans Croquettes Twitch",description:"L'\xe9v\xe8nement caritatif au profit de Sans Croquettes Fixes qui donna naissance \xe0 Cr\xe9ateurs de Compagnie",frontMatter:{title:"Sans Croquettes Twitch",description:"L'\xe9v\xe8nement caritatif au profit de Sans Croquettes Fixes qui donna naissance \xe0 Cr\xe9ateurs de Compagnie"}},m=[{value:"L&#39;\xe9v\xe8nement",id:"l-\xe9v\xe8nement",level:2},{value:"Les participants",id:"les-participants",level:2}],l={toc:m};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{className:"text--center"},(0,a.kt)("img",{src:"/img/sct/header.png",alt:"Sans Croquettes Twitch",style:{maxHeight:"110px"},loading:"lazy"})),(0,a.kt)("h2",{id:"l-\xe9v\xe8nement"},"L'\xe9v\xe8nement"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"Sans Croquettes Twitch"))," est un \xe9v\xe8nement caritatif qui s'est tenu sur ",(0,a.kt)("a",{parentName:"p",href:"https://www.twitch.tv/createursdecomp"},(0,a.kt)("strong",{parentName:"a"},(0,a.kt)("em",{parentName:"strong"},"Twitch")))," du ",(0,a.kt)("strong",{parentName:"p"},"21 au 24 mai 2021")," au profit de l'association ",(0,a.kt)("a",{parentName:"p",href:"https://sanscroquettesfixes.fr"},(0,a.kt)("strong",{parentName:"a"},(0,a.kt)("em",{parentName:"strong"},"Sans Croquettes Fixes"))),". Celui-ci a permis de r\xe9colter ",(0,a.kt)("strong",{parentName:"p"},"12 000 \u20ac")," et a impliqu\xe9 plus d'une trentaine de cr\xe9ateurs."),(0,a.kt)("p",null,"Pendant ",(0,a.kt)("strong",{parentName:"p"},"plus de 72h")," auront eu lieu : plusieurs ",(0,a.kt)("strong",{parentName:"p"},"sessions de jeu")," entre les cr\xe9ateurs, des ",(0,a.kt)("strong",{parentName:"p"},"matinales")," sur les diff\xe9rents animaux de compagnie et des ",(0,a.kt)("strong",{parentName:"p"},"interviews")," avec de nombreux repr\xe9sentants de l'association."),(0,a.kt)("p",null,"Sous l'impulsion de cet \xe9v\xe8nement, ",(0,a.kt)("a",{parentName:"p",href:"https://www.twitch.tv/misternooton"},(0,a.kt)("strong",{parentName:"a"},(0,a.kt)("em",{parentName:"strong"},"MisterNooton")))," (l'initiateur du projet) d\xe9cide de cr\xe9er le collectif ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"Cr\xe9ateurs de Compagnie")),"."),(0,a.kt)("h2",{id:"les-participants"},"Les participants"),(0,a.kt)(i.K,{group:"sct",mdxType:"CommunityListEvent"}))}u.isMDXComponent=!0}}]);