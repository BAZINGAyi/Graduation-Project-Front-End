/**
 * shave - Shave is a javascript plugin that truncates multi-line text within a html element based on set max height
 * @version v2.1.7
 * @link https://github.com/dollarshaveclub/shave#readme
 * @author Jeff Wainwright <jjwainwright2@gmail.com> (jeffry.in)
 * @license MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";function e(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)throw Error("maxHeight is required");var i="string"==typeof e?document.querySelectorAll(e):e;if(i){var o=n.character||"…",r=n.classname||"js-shave",s=n.spaces||!0,a='<span class="js-shave-char">'+o+"</span>";"length"in i||(i=[i]);for(var h=0;h<i.length;h+=1){var f=i[h],c=f.style,d=f.querySelector("."+r),l=void 0===f.textContent?"innerText":"textContent";d&&(f.removeChild(f.querySelector(".js-shave-char")),f[l]=f[l]);var v=f[l],g=s?v:v.split(" ");if(!(g.length<2)){var u=c.height;c.height="auto";var p=c.maxHeight;if(c.maxHeight="none",f.offsetHeight<=t)c.height=u,c.maxHeight=p;else{for(var y=g.length-1,j=0,m=void 0;j<y;)m=j+y+1>>1,f[l]=s?g.slice(0,m):g.slice(0,m).join(" "),f.insertAdjacentHTML("beforeend",a),f.offsetHeight>t?y=s?m-2:m-1:j=m;f[l]=s?g.slice(0,y):g.slice(0,y).join(" "),f.insertAdjacentHTML("beforeend",a);var H=s?g.slice(y):g.slice(y).join(" ");f.insertAdjacentHTML("beforeend",'<span class="'+r+'" style="display:none;">'+H+"</span>"),c.height=u,c.maxHeight=p}}}}}if("undefined"!=typeof window){var t=window.$||window.jQuery||window.Zepto;t&&(t.fn.shave=function(t,n){return e(this,t,n),this})}});
