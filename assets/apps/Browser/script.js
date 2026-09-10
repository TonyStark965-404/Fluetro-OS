const pg = document.getElementById("pg");
const add = document.getElementById("ad");
const bk = document.getElementById("b");
const fw = document.getElementById("f");
const rd = document.getElementById("r");
const hm = document.getElementById("h");
const ld = document.getElementById("ld");
const err = document.getElementById("err");
const HM = "https://www.google.com/search?igu=1";
let his = [HM];
let hi = 0;
function stT(th){
    if(th === "dk"){
        document.documentElement.dataset.theme = "dk";
    }else{
        document.documentElement.removeAttribute("data-theme");
    }
}
window.addEventListener("message", e => {
    if(e.data?.type !== "fluetro-theme") return;
    console.log("Browser received theme:",e.data.theme);
    stT(e.data.theme);
});
window.parent.postMessage({
    type:"fluetro-theme-request"
},"*");
function isUrl(val){
    return /^https?:\/\//i.test(val) || /^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(val);
}
function nav(val){
    val = val.trim();
    if(!val) return;
    let tg;
    if(val === "hm" || val === HM){
        tg = HM;
    }else if(isUrl(val)){
        tg = /^https?:\/\//i.test(val) ? val : "https://" + val;
    }else{
        tg = "https://www.google.com/search?igu=1&q=" + encodeURIComponent(val);
    }
        his = his.slice(0, hi + 1);
        his.push(tg);
        hi++;
    rd.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
    err.classList.remove("act");
    ld.classList.add("act");
    pg.src = tg;
    uAdd();
}
function uAdd(){
        add.value = his[hi];
        uCtrl();
    }
add.addEventListener("keydown", e => {
    if(e.key === "Enter"){
        nav(add.value);
    }
})
rd.addEventListener("click", () => {
    err.classList.remove("act");
    ld.classList.add("act");
    rd.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
    pg.src = pg.src;
})
hm.addEventListener("click", () => {
    nav(HM);
})
bk.addEventListener("click", () => {
    if(hi <= 0) return;
    hi--;
    pg.src = his[hi];
    uAdd(); 
    ld.classList.add("act");
    rd.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
})
fw.addEventListener("click", () => {
    if(hi >= his.length - 1) return;
    hi++;
    pg.src = his[hi];
    uAdd();
    ld.classList.add("act");
    rd.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
})
pg.addEventListener("load", () => {
    rd.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`
    ld.classList.remove("act");
    err.classList.remove("act");
})
pg.addEventListener("error", () => {
    ld.classList.remove("act");
    err.classList.add("act");
})
document.querySelectorAll(".bm button").forEach(b=>{
    b.addEventListener("click",()=>{nav(b.dataset.url)})
})
const hry=document.getElementById("hry");
const hmb=document.getElementById("hmb");
const hrp=document.getElementById("hrp");
const mnup=document.getElementById("mnup");
const hrl=document.getElementById("hrl");
const ntb=document.getElementById("ntb");
const mnh=document.getElementById("mnh");
function shHry(){
    mnup.classList.remove("act");
    hrl.innerHTML="";
    const list=[...his].reverse();
    list.forEach(url=>{
        const b=document.createElement("button");
    if(url!==HM){
        b.className="hryi";
        b.innerHTML=`<span class="hryi">${url}</span><span class="hur-ur">${url}</span>`;
        b.addEventListener("click",()=>{
            nav(url);
            hrp.classList.remove("act");
        });
        hrl.appendChild(b);
}})
    if(!hrl.children.length){
        hrl.innerHTML='<div class="hr-et">No history</div>';
    }
    hrp.classList.toggle("act");
}
hry.addEventListener("click",()=>{
    shHry();
});
hmb.addEventListener("click",()=>{
    hrp.classList.remove("act");
    mnup.classList.toggle("act");
});
mnh.addEventListener("click",()=>{
    shHry();
});
ntb.addEventListener("click",()=>{
    his=[HM];
    hi=0;
    err.classList.remove("act");
    ld.classList.add("act");
    rd.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
    pg.src=HM;
    uAdd();
    mnup.classList.remove("act");
});
document.addEventListener("click",e=>{
    if(!e.target.closest("#hry,#hrp,#mnup")){
        hrp.classList.remove("act");
    }
    if(!e.target.closest("#hmb,#mnup")){
        mnup.classList.remove("act");
    }
});
function uCtrl(){
    bk.disabled=hi<=0;
    if(hi>=his.length-1){
        fw.classList.add("hide");
    }else{
        fw.classList.remove("hide");
    }
}
const shr=document.getElementById("shr");
const toast=document.getElementById("tot");
let totTm;
shr.addEventListener("click",async()=>{
    const url=his[hi];
    if(!url)return;

    try{
        await navigator.clipboard.writeText(url);
        toast.classList.add("act");

        clearTimeout(totTm);
        totTm=setTimeout(()=>{
            toast.classList.remove("act");
        },1800);
    }catch(e){
        console.log("Could not copy URL");
    }
});
pg.src = HM;
uAdd();