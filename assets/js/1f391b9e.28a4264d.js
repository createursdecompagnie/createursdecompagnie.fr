(self.webpackChunkcreateursdecompagnie_fr=self.webpackChunkcreateursdecompagnie_fr||[]).push([[85],{9646:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>Ae});var o=n(7294),a=n(6010),l=n(1944),r=n(5281),c=n(3462),i=n(3905),s=n(7462),m=n(5742);var u=n(2389),d=n(2949),p=n(6668);function f(){const{prism:e}=(0,p.L)(),{colorMode:t}=(0,d.I)(),n=e.theme,o=e.darkTheme||n;return"dark"===t?o:n}var h=n(7594),g=n.n(h);const v=/title=(?<quote>["'])(?<title>.*?)\1/,y=/\{(?<range>[\d,-]+)\}/,b={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}};function E(e,t){const n=e.map((e=>{const{start:n,end:o}=b[e];return`(?:${n}\\s*(${t.flatMap((e=>{var t,n;return[e.line,null==(t=e.block)?void 0:t.start,null==(n=e.block)?void 0:n.end].filter(Boolean)})).join("|")})\\s*${o})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function k(e,t){let n=e.replace(/\n$/,"");const{language:o,magicComments:a,metastring:l}=t;if(l&&y.test(l)){const e=l.match(y).groups.range;if(0===a.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${l}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=a[0].className,o=g()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(o),code:n}}if(void 0===o)return{lineClassNames:{},code:n};const r=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return E(["js","jsBlock"],t);case"jsx":case"tsx":return E(["js","jsBlock","jsx"],t);case"html":return E(["js","jsBlock","html"],t);case"python":case"py":case"bash":return E(["bash"],t);case"markdown":case"md":return E(["html","jsx","bash"],t);default:return E(Object.keys(b),t)}}(o,a),c=n.split("\n"),i=Object.fromEntries(a.map((e=>[e.className,{start:0,range:""}]))),s=Object.fromEntries(a.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),m=Object.fromEntries(a.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),u=Object.fromEntries(a.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let p=0;p<c.length;){const e=c[p].match(r);if(!e){p+=1;continue}const t=e.slice(1).find((e=>void 0!==e));s[t]?i[s[t]].range+=`${p},`:m[t]?i[m[t]].start=p:u[t]&&(i[u[t]].range+=`${i[u[t]].start}-${p-1},`),c.splice(p,1)}n=c.join("\n");const d={};return Object.entries(i).forEach((e=>{let[t,{range:n}]=e;g()(n).forEach((e=>{d[e]??=[],d[e].push(t)}))})),{lineClassNames:d,code:n}}const N="codeBlockContainer_Ckt0";function C(e){let{as:t,...n}=e;const l=function(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[o,a]=e;const l=t[o];l&&"string"==typeof a&&(n[l]=a)})),n}(f());return o.createElement(t,(0,s.Z)({},n,{style:l,className:(0,a.Z)(n.className,N,r.k.common.codeBlock)}))}const L={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function B(e){let{children:t,className:n}=e;return o.createElement(C,{as:"pre",tabIndex:0,className:(0,a.Z)(L.codeBlockStandalone,"thin-scrollbar",n)},o.createElement("code",{className:L.codeBlockLines},t))}var x=n(902);const _={attributes:!0,characterData:!0,childList:!0,subtree:!0};function w(e,t){const[n,a]=(0,o.useState)(),l=(0,o.useCallback)((()=>{var t;a(null==(t=e.current)?void 0:t.closest("[role=tabpanel][hidden]"))}),[e,a]);(0,o.useEffect)((()=>{l()}),[l]),function(e,t,n){void 0===n&&(n=_);const a=(0,x.zX)(t),l=(0,x.Ql)(n);(0,o.useEffect)((()=>{const t=new MutationObserver(a);return e&&t.observe(e,l),()=>t.disconnect()}),[e,a,l])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),l())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}const T={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var Z={Prism:n(7410).Z,theme:T};function H(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(){return j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},j.apply(this,arguments)}var S=/\r\n|\r|\n/,A=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},z=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},I=function(e,t){var n=e.plain,o=Object.create(null),a=e.styles.reduce((function(e,n){var o=n.languages,a=n.style;return o&&!o.includes(t)||n.types.forEach((function(t){var n=j({},e[t],a);e[t]=n})),e}),o);return a.root=n,a.plain=j({},n,{backgroundColor:null}),a};function M(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&-1===t.indexOf(o)&&(n[o]=e[o]);return n}const O=function(e){function t(){for(var t=this,n=[],o=arguments.length;o--;)n[o]=arguments[o];e.apply(this,n),H(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?I(e.theme,e.language):void 0;return t.themeDict=n})),H(this,"getLineProps",(function(e){var n=e.key,o=e.className,a=e.style,l=j({},M(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),r=t.getThemeDict(t.props);return void 0!==r&&(l.style=r.plain),void 0!==a&&(l.style=void 0!==l.style?j({},l.style,a):a),void 0!==n&&(l.key=n),o&&(l.className+=" "+o),l})),H(this,"getStyleForToken",(function(e){var n=e.types,o=e.empty,a=n.length,l=t.getThemeDict(t.props);if(void 0!==l){if(1===a&&"plain"===n[0])return o?{display:"inline-block"}:void 0;if(1===a&&!o)return l[n[0]];var r=o?{display:"inline-block"}:{},c=n.map((function(e){return l[e]}));return Object.assign.apply(Object,[r].concat(c))}})),H(this,"getTokenProps",(function(e){var n=e.key,o=e.className,a=e.style,l=e.token,r=j({},M(e,["key","className","style","token"]),{className:"token "+l.types.join(" "),children:l.content,style:t.getStyleForToken(l),key:void 0});return void 0!==a&&(r.style=void 0!==r.style?j({},r.style,a):a),void 0!==n&&(r.key=n),o&&(r.className+=" "+o),r})),H(this,"tokenize",(function(e,t,n,o){var a={code:t,grammar:n,language:o,tokens:[]};e.hooks.run("before-tokenize",a);var l=a.tokens=e.tokenize(a.code,a.grammar,a.language);return e.hooks.run("after-tokenize",a),l}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,o=e.code,a=e.children,l=this.getThemeDict(this.props),r=t.languages[n];return a({tokens:function(e){for(var t=[[]],n=[e],o=[0],a=[e.length],l=0,r=0,c=[],i=[c];r>-1;){for(;(l=o[r]++)<a[r];){var s=void 0,m=t[r],u=n[r][l];if("string"==typeof u?(m=r>0?m:["plain"],s=u):(m=z(m,u.type),u.alias&&(m=z(m,u.alias)),s=u.content),"string"==typeof s){var d=s.split(S),p=d.length;c.push({types:m,content:d[0]});for(var f=1;f<p;f++)A(c),i.push(c=[]),c.push({types:m,content:d[f]})}else r++,t.push(m),n.push(s),o.push(0),a.push(s.length)}r--,t.pop(),n.pop(),o.pop(),a.pop()}return A(c),i}(void 0!==r?this.tokenize(t,o,r,n):[o]),className:"prism-code language-"+n,style:void 0!==l?l.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(o.Component),P="codeLine_lJS_",R="codeLineNumber_Tfdd",V="codeLineContent_feaV";function $(e){let{line:t,classNames:n,showLineNumbers:l,getLineProps:r,getTokenProps:c}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const i=r({line:t,className:(0,a.Z)(n,l&&P)}),m=t.map(((e,t)=>o.createElement("span",(0,s.Z)({key:t},c({token:e,key:t})))));return o.createElement("span",i,l?o.createElement(o.Fragment,null,o.createElement("span",{className:R}),o.createElement("span",{className:V},m)):m,o.createElement("br",null))}var D=n(5999);const W={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function q(e){let{code:t,className:n}=e;const[l,r]=(0,o.useState)(!1),c=(0,o.useRef)(void 0),i=(0,o.useCallback)((()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;const o=document.createElement("textarea"),a=document.activeElement;o.value=e,o.setAttribute("readonly",""),o.style.contain="strict",o.style.position="absolute",o.style.left="-9999px",o.style.fontSize="12pt";const l=document.getSelection();let r=!1;l.rangeCount>0&&(r=l.getRangeAt(0)),n.append(o),o.select(),o.selectionStart=0,o.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch{}o.remove(),r&&(l.removeAllRanges(),l.addRange(r)),a&&a.focus()}(t),r(!0),c.current=window.setTimeout((()=>{r(!1)}),1e3)}),[t]);return(0,o.useEffect)((()=>()=>window.clearTimeout(c.current)),[]),o.createElement("button",{type:"button","aria-label":l?(0,D.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,D.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,D.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,a.Z)("clean-btn",n,W.copyButton,l&&W.copyButtonCopied),onClick:i},o.createElement("span",{className:W.copyButtonIcons,"aria-hidden":"true"},o.createElement("svg",{className:W.copyButtonIcon,viewBox:"0 0 24 24"},o.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),o.createElement("svg",{className:W.copyButtonSuccessIcon,viewBox:"0 0 24 24"},o.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}const F="wordWrapButtonIcon_Bwma",G="wordWrapButtonEnabled_EoeP";function U(e){let{className:t,onClick:n,isEnabled:l}=e;const r=(0,D.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return o.createElement("button",{type:"button",onClick:n,className:(0,a.Z)("clean-btn",t,l&&G),"aria-label":r,title:r},o.createElement("svg",{className:F,viewBox:"0 0 24 24","aria-hidden":"true"},o.createElement("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})))}function Y(e){let{children:t,className:n="",metastring:l,title:r,showLineNumbers:c,language:i}=e;const{prism:{defaultLanguage:m,magicComments:u}}=(0,p.L)(),d=i??function(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return null==t?void 0:t.replace(/language-/,"")}(n)??m,h=f(),g=function(){const[e,t]=(0,o.useState)(!1),[n,a]=(0,o.useState)(!1),l=(0,o.useRef)(null),r=(0,o.useCallback)((()=>{const n=l.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[l,e]),c=(0,o.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=l.current,n=e>t||l.current.querySelector("code").hasAttribute("style");a(n)}),[l]);return w(l,c),(0,o.useEffect)((()=>{c()}),[e,c]),(0,o.useEffect)((()=>(window.addEventListener("resize",c,{passive:!0}),()=>{window.removeEventListener("resize",c)})),[c]),{codeBlockRef:l,isEnabled:e,isCodeScrollable:n,toggle:r}}(),y=function(e){var t;return(null==e||null==(t=e.match(v))?void 0:t.groups.title)??""}(l)||r,{lineClassNames:b,code:E}=k(t,{metastring:l,language:d,magicComments:u}),N=c??function(e){return Boolean(null==e?void 0:e.includes("showLineNumbers"))}(l);return o.createElement(C,{as:"div",className:(0,a.Z)(n,d&&!n.includes(`language-${d}`)&&`language-${d}`)},y&&o.createElement("div",{className:L.codeBlockTitle},y),o.createElement("div",{className:L.codeBlockContent},o.createElement(O,(0,s.Z)({},Z,{theme:h,code:E,language:d??"text"}),(e=>{let{className:t,tokens:n,getLineProps:l,getTokenProps:r}=e;return o.createElement("pre",{tabIndex:0,ref:g.codeBlockRef,className:(0,a.Z)(t,L.codeBlock,"thin-scrollbar")},o.createElement("code",{className:(0,a.Z)(L.codeBlockLines,N&&L.codeBlockLinesWithNumbering)},n.map(((e,t)=>o.createElement($,{key:t,line:e,getLineProps:l,getTokenProps:r,classNames:b[t],showLineNumbers:N})))))})),o.createElement("div",{className:L.buttonGroup},(g.isEnabled||g.isCodeScrollable)&&o.createElement(U,{className:L.codeButton,onClick:()=>g.toggle(),isEnabled:g.isEnabled}),o.createElement(q,{className:L.codeButton,code:E}))))}function Q(e){let{children:t,...n}=e;const a=(0,u.Z)(),l=function(e){return o.Children.toArray(e).some((e=>(0,o.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),r="string"==typeof l?Y:B;return o.createElement(r,(0,s.Z)({key:String(a)},n),l)}var J=n(9960);var K=n(6043);const X="details_lb9f",ee="isBrowser_bmU9",te="collapsibleContent_i85q";function ne(e){return!!e&&("SUMMARY"===e.tagName||ne(e.parentElement))}function oe(e,t){return!!e&&(e===t||oe(e.parentElement,t))}function ae(e){let{summary:t,children:n,...l}=e;const r=(0,u.Z)(),c=(0,o.useRef)(null),{collapsed:i,setCollapsed:m}=(0,K.u)({initialState:!l.open}),[d,p]=(0,o.useState)(l.open);return o.createElement("details",(0,s.Z)({},l,{ref:c,open:d,"data-collapsed":i,className:(0,a.Z)(X,r&&ee,l.className),onMouseDown:e=>{ne(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;ne(t)&&oe(t,c.current)&&(e.preventDefault(),i?(m(!1),p(!0)):m(!0))}}),t??o.createElement("summary",null,"Details"),o.createElement(K.z,{lazy:!1,collapsed:i,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{m(e),p(!e)}},o.createElement("div",{className:te},n)))}const le="details_b_Ee";function re(e){let{...t}=e;return o.createElement(ae,(0,s.Z)({},t,{className:(0,a.Z)("alert alert--info",le,t.className)}))}const ce="anchorWithStickyNavbar_LWe7",ie="anchorWithHideOnScrollNavbar_WYt5";function se(e){let{as:t,id:n,...l}=e;const{navbar:{hideOnScroll:r}}=(0,p.L)();if("h1"===t||!n)return o.createElement(t,(0,s.Z)({},l,{id:void 0}));const c=(0,D.I)({id:"theme.common.headingLinkTitle",message:"Direct link to {heading}",description:"Title for link to heading"},{heading:"string"==typeof l.children?l.children:n});return o.createElement(t,(0,s.Z)({},l,{className:(0,a.Z)("anchor",r?ie:ce,l.className),id:n}),l.children,o.createElement(J.Z,{className:"hash-link",to:`#${n}`,"aria-label":c,title:c},"\u200b"))}function me(e){return o.createElement(se,e)}const ue="containsTaskList_mC6p";const de="img_ev3q";const pe="admonition_LlT9",fe="admonitionHeading_tbUL",he="admonitionIcon_kALy",ge="admonitionContent_S0QG";const ve={note:{infimaClassName:"secondary",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 14 16"},o.createElement("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))},label:o.createElement(D.Z,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)"},"note")},tip:{infimaClassName:"success",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 12 16"},o.createElement("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))},label:o.createElement(D.Z,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)"},"tip")},danger:{infimaClassName:"danger",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 12 16"},o.createElement("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))},label:o.createElement(D.Z,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)"},"danger")},info:{infimaClassName:"info",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 14 16"},o.createElement("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))},label:o.createElement(D.Z,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)"},"info")},caution:{infimaClassName:"warning",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 16 16"},o.createElement("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))},label:o.createElement(D.Z,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)"},"caution")}},ye={secondary:"note",important:"info",success:"tip",warning:"danger"};function be(e){const{mdxAdmonitionTitle:t,rest:n}=function(e){const t=o.Children.toArray(e),n=t.find((e=>{var t;return o.isValidElement(e)&&"mdxAdmonitionTitle"===(null==(t=e.props)?void 0:t.mdxType)})),a=o.createElement(o.Fragment,null,t.filter((e=>e!==n)));return{mdxAdmonitionTitle:n,rest:a}}(e.children);return{...e,title:e.title??t,children:n}}const Ee={head:function(e){const t=o.Children.map(e.children,(e=>o.isValidElement(e)?function(e){var t;if(null!=(t=e.props)&&t.mdxType&&e.props.originalType){const{mdxType:t,originalType:n,...a}=e.props;return o.createElement(e.props.originalType,a)}return e}(e):e));return o.createElement(m.Z,e,t)},code:function(e){const t=["a","abbr","b","br","button","cite","code","del","dfn","em","i","img","input","ins","kbd","label","object","output","q","ruby","s","small","span","strong","sub","sup","time","u","var","wbr"];return o.Children.toArray(e.children).every((e=>{var n;return"string"==typeof e&&!e.includes("\n")||(0,o.isValidElement)(e)&&t.includes(null==(n=e.props)?void 0:n.mdxType)}))?o.createElement("code",e):o.createElement(Q,e)},a:function(e){return o.createElement(J.Z,e)},pre:function(e){var t;return o.createElement(Q,(0,o.isValidElement)(e.children)&&"code"===(null==(t=e.children.props)?void 0:t.originalType)?e.children.props:{...e})},details:function(e){const t=o.Children.toArray(e.children),n=t.find((e=>{var t;return o.isValidElement(e)&&"summary"===(null==(t=e.props)?void 0:t.mdxType)})),a=o.createElement(o.Fragment,null,t.filter((e=>e!==n)));return o.createElement(re,(0,s.Z)({},e,{summary:n}),a)},ul:function(e){return o.createElement("ul",(0,s.Z)({},e,{className:(t=e.className,(0,a.Z)(t,(null==t?void 0:t.includes("contains-task-list"))&&ue))}));var t},img:function(e){return o.createElement("img",(0,s.Z)({loading:"lazy"},e,{className:(t=e.className,(0,a.Z)(t,de))}));var t},h1:e=>o.createElement(me,(0,s.Z)({as:"h1"},e)),h2:e=>o.createElement(me,(0,s.Z)({as:"h2"},e)),h3:e=>o.createElement(me,(0,s.Z)({as:"h3"},e)),h4:e=>o.createElement(me,(0,s.Z)({as:"h4"},e)),h5:e=>o.createElement(me,(0,s.Z)({as:"h5"},e)),h6:e=>o.createElement(me,(0,s.Z)({as:"h6"},e)),admonition:function(e){const{children:t,type:n,title:l,icon:c}=be(e),i=function(e){const t=ye[e]??e;return ve[t]||(console.warn(`No admonition config found for admonition type "${t}". Using Info as fallback.`),ve.info)}(n),s=l??i.label,{iconComponent:m}=i,u=c??o.createElement(m,null);return o.createElement("div",{className:(0,a.Z)(r.k.common.admonition,r.k.common.admonitionType(e.type),"alert",`alert--${i.infimaClassName}`,pe)},o.createElement("div",{className:fe},o.createElement("span",{className:he},u),s),o.createElement("div",{className:ge},t))},mermaid:n(1875).Z};function ke(e){let{children:t}=e;return o.createElement(i.Zo,{components:Ee},t)}function Ne(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const o=n.slice(2,e.level);e.parentIndex=Math.max(...o),n[e.level]=t}));const o=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):o.push(a)})),o}function Ce(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:o}=e;return t.flatMap((e=>{const t=Ce({toc:e.children,minHeadingLevel:n,maxHeadingLevel:o});return function(e){return e.level>=n&&e.level<=o}(e)?[{...e,children:t}]:t}))}function Le(e){const t=e.getBoundingClientRect();return t.top===t.bottom?Le(e.parentNode):t}function Be(e,t){let{anchorTopOffset:n}=t;const o=e.find((e=>Le(e).top>=n));if(o){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(Le(o))?o:e[e.indexOf(o)-1]??null}return e[e.length-1]??null}function xe(){const e=(0,o.useRef)(0),{navbar:{hideOnScroll:t}}=(0,p.L)();return(0,o.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function _e(e){const t=(0,o.useRef)(void 0),n=xe();(0,o.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:o,linkActiveClassName:a,minHeadingLevel:l,maxHeadingLevel:r}=e;function c(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(o),c=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const o=[];for(let a=t;a<=n;a+=1)o.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(o.join()))}({minHeadingLevel:l,maxHeadingLevel:r}),i=Be(c,{anchorTopOffset:n.current}),s=e.find((e=>i&&i.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===s)}))}return document.addEventListener("scroll",c),document.addEventListener("resize",c),c(),()=>{document.removeEventListener("scroll",c),document.removeEventListener("resize",c)}}),[e,n])}function we(e){let{toc:t,className:n,linkClassName:a,isChild:l}=e;return t.length?o.createElement("ul",{className:l?void 0:n},t.map((e=>o.createElement("li",{key:e.id},o.createElement("a",{href:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),o.createElement(we,{isChild:!0,toc:e.children,className:n,linkClassName:a}))))):null}const Te=o.memo(we);function Ze(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:a="table-of-contents__link",linkActiveClassName:l,minHeadingLevel:r,maxHeadingLevel:c,...i}=e;const m=(0,p.L)(),u=r??m.tableOfContents.minHeadingLevel,d=c??m.tableOfContents.maxHeadingLevel,f=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,o.useMemo)((()=>Ce({toc:Ne(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:u,maxHeadingLevel:d});return _e((0,o.useMemo)((()=>{if(a&&l)return{linkClassName:a,linkActiveClassName:l,minHeadingLevel:u,maxHeadingLevel:d}}),[a,l,u,d])),o.createElement(Te,(0,s.Z)({toc:f,className:n,linkClassName:a},i))}const He="tableOfContents_bqdL";function je(e){let{className:t,...n}=e;return o.createElement("div",{className:(0,a.Z)(He,"thin-scrollbar",t)},o.createElement(Ze,(0,s.Z)({},n,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}const Se="mdxPageWrapper_j9I6";function Ae(e){const{content:t}=e,{metadata:{title:n,description:i,frontMatter:s}}=t,{wrapperClassName:m,hide_table_of_contents:u}=s;return o.createElement(l.FG,{className:(0,a.Z)(m??r.k.wrapper.mdxPages,r.k.page.mdxPage)},o.createElement(l.d,{title:n,description:i}),o.createElement(c.Z,null,o.createElement("main",{className:"container container--fluid margin-vert--lg"},o.createElement("div",{className:(0,a.Z)("row",Se)},o.createElement("div",{className:(0,a.Z)("col",!u&&"col--8")},o.createElement("article",null,o.createElement(ke,null,o.createElement(t,null)))),!u&&t.toc.length>0&&o.createElement("div",{className:"col col--2"},o.createElement(je,{toc:t.toc,minHeadingLevel:s.toc_min_heading_level,maxHeadingLevel:s.toc_max_heading_level}))))))}},7594:(e,t)=>{function n(e){let t,n=[];for(let o of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(o))n.push(parseInt(o,10));else if(t=o.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,o,a,l]=t;if(o&&l){o=parseInt(o),l=parseInt(l);const e=o<l?1:-1;"-"!==a&&".."!==a&&"\u2025"!==a||(l+=e);for(let t=o;t!==l;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);