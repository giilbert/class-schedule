(()=>{"use strict";(()=>{const e=JSON.parse('{"T":[["08","30"],["09","17"],["10","04"],["10","51"],["11","38"],["12","25"],["13","12"],["14","00"]],"O":{"1":{"1":["Art","Computer Science","US History","Async US History","Algebra","ELA (S)","Living Environment"],"2":["Independent Work","Living Environment","ELA (S)","Algebra","US History","Living Environment","Async ELA (S)"],"3":["Art","Living Environment","ELA (S)","PE","Algebra","USH","Living Environment"],"4":["ELA","US History","Independent Work","Living Environment","Living Environment","Algebra","Async ELA (S)"],"5":["US History","Independent","ELA (P)","Algebra","Living Environment","Lunch","Independent Work"]},"2":{"1":["US History","Algebra","ELA (P)","Lunch","Computer Science","PE","Living Environment"],"2":["Algebra","Async Algebra","Living Environment","Living Environment","ELA","Lunch","Async ELA (P)"],"3":["Algebra","Art (Proctor in person)","Asych Algebra","Independent Work/Async","Living Environment","Living Environment","US History"],"4":["US History","Asych US History","Living Environment","PE","Algebra","ELA (S)","Async ELA (S)"],"5":["Living Environment","Algebra","Async Algebra","US History","Living Environment","Lunch","Independent Work"]},"3":{"1":["US History","Algebra","Async Algebra","Computer Science","Lunch","Independent Work","ELA (P)"],"2":["US History","Art","Living Environment","Music","Living Environment","Algebra","ELA (S)"],"3":["PE","ELA (P)","Algebra","Asych Algebra","Music","US History","Living Environment"],"4":["ELA (S)","Algebra","US History","PE","Asych US History","Lunch","Living Environment"],"5":["ELA (P)","Algebra","US History","Living Environment","Independent Work","Lunch","Asych ELA (P)"]}}}');let t,n,o=new Date,r="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),l="January February March April May June July August September October November December".split(" "),i="true"==localStorage.getItem("custom-bg-enabled"),s=localStorage.getItem("custom-bg-url")?localStorage.getItem("custom-bg-url"):"https://louie.co.nz/25th_hour/";Date.prototype.getWeek=function(){let e=new Date(this.getFullYear(),0,1);return Math.ceil(((this-e)/864e5+e.getDay()+1)/7)};const c=(e=o)=>{let t=e.getWeek()%3+3;return console.log("week #"+t),t<4?t:t%3};let g=()=>{o=new Date,"14"==o.getHours()&&"0"==o.getMinutes()&&"0"==o.getSeconds()&&(()=>{let e=document.getElementById("party-popper");e.style.top="50%",setTimeout((()=>{e.style.top="150%"}),2e3)})(),t.innerHTML=`\n    \n    <strong>\n    ${l[o.getMonth()]} \n    ${o.getDate()}, \n    ${o.getFullYear()} <br>\n    </strong>\n\n    <span id='timeDisplay'>\n    ${r[o.getDay()]}  |  \n    ${o.toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",second:"numeric",hour12:!0})}\n    </span>\n\n    `,n.innerHTML=`\n    Schedule week #${c()} <br />\n    ${(()=>{let t,n,r,l=e.T,i=e.O;if(0==o.getDay()||6==o.getDay())return"it's the weekends, go have some fun! 📺";if(60*o.getHours()+o.getMinutes()<510)return"school starts at 8:30 first class is "+i[c().toString()][o.getDay().toString()][0];if(o.getHours()>=21)return"go to sleep 💤";if(o.getHours()>=14)return"school ended<br />go do homework and take a break! 📚";for(let e=0;e<l.length-1;e++){let n=l[e],r=parseInt(n[0]),i=parseInt(n[1]),s=l[e+1],c=parseInt(s[0]),g=parseInt(s[1]),d=60*o.getHours()+o.getMinutes(),m=60*c+g;if(d>=60*r+i&&d<m){t=e+1;break}}null==t&&(t="error");try{n=i[c().toString()][o.getDay().toString()][(t-1).toString()]}catch(e){return"an error occured: "+e}n||(n="error");try{r=7==t?"out of school":i[c().toString()][o.getDay().toString()][t.toString()]}catch(e){r="error see console for info",console.error(e)}return`Period ${t}  |  ${n}<br />-----<br />Next: ${r} @ ${new Date(`\n            ${o.getMonth()+1} ${o.getDate()} ${o.getFullYear()} \n            ${l[t][0]}:${l[t][1]}\n        `).toLocaleTimeString("en-us",{hour:"numeric",minute:"numeric"})}`})()}\n    `},d=localStorage.getItem("theme");window.addEventListener("load",(()=>{t=document.getElementById("date"),n=document.getElementById("current-class"),g(),setInterval(g,500),document.getElementById("open-config").addEventListener("click",a),document.getElementById("dark-mode-toggle").addEventListener("click",u),"true"==d&&(document.getElementById("dark-mode-toggle").checked=!0,document.body.classList.remove("light"),document.body.classList.add("dark"),d=!0);let e=document.getElementById("time-travel-button"),r=!1;e.addEventListener("click",(t=>{let n=document.getElementById("time-travel");r?r&&(document.getElementById("open-config").style.display="block",n.style.opacity="0%",n.style.display="none",e.innerHTML="time travel!",r=!1):(document.getElementById("open-config").style.display="none",n.style.display="block",n.style.opacity="100%",e.innerHTML="close",r=!0)})),document.getElementById("time-travel").addEventListener("submit",y),document.getElementsByTagName("form")[0].children[1].value=l[o.getMonth()],document.getElementsByTagName("form")[0].children[5].value=o.getDate(),document.getElementsByTagName("form")[0].children[9].value=o.getFullYear(),document.getElementById("custom-bg-toggle").checked=i,document.getElementById("custom-bg-toggle").addEventListener("click",E),document.getElementById("custom-bg-url").value=s,document.getElementById("custom-bg-url").addEventListener("change",b),i?(document.getElementById("custom-bg").setAttribute("src",s),document.getElementById("custom-bg").style.display="block",document.getElementById("custom-bg-url").removeAttribute("disabled")):(document.getElementById("custom-bg").removeAttribute("src"),document.getElementById("custom-bg-url").setAttribute("disabled","")),document.getElementById("custom-bg-recommendation").addEventListener("click",v)}));let m=!1,a=e=>{let t=document.getElementById("config-menu"),n=document.getElementById("footer");0==m?(n.hidden=!0,t.style.display="block",setTimeout((()=>t.style.opacity="100%"),100),m=!0):1==m&&(n.hidden=!1,t.style.opacity="0%",setTimeout((()=>t.style.display="none"),100),m=!1)},u=e=>{let t=document.getElementById("dark-mode-toggle");t.checked?(document.body.classList.remove("light"),document.body.classList.add("dark"),d=!0,localStorage.setItem("theme",!0)):t.checked||(document.body.classList.remove("dark"),document.body.classList.add("light"),d=!1,localStorage.setItem("theme",!1))},y=t=>{let n=document.getElementById("tt-results");n.style.display="block";let o=t.target,l=o[2],i=o[0],s=o[1],g=new Date(`${i.value} ${s.value} ${l.value}`);if("Invalid Date"==g&&(n.innerHTML='\n        <h3 style="color: #FC5746">Inputted date was invalid :(</h3>\n        '),"0"==g.getDay()||"6"==g.getDay())return void(n.innerHTML="\n        <h3>Weekend</h3>\n        <p>No school</p>\n        ");let d=e.O[c(g).toString()][g.getDay()],m="";d.forEach(((e,t)=>{m+=`<p>${++t}. ${e}</p>`})),n.innerHTML=`\n    <h3>Week ${c(g).toString()} ${r[g.getDay()]}</h3>\n    ${m}\n    `},E=()=>{i?(localStorage.setItem("custom-bg-enabled","false"),i=!1,document.getElementById("custom-bg").setAttribute("src",""),document.getElementById("custom-bg").style.display="none",document.getElementById("custom-bg-url").setAttribute("disabled","")):(localStorage.setItem("custom-bg-enabled","true"),i=!0,document.getElementById("custom-bg").setAttribute("src",s),document.getElementById("custom-bg").style.display="block",document.getElementById("custom-bg-url").removeAttribute("disabled"))},b=e=>{localStorage.setItem("custom-bg-url",e.target.value),document.getElementById("custom-bg").setAttribute("src",e.target.value)},v=()=>{localStorage.setItem("custom-bg-url","https://louie.co.nz/25th_hour/"),document.getElementById("custom-bg").setAttribute("src","https://louie.co.nz/25th_hour/")}})()})();