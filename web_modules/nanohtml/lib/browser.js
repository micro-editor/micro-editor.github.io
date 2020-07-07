var e=function(e){return function(n,r,a){for(var l in r)l in t&&(r[t[l]]=r[l],delete r[l]);return e(n,r,a)}},t={class:"className",for:"htmlFor","http-equiv":"httpEquiv"};function n(e){return 9===e||10===e}var r=RegExp("^("+["area","base","basefont","bgsound","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr","!--","animate","animateTransform","circle","cursor","desc","ellipse","feBlend","feColorMatrix","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","font-face-format","font-face-name","font-face-uri","glyph","glyphRef","hkern","image","line","missing-glyph","mpath","path","polygon","polyline","rect","set","stop","tref","use","view","vkern"].join("|")+")(?:[.#][a-zA-Z0-9-￿_:-]+)*$");function a(e){return r.test(e)}var l=/\n[\s]+$/,i=/^\n[\s]+/,s=/[\s]+$/,o=/^[\s]+/,f=/[\n\s]+/g,p=["a","abbr","b","bdi","bdo","br","cite","data","dfn","em","i","kbd","mark","q","rp","rt","rtc","ruby","s","amp","small","span","strong","sub","sup","time","u","var","wbr"],u=["code","pre","textarea"],c=["svg","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"],h=["async","autofocus","autoplay","checked","controls","default","defaultchecked","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","novalidate","open","playsinline","readonly","required","reversed","selected"],g=["indeterminate"],m=function(t){function r(e,n,r){var a;-1!==c.indexOf(e)&&(n.namespace="http://www.w3.org/2000/svg");var m=!1;n.namespace&&(m=n.namespace,delete n.namespace);var d=!1;if(n.is&&(d=n.is,delete n.is),m)a=d?t.createElementNS(m,e,{is:d}):t.createElementNS(m,e);else{if("!--"===e)return t.createComment(n.comment);a=d?t.createElement(e,{is:d}):t.createElement(e)}for(var y in n)if(n.hasOwnProperty(y)){var v=y.toLowerCase(),b=n[y];if("classname"===v&&(v="class",y="class"),"htmlFor"===y&&(y="for"),-1!==h.indexOf(v))if("true"===String(b))b=v;else if("false"===String(b))continue;"on"===v.slice(0,2)||-1!==g.indexOf(v)?a[y]=b:m?"xlink:href"===y?a.setAttributeNS("http://www.w3.org/1999/xlink",y,b):/^xmlns($|:)/i.test(y)||a.setAttributeNS(null,y,b):a.setAttribute(y,b)}return function e(t,n){if(Array.isArray(n))for(var r,a,c=t.nodeName.toLowerCase(),h=!1,g=0,m=n.length;g<m;g++){var d=n[g];if(Array.isArray(d))e(t,d);else{("number"==typeof d||"boolean"==typeof d||"function"==typeof d||d instanceof Date||d instanceof RegExp)&&(d=d.toString());var y=t.childNodes[t.childNodes.length-1];if("string"==typeof d)h=!0,y&&"#text"===y.nodeName?y.nodeValue+=d:(d=t.ownerDocument.createTextNode(d),t.appendChild(d),y=d),g===m-1&&(h=!1,-1===p.indexOf(c)&&-1===u.indexOf(c)?""===(r=y.nodeValue.replace(i,"").replace(s,"").replace(l,"").replace(f," "))?t.removeChild(y):y.nodeValue=r:-1===u.indexOf(c)&&(a=0===g?"":" ",r=y.nodeValue.replace(i,a).replace(o," ").replace(s,"").replace(l,"").replace(f," "),y.nodeValue=r));else if(d&&d.nodeType){h&&(h=!1,-1===p.indexOf(c)&&-1===u.indexOf(c)?""===(r=y.nodeValue.replace(i,"").replace(l," ").replace(f," "))?t.removeChild(y):y.nodeValue=r:-1===u.indexOf(c)&&(r=y.nodeValue.replace(o," ").replace(i,"").replace(l," ").replace(f," "),y.nodeValue=r));var v=d.nodeName;v&&(c=v.toLowerCase()),t.appendChild(d)}}}}(a,r),a}var m=function(t,r){r||(r={});var l=r.concat||function(e,t){return String(e)+String(t)};return!1!==r.attrToProp&&(t=e(t)),function(e){for(var s=1,o="",f=arguments.length,p=[],u=0;u<e.length;u++)if(u<f-1){var c=arguments[u+1],h=k(e[u]),g=s;10===g&&(g=8),9===g&&(g=8),7===g&&(g=8),4===g&&(g=5),2===g?"/"===o?(h.push([2,"/",c]),o=""):h.push([2,c]):13===g&&r.comments?o+=String(c):13!==g&&h.push([0,g,c]),p.push.apply(p,h)}else p.push.apply(p,k(e[u]));var m=[null,{},[]],d=[[m,-1]];for(u=0;u<p.length;u++){var y=d[d.length-1][0],v=(h=p[u])[0];if(2===v&&/^\//.test(h[1])){var b=d[d.length-1][1];d.length>1&&(d.pop(),d[d.length-1][0][2][b]=t(y[0],y[1],y[2].length?y[2]:void 0))}else if(2===v){var w=[h[1],{},[]];y[2].push(w),d.push([w,y[2].length-1])}else if(5===v||0===v&&5===h[1]){for(var x,C="";u<p.length;u++)if(5===p[u][0])C=l(C,p[u][1]);else{if(0!==p[u][0]||5!==p[u][1])break;if("object"!=typeof p[u][2]||C)C=l(C,p[u][2]);else for(x in p[u][2])p[u][2].hasOwnProperty(x)&&!y[1][x]&&(y[1][x]=p[u][2][x])}11===p[u][0]&&u++;for(var A=u;u<p.length;u++)if(8===p[u][0]||5===p[u][0])y[1][C]?""===p[u][1]||(y[1][C]=l(y[1][C],p[u][1])):y[1][C]=i(p[u][1]);else{if(0!==p[u][0]||8!==p[u][1]&&5!==p[u][1]){!C.length||y[1][C]||u!==A||3!==p[u][0]&&12!==p[u][0]||(y[1][C]=C.toLowerCase()),3===p[u][0]&&u--;break}y[1][C]?""===p[u][2]||(y[1][C]=l(y[1][C],p[u][2])):y[1][C]=i(p[u][2])}}else if(5===v)y[1][h[1]]=!0;else if(0===v&&5===h[1])y[1][h[2]]=!0;else if(3===v){if(a(y[0])&&d.length){b=d[d.length-1][1];d.pop(),d[d.length-1][0][2][b]=t(y[0],y[1],y[2].length?y[2]:void 0)}}else if(0===v&&1===h[1])void 0===h[2]||null===h[2]?h[2]="":h[2]||(h[2]=l("",h[2])),Array.isArray(h[2][0])?y[2].push.apply(y[2],h[2]):y[2].push(h[2]);else if(1===v)y[2].push(h[1]);else if(11!==v&&12!==v)throw new Error("unhandled: "+v)}if(m[2].length>1&&/^\s*$/.test(m[2][0])&&m[2].shift(),m[2].length>2||2===m[2].length&&/\S/.test(m[2][1])){if(r.createFragment)return r.createFragment(m[2]);throw new Error("multiple root elements must be wrapped in an enclosing tag")}return Array.isArray(m[2][0])&&"string"==typeof m[2][0][0]&&Array.isArray(m[2][0][2])&&(m[2][0]=t(m[2][0][0],m[2][0][1],m[2][0][2])),m[2][0];function k(e){var t=[];7===s&&(s=4);for(var a=0;a<e.length;a++){var l=e.charAt(a);1===s&&"<"===l?(o.length&&t.push([1,o]),o="",s=2):">"!==l||n(s)||13===s?13===s&&/-$/.test(o)&&"-"===l?(r.comments&&t.push([8,o.substr(0,o.length-1)]),o="",s=1):2===s&&/^!--$/.test(o)?(r.comments&&t.push([2,o],[5,"comment"],[11]),o=l,s=13):1===s||13===s?o+=l:2===s&&"/"===l&&o.length||(2===s&&/\s/.test(l)?(o.length&&t.push([2,o]),o="",s=4):2===s?o+=l:4===s&&/[^\s"'=/]/.test(l)?(s=5,o=l):4===s&&/\s/.test(l)?(o.length&&t.push([5,o]),t.push([12])):5===s&&/\s/.test(l)?(t.push([5,o]),o="",s=6):5===s&&"="===l?(t.push([5,o],[11]),o="",s=7):5===s?o+=l:6!==s&&4!==s||"="!==l?6!==s&&4!==s||/\s/.test(l)?7===s&&'"'===l?s=10:7===s&&"'"===l?s=9:10===s&&'"'===l?(t.push([8,o],[12]),o="",s=4):9===s&&"'"===l?(t.push([8,o],[12]),o="",s=4):7!==s||/\s/.test(l)?8===s&&/\s/.test(l)?(t.push([8,o],[12]),o="",s=4):8!==s&&9!==s&&10!==s||(o+=l):(s=8,a--):(t.push([12]),/[\w-]/.test(l)?(o+=l,s=5):s=4):(t.push([11]),s=7)):(2===s&&o.length?t.push([2,o]):5===s?t.push([5,o]):8===s&&o.length&&t.push([8,o]),t.push([3]),o="",s=1)}return 1===s&&o.length?(t.push([1,o]),o=""):8===s&&o.length?(t.push([8,o]),o=""):10===s&&o.length?(t.push([8,o]),o=""):9===s&&o.length?(t.push([8,o]),o=""):5===s&&(t.push([5,o]),o=""),t}};function i(e){return"function"==typeof e?e:"string"==typeof e?e:e&&"object"==typeof e?e:null==e?e:l("",e)}}(r,{comments:!0,createFragment:function e(n){for(var r=t.createDocumentFragment(),a=0;a<n.length;a++)null!=n[a]&&(Array.isArray(n[a])?r.appendChild(e(n[a])):("string"==typeof n[a]&&(n[a]=t.createTextNode(n[a])),r.appendChild(n[a])));return r}});return m.default=m,m.createComment=r,m}(document);export default m;
//# sourceMappingURL=browser.js.map
