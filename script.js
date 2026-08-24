document.addEventListener("DOMContentLoaded", async() => {
function updcl() {
    const dkclock=document.getElementById("dkclock");
    const now=new Date();
    const timeString=now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',hour12:true}).replace(/\s?(AM|PM)/i,"");
    const dktime=now.toLocaleDateString([],{weekday:"short",day:"numeric",month:"short"})+" "+now.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",hour12:true}).replace(/\s?(AM|PM)/i,"");
    const clock=document.getElementById("clock");
    clock.textContent=timeString;
    dkclock.textContent=dktime
}
updcl();
setInterval(updcl,1000);
const lB=document.getElementById("lb");
const lS=document.getElementById("ls");
const dT=document.getElementById("dt");
const ClPl=document.getElementById("clpl");
const ClB=document.getElementById("dkclock");
const CD=document.getElementById("cd");
const Mon=document.getElementById("mon");
const Days=document.getElementById("days");
const Hr=document.getElementById("hr");
const Min=document.getElementById("min");
const Sec=document.getElementById("sec");
const ADt=document.getElementById("adt");
const Pm=document.getElementById("pm");
const Nm=document.getElementById("nm");
let CaD=new Date();
function updClPl(){
    const now=new Date();
    CD.textContent=now.toLocaleDateString([],{weekday:"long",month:"long",day:"numeric",year:"numeric"});
    const secs=now.getSeconds();
    const mins=now.getMinutes();
    const hrs=now.getHours();
    const secang=secs*6;
    const minang=mins*6 + secs*0.1;
    const hrang=(hrs%12)*30 + mins*0.5;
    Sec.style.transform=`translateX(-50%) rotate(${secang}deg)`;
    Min.style.transform=`translateX(-50%) rotate(${minang}deg)`;
    Hr.style.transform=`translateX(-50%) rotate(${hrang}deg)`;
    ADt.textContent=now.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:true});
}
function renCal(){
    const yr=CaD.getFullYear();
    const mont=CaD.getMonth();
    Mon.textContent=CaD.toLocaleDateString([],{month:"long", year:"numeric"});
    Days.innerHTML="";
    const fD=new Date(yr,mont,1).getDay();
    const dIm=new Date(yr,mont+1,0).getDate();
    const dIPm=new Date(yr,mont,0).getDate();
    const td=new Date();
    for (let i=fD-1;i>=0;i--){
        const day=document.createElement("div");
        day.className="day om";
        day.textContent=dIPm-i;
        Days.appendChild(day);
    }
    for(let dN=1;dN<=dIm;dN++){
        const day=document.createElement("div");
        day.className="day";
        day.textContent=dN;
        if(dN=== td.getDate() && mont===td.getMonth() && yr===td.getFullYear()){
            day.classList.add("td");
        }
        Days.appendChild(day);
    }
    const fc=fD+dIm;
    const rc=42-fc;
    for(let nD=1;nD<=rc;nD++){
        const day=document.createElement("div");
        day.className="day om";
        day.textContent=nD;
        Days.appendChild(day);
    }
}
ClB.addEventListener("click",(event)=>{
    event.stopPropagation();
    const wO=ClPl.classList.contains("open");
    clPU();
    if(!wO){
        ClPl.classList.add("open");
        ClB.classList.add("active");
        updClPl();
        renCal();
    }
});
Pm.addEventListener("click",(event)=>{
    event.stopPropagation();
    CaD.setDate(1);
    CaD.setMonth(CaD.getMonth()-1);
    renCal();
});
Nm.addEventListener("click",(event)=>{
    event.stopPropagation();
    CaD.setDate(1);
    CaD.setMonth(CaD.getMonth()+1);
    renCal();
});
setInterval(updClPl,1000);
updClPl();
if (lB && lS && dT) {
lB.addEventListener("click",()=>{
    clPU();
    dT.classList.add("login");
    requestAnimationFrame(()=>{
    lS.classList.add("login");});
    setTimeout(()=>{
    lS.classList.add("inactive");
    },550);
})};
const CcB=document.getElementById("settings");
const Cc=document.getElementById("settings-panel");
const wB=document.getElementById("wallb");
const wP=document.getElementById("wpicker");
const WtB=document.getElementById("wb");
const WtP=document.getElementById("wtp");
const wtt=document.getElementById("wtt");
const wtco=document.getElementById("wtco");
const wtic=document.querySelector(".wtic");
const wtu=document.querySelector(".wtu");
const wtr = document.getElementById("wtr");
const wthloc = document.querySelector(".wthloc");
const wthcit = document.getElementById("wth-city");
async function gCL(city) {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Location request failed");
        }
        const da = await res.json();
        if (!da.results || da.results.length === 0) {
            throw new Error("City not found");
        }
        const pl = da.results[0];
        return {
            lat: pl.latitude, lon: pl.longitude, name: pl.name, country: pl.country};} catch (error) {
        console.error("Location error:", error);
        return null;}
}
async function fetchWeather(lat,lon,locationName){
    try{
        const url= `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
        const res=await fetch(url);
        if(!res.ok){
            throw new Error("Weather request failed")
        }
        const da=await res.json();
        const tem=Math.round(da.current.temperature_2m);
        const cd=da.current.weather_code;
        const cond={0: ["☀️", "Clear"],
            1: ["🌤️", "Mostly Clear"],
            2: ["⛅", "Partly Cloudy"],
            3: ["☁️", "Overcast"],
            45: ["🌫️", "Foggy"],
            48: ["🌫️", "Foggy"],
            51: ["🌦️", "Light Drizzle"],
            53: ["🌦️", "Drizzle"],
            55: ["🌧️", "Heavy Drizzle"],
            61: ["🌧️", "Light Rain"],
            63: ["🌧️", "Rain"],
            65: ["🌧️", "Heavy Rain"],
            71: ["🌨️", "Light Snow"],
            73: ["🌨️", "Snow"],
            75: ["❄️", "Heavy Snow"],
            80: ["🌦️", "Rain Showers"],
            81: ["🌦️", "Rain Showers"],
            82: ["⛈️", "Heavy Rain Showers"],
            95: ["⛈️", "Thunderstorm"],
            96: ["⛈️", "Thunderstorm"],
            99: ["⛈️", "Thunderstorm"]};
            const [ico,con]=cond[cd]||["🌡️","Unknown"];
            console.log({wtt,wtco,wtic,wthloc,wtu});
            wtt.textContent=`${tem}°C`;
            wtic.textContent=ico;
            wtco.textContent=con;
            wthloc.textContent=`⚲${locationName}`;
            WtB.textContent=`${ico} ${tem}°C ~ ${con}`
            const upd=new Date(da.current.time);
            wtu.textContent=`Updated:${upd.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`;            
    }catch (error){
        console.error("WTH error:",error);
        wtco.textContent=error.message;
    }
}
let wtL = null;
if (wthcit) {
    wthcit.addEventListener("change", async () => {
        const cit = wthcit.value.trim();
        if (!cit) return;        
        const loc = await gCL(cit);
        if (!loc) {
            wtco.textContent = "Location not found!";
            wtic.textContent = "⚠️";
            return;
        }
        wtL = loc;
        localStorage.setItem("wthLoc", cit);
        const locN = loc.country
            ? `${loc.name}, ${loc.country}`
            : loc.name;
        await fetchWeather(loc.lat, loc.lon, locN);
    });
}
if (wtr) {
    wtr.addEventListener("click", async () => {
        if (!wtL) {
            return;
        }
        const locN = wtL.country
            ? `${wtL.name}, ${wtL.country}`
            : wtL.name;
        await fetchWeather(wtL.lat, wtL.lon, locN);
    });
}
function clPU(){
    Cc?.classList.remove("open");
    wP?.classList.remove("open");
    ClPl?.classList.remove("open");
    WtP?.classList.remove("open");
    lM.classList.remove("open");
    CcB?.classList.remove("active");
    WtB?.classList.remove("active");
    ClB?.classList.remove("active");
    loB?.classList.remove("active");
}
if (WtB && WtP){
    WtB.addEventListener("click",()=>{
    const wasO=WtP.classList.contains("open");
    clPU();
    if(!wasO){
        console.log("Weather clicked");
        WtP.classList.add("open");
        WtB.classList.add("active");
    }
    })
}
if (CcB && Cc) {
CcB.addEventListener("click",()=>{
    const wasO=Cc.classList.contains("open");
    clPU();
    if(!wasO){
        Cc.classList.add("open");
        CcB.classList.add("active");
    }
});}
if (wB && wP) {
wB.addEventListener("click",()=>{
    const wasO=wP.classList.contains("open");
    clPU();
    if(!wasO){
        wP.classList.add("open");
    }
});}
const tT=document.getElementById("tt");
if (tT) {
    tT.addEventListener("click",()=>{
        document.body.classList.toggle("dark-mode");
        tT.classList.toggle("active");
        const iD=document.body.classList.contains("dark-mode");
        localStorage.setItem("them",iD?"dark":"light");
    });}
const wOp=document.querySelectorAll(".wp-option");
wOp.forEach(option=>{
    option.addEventListener("click",()=>{
        const wall=option.dataset.wallpaper;
            dT.style.setProperty("--nxt-wall",`url("${wall}")`);
            dT.classList.add("wp-ch");
            setTimeout(()=>{
                dT.style.backgroundImage=`url("${wall}")`;
                dT.classList.remove("wp-ch");
                localStorage.setItem("fall",wall);
            },400);
        }
    );
});
const dkT=document.getElementById("dt");
dkT.addEventListener("click",(event)=>{
    if(
        !event.target.closest("#settings-panel") &&
        !event.target.closest("#wpicker") &&
        !event.target.closest("#settings") &&
        !event.target.closest("#wallb") &&
        !event.target.closest("#clpl") &&
        !event.target.closest("#wtp") &&
        !event.target.closest("#wb")
    )
    {
        clPU();
    }
})
dkT.addEventListener("mousedown",(event)=>{
    if(event.target.closest(".appwin")){
        return;
    }
    document.querySelectorAll(".appwin").forEach(win=>{
        focWin(null);    });
});
const sOB=document.getElementById("so");
const sOS=document.getElementById("sos")
if(sOB){
    sOB.addEventListener("click",()=>{
        clPU();
        dT.classList.remove("login");
        sOS.classList.add("active");
        requestAnimationFrame(()=>{
            lS.style.visibility="visible";
        });
        setTimeout(()=>{
            sOS.classList.remove("active");
            lS.classList.remove("login");
            lS.classList.remove("inactive");
        },500);
        },900);
}
const sDB=document.getElementById("sd")
const sDS=document.getElementById("sds")
if(sDB && sDS){
    sDB.addEventListener("click",()=>{
        clPU();
        dT.classList.remove("login");
        setTimeout(()=>{
        sDS.classList.add("active");},450);
        setTimeout(()=>{
            const sdsp=sDS.querySelector(".sdsp");
            const txt=sDS.querySelector("p");
            if(sdsp) sdsp.style.display="none";
            if(txt) txt.textContent="";
            window.close();
        },1500);
        });
    }
const lM=document.getElementById("lm");
const aF=document.getElementById("af");
const loB=document.getElementById("logo");
const sI=document.getElementById("sysinfo");
const sC=document.getElementById("sysclo");
const OK=document.getElementById("ok");
const ost=document.querySelector(".ost");
if (loB && lM){
    loB.addEventListener("click",(event)=>{
        event.stopPropagation();
        const waO=lM.classList.contains("open");
        clPU();
        if(!waO){
            lM.classList.add("open");
            loB.classList.add("active");
        }
    });
}
if(aF && sI){
    aF.addEventListener("click",()=>{
        lM.classList.remove("open");
    })
}
if(ost){
    ost.addEventListener("click",()=>{
        clPU();
        sI.classList.add("open");
    })
}
if(sC){
    sC.addEventListener("click",cSI);
}
if(OK){
    OK.addEventListener("click",cSI);
}
function cSI(){
    sI.classList.remove("open");
}
const testWin=document.getElementById("win");
const appWins=document.querySelectorAll(".appwin");
const nA=document.querySelector('[data-app="memo"]')
if (nA && testWin){
    nA.addEventListener("click",()=>{
        testWin.classList.add("open")
        testWin.classList.remove("minimized");
        nA.classList.add("rng");
        focWin(testWin);
    });
}
function focWin(win){
    appWins.forEach(app=>{
        app.classList.remove("focused");
    });
    if(win){
        win.classList.add("focused");
    }
}
function crWin(win){
    if(!win){
        return;
    }
const dA=document.querySelector(`.app[data-app="${win.dataset.app}"]`);
const Cl=win.querySelector(".cl");
const Min=win.querySelector(".mini");
const Max=win.querySelector(".max");
const TB=win.querySelector(".wintit");
win.addEventListener("mousedown",()=>{
    focWin(win);
});
if(Cl){
    Cl.addEventListener("click",(event)=>{
        event.stopPropagation();
        win.classList.remove("open");
        win.classList.remove("minimized");
        dA?.classList.remove("rng");
        if(win===WW && wA){
            wA.classList.remove("rng");
            wA=null;
        }
    });
}
if(Min){
    Min.addEventListener("click",(event)=>{
        event.stopPropagation();
        win.classList.add("minimized");
    });
}
const normGeo=new Map();
if(Max){
    Max.addEventListener("click",(event)=>{
        if(win===cW) return;
        if(win===testWin) return;
        event.stopPropagation();
        win.classList.toggle("maximized")
        if(win.classList.contains("maximized")){
            Max.textContent="❐";
        }else{
            Max.textContent="□";}
        })
    };
let dr=false;
let drOX=0;
let drOY=0;
if(TB){
    TB.addEventListener("mousedown",(event)=>
    {
        if(event.target.closest(".winctrl"))
        {
            return;
        }
        if(win.classList.contains("maximized")){
            return;
        }
        dr=true;
        const Prec=dT.getBoundingClientRect();
        const rec=win.getBoundingClientRect();
        drOX=event.clientX-rec.left;
        drOY=event.clientY-rec.top;
        win.style.left=`${rec.left - Prec.left}px`;
        win.style.top=`${rec.top - Prec.top}px`;
        focWin(win);
    });
    document.addEventListener("mousemove",(event)=>{
        if(!dr){
            return;
        }
        win.style.left=`${event.clientX-drOX}px`;
        win.style.top=`${event.clientY-drOY}px`;
    });
    document.addEventListener("mouseup",()=>{
        dr=false;
    });
}
let rsz=false;
let rsD="";
let stX=0;
let stY=0;
let stL=0;
let stT=0;
let stW=0;
let stH=0;
const RSZ=8;
const minW=650;
const minH=450;
function gRsD(event){
    if(win.classList.contains("maximized")){
        return "";
    }
    const rect=win.getBoundingClientRect();
    const x=event.clientX - rect.left;
    const y=event.clientY - rect.top;
    const l=x<=RSZ;
    const r=x>=rect.width - RSZ;
    const t=y<=RSZ;
    const b=y>=rect.height - RSZ;
    if(t && l) return "tl";
    if(t && r) return "tr";
    if(b && l) return "bl";
    if(b && r) return "br";
    if(l) return "l";
    if(r) return "r";
    if(t) return "t";
    if(b) return "b";
    return "";
}
win.addEventListener("mousemove",(event)=>{
    if(win===cW || win===testWin){
        win.style.cursor="";
        return;
    }
    if(rsz) return;
    const d=gRsD(event);
    const cursors={
        t:"ns-resize",
        b: "ns-resize",
        l: "ew-resize",
        r: "ew-resize",
        tl: "nwse-resize",
        br: "nwse-resize",
        tr: "nesw-resize",
        bl: "nesw-resize"
    };
    win.style.cursor=cursors[d] || "";
});
win.addEventListener("mousedown",(event)=>{
    if(event.button!==0) return;
    const d=gRsD(event);
    if(!d)return;
    event.preventDefault();
    event.stopPropagation();
    rsz=true;
    rsD=d;
    const Prec=dT.getBoundingClientRect();
    const rect=win.getBoundingClientRect();
    win.style.left = `${rect.left - Prec.left}px`;
    win.style.top = `${rect.top - Prec.top}px`;
    rsz=true;
    rsD=d;
    stX=event.clientX;
    stY=event.clientY;
    stL=rect.left - Prec.left;
    stT=rect.top - Prec.top;
    stW=rect.width;
    stH=rect.height;
    win.classList.add("resizing");
    focWin(win);
});
document.addEventListener("mousemove",(event)=>{
    if(!rsz) return;
    const dx=event.clientX - stX;
    const dy=event.clientY - stY;
    let l=stL;
    let t=stT;
    let w=stW;
    let h=stH;
    if (rsD.includes("r")){
        w=Math.max(minW,stW + dx);
    }
    if(rsD.includes("b")){
        h=Math.max(minH,stH + dy);
    }
    if(rsD.includes("l")){
        w=Math.max(minW,stW - dx);
        l=stL + (stW - w);
    }
    if(rsD.includes("t")){
        h=Math.max(minH,stH - dy);
        t=stT + (stH - h);
    }
    win.style.left=`${l}px`;
    win.style.top=`${t}px`;
    win.style.width=`${w}px`;
    win.style.height=`${h}px`;
});
document.addEventListener("mouseup",()=>{
    if(!rsz) return;
    rsz=false;
    rsD="";
    win.classList.remove("resizing");
    win.style.cursor="";
})
}
const note=document.getElementById("note");
if(note){
    note.value=localStorage.getItem("memos")||"";
    note.addEventListener("input",()=>{
        localStorage.setItem("memos",note.value);
    })
}
const WW = document.getElementById("wipwin");
const wT = document.getElementById("wiptit");
let wA=null;
document.querySelectorAll('[data-app="exp"], [data-app="bro"]').forEach(app => {
    app.addEventListener("click", () => {
        wA=app;
        wT.textContent = app.dataset.app === "exp"
            ? "Files"
            :  "Browser";
        WW.classList.remove("minimized");
        WW.classList.add("open");
        app.classList.add("rng");
        focWin(WW);
    });
});
const calD=document.getElementById("cadis");
const calB=document.querySelectorAll("[dcal]");
let calVal="0";
let calP=null;
let calO=null;
let calW=false;
function updCalc(){
    calD.textContent=calVal;
}
function cal(a,b,op){
    switch(op){
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "×":
            return a*b;
        case "÷":
            return b===0?0 : a/b;
        case "%":
            return (a/100)*b;
        default:
            return b;
    }
}
calB.forEach(btn=>{
    btn.addEventListener("click",()=>{
        const ty=btn.getAttribute("dcal");
        const val=btn.textContent;
        if(ty==="clear"){
            calVal="0";
            calP=null;
            calO=null;
            calW=false;
            updCalc();
            return;
        }
        if(ty==="bksp"){
            if(!calW){
                calVal=calVal.length>1?calVal.slice(0,-1):"0";
            }
        updCalc();
        return;
        }
        if(ty==="num"){
            if(calW){
                calVal=val==="."?"0.":val;
                calW=false;
            }else if(val==="." && calVal.includes(".")){return;}
            else if(calVal==="0" && val!=="."){calVal=val;}
            else{
                calVal+=val;
            }
            updCalc()
        }
        if(ty==="op")
        {
            const cur=Number(calVal);
            if(calP!==null && calO && !calW){
                calP=cal(calP,cur,calO);
                calVal=String(calP);
            }
            else{
                calP=cur;
            }
            calO=val;
            calW=true;
            updCalc();
            return;
        }
        if(ty==="eq"){
            if(calO===null || calP===null){
                return;
            }
            const res=cal(calP,Number(calVal),calO);
            calVal=String(res);
            calP=null;
            calO=null;
            calW=true;
            updCalc();
        }
        })
})
const pW=document.getElementById("pin");
const cW=document.getElementById("cawin");
const painA = document.querySelector('[data-app="pain"]');
const calcA = document.querySelector('[data-app="cat"]');
if (painA && pW){
painA.addEventListener("click", () => {
        pW.classList.add("open")
        pW.classList.remove("minimized");
        painA.classList.add("rng");
        focWin(pW);
});}
if (calcA && cW){
calcA.addEventListener("click", () => {
        cW.classList.add("open")
        cW.classList.remove("minimized");
        calcA.classList.add("rng");
        focWin(cW);
    });
}
async function lSS(){
    const th=localStorage.getItem("them");
    if(th==="dark"){
        document.body.classList.add("dark-mode");
        tT?.classList.add("active");
    }else{
        document.body.classList.remove("dark-mode");
        tT?.classList.remove("active");
    }
    const wll=localStorage.getItem("fall");
    if(wll){
        dT.style.backgroundImage=`url("${wll}")`;
    }
    const wthLoC=localStorage.getItem("wthLoc");
    if(wthLoC && wthcit){
        wthcit.value = wthLoC;
        const loc = await gCL(wthLoC);
        if(loc){
            wtL = loc;
            const locN = loc.country
                ? `${loc.name}, ${loc.country}`
                : loc.name;
            await fetchWeather(loc.lat, loc.lon, locN);
        }}
}
    lSS();
appWins.forEach(win=>{
    crWin(win);
    });
});