const e=Symbol("singleComment"),i=Symbol("multiComment"),l=()=>"",n=(e,i,l)=>e.slice(i,l).replace(/\S/g," "),t=(e,i)=>{let l=i-1,n=0;for(;"\\"===e[l];)l-=1,n+=1;return Boolean(n%2)};export default(o,c={})=>{const s=!1===c.whitespace?l:n;let f=!1,r=!1,m=0,u="";for(let l=0;l<o.length;l++){const n=o[l],c=o[l+1];if(!r&&'"'===n){t(o,l)||(f=!f)}if(!f)if(r||n+c!=="//"){if(r===e&&n+c==="\r\n"){l++,r=!1,u+=s(o,m,l),m=l;continue}if(r===e&&"\n"===n)r=!1,u+=s(o,m,l),m=l;else{if(!r&&n+c==="/*"){u+=o.slice(m,l),m=l,r=i,l++;continue}if(r===i&&n+c==="*/"){l++,r=!1,u+=s(o,m,l+1),m=l+1;continue}}}else u+=o.slice(m,l),m=l,r=e,l++}return u+(r?s(o.slice(m)):o.slice(m))};
//# sourceMappingURL=strip-json-comments.js.map
