(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{207:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(16),l=a.n(o),c=(a(84),a(23)),i=a(21),s=a(65),u=a(66),f=a(77),d=a(67),h=a(78),m=a(71),p=a.n(m),b=a(72),v=a.n(b),g=a(73),k=a.n(g),E=a(74),y=a.n(E),w=a(32),O=a.n(w),j=a(75),M=a.n(j),x=a(76),A=a.n(x),C=a(38),S=a.n(C),N=a(70),B=a.n(N),J=a(68),T=a.n(J),W=function(e){var t=function(e){for(var t=e.map(function(t){var a=Array(e.length).fill(void 0);return a[t]=t,a}),a=function(){var a=Math.floor(Math.random()*e.length),n=[];t.forEach(function(e,t){return e.forEach(function(e,r){e===a&&n.push([t,r])})});var r=[];if(n.forEach(function(a){0!==a[0]&&void 0===t[a[0]-1][a[1]]&&r.push([a[0]-1,a[1]]),a[0]!==e.length-1&&void 0===t[a[0]+1][a[1]]&&r.push([a[0]+1,a[1]]),0!==a[1]&&void 0===t[a[0]][a[1]-1]&&r.push([a[0],a[1]-1]),a[1]!==e.length-1&&void 0===t[a[0]][a[1]+1]&&r.push([a[0],a[1]+1])}),r.length){var o=r[Math.floor(Math.random()*r.length)];t[o[0]][o[1]]=a}};!n(t);)a();function n(e){var t=0;return e.forEach(function(e){e.forEach(function(e){void 0===e&&t++})}),!t}return t}(function(e){for(var t=[Math.floor(Math.random()*e)];t.length<e;){var a=Object(i.a)(new Set(new Array(e).fill(1).map(function(e,t){return t}).filter(function(e){return-1===t.indexOf(e)}).filter(function(e){return e!==t[t.length-1]+1}).filter(function(e){return e!==t[t.length-1]-1}).map(JSON.stringify))).map(JSON.parse);a.length>0?t.push(a[Math.floor(Math.random()*a.length)]):t=[Math.floor(Math.random()*e)]}return t}(e));console.log(t);var a=[];return t.forEach(function(e){return e.forEach(function(e){return a[e]=a[e]+1||1})}),console.log(a),t},I=(a(86),["#f9e79f","#a9dfbf","#a3e4d7","#a9cce3","#d7bde2","#e6b0aa","#edbb99","#fad7a0","#a2d9ce","#aed6f1","#d2b4de","#f5b7b1"]),L={blank:"",marked:r.a.createElement(T.a,{style:{height:"80%",width:"80%",opacity:"0.3"}}),starred:r.a.createElement(B.a,{style:{height:"80%",width:"80%"}})},P=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(f.a)(this,Object(d.a)(t).call(this,e))).toggleModal=function(){return a.setState({modalOpen:!a.state.modalOpen})},a.updateTracker=function(e,t){return function(){var n=a.state.tracker,r=Object(i.a)(n),o=n[e][t];"blank"===o&&(r[e][t]="marked"),"marked"===o&&(r[e][t]="starred"),"starred"===o&&(r[e][t]="blank"),a.setState({tracker:r})}},a.resetTracker=function(){return a.setState({tracker:Object(i.a)(Array(a.state.level).fill(1).map(function(e){return Array(a.state.level).fill("blank")}))})};var n=Object(i.a)(Array(9).fill(1).map(function(e){return Array(9).fill("blank")}));return a.state={tracker:n,level:9,modalOpen:!1,grid:W(9)},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e,t=this,a=this.state,n=a.grid,o=a.level,l=a.tracker;return r.a.createElement("div",{className:"App"},r.a.createElement(p.a,{className:"appBar",position:"static"},r.a.createElement(v.a,null,r.a.createElement(k.a,{variant:"h6",color:"inherit"},"\u2605 Star Battle"))),r.a.createElement("div",{style:(e={display:"block"},Object(c.a)(e,"display","flex"),Object(c.a)(e,"flexWrap","wrap"),Object(c.a)(e,"padding","20px 5px 5px 0"),Object(c.a)(e,"justifyContent","center"),e)},n.map(function(e,a){return e.map(function(e,n){return r.a.createElement("div",{style:{background:I[e],width:"".concat(90/o,"vw"),height:"".concat(90/o,"vw"),margin:"1px",display:"flex",justifyContent:"center",alignItems:"center"},onClick:t.updateTracker(a,n)},L[l[a][n]])})})),r.a.createElement(y.a,{className:"navbar",showLabels:!0},r.a.createElement(O.a,{label:"About",icon:r.a.createElement(S.a,null),onClick:this.toggleModal}),r.a.createElement(O.a,{label:"Points",icon:r.a.createElement(S.a,null),onClick:function(){}})," ",r.a.createElement(O.a,{label:"Reset",icon:r.a.createElement(M.a,null),onClick:this.resetTracker})),r.a.createElement(A.a,{"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",open:this.state.modalOpen,onClose:this.toggleModal},r.a.createElement("div",{className:"modal"},"hi this is modal ")))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},79:function(e,t,a){e.exports=a(207)},84:function(e,t,a){},86:function(e,t,a){}},[[79,2,1]]]);
//# sourceMappingURL=main.2b3db572.chunk.js.map