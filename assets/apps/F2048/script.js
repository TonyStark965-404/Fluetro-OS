const B=document.getElementById("b");
const sC=document.getElementById("scr");
const Bs=document.getElementById("bs");
const rB=document.getElementById("r");
let Sz=4;
const dB=document.getElementById("difb");
const dM=document.getElementById("difmen");
const ov=document.getElementById("ov");
const ovi=document.getElementById("ovi");
const ovt=document.getElementById("ovt");
const ovp=document.getElementById("ovp");
const ng=document.getElementById("ng");
let wn=false;
let bd=[];
let scr=0;
let bs=Number(localStorage.getItem("fn-bs"))||0;
let go=false;
let mv=false;
let tid=0;
const dif={
    beginner:{sz:4},
    intermediate:{sz:5},
    expert:{sz:6}
};
function crB(){
    bd=[];
    for(let r=0;r<Sz;r++){
        const rw=[];
        for(let c=0;c<Sz;c++)rw.push(null);
        bd.push(rw);
    }
}
function eC(){
    const cl=[];
    for(let r=0;r<Sz;r++){
        for(let c=0;c<Sz;c++){
            if(bd[r][c]===null)cl.push([r,c]);
        }
    }
    return cl;
}
function sT(){
    const cl=eC();
    if(cl.length===0)return;
    const[r,c]=cl[Math.floor(Math.random()*cl.length)];
    bd[r][c]={id:++tid,val:Math.random()<0.9?2:4,new:true};
}
function uS(){
    sC.textContent=scr;
    Bs.textContent=bs;
}
function rd(){
    B.innerHTML="";
    for(let r=0;r<Sz;r++){
        for(let c=0;c<Sz;c++){
            const t=bd[r][c];
            if(!t)continue;
            const cl=document.createElement("div");
            cl.classList.add("cll");
            cl.dataset.val=t.val;
            cl.dataset.id=t.id;
            if(t.new)cl.classList.add("new");
            cl.style.left=`calc(${c*100/Sz}% + 1px)`;
            cl.style.top=`calc(${r*100/Sz}% + 1px)`;
            cl.textContent=t.val;
            B.appendChild(cl);
        }
    }
    uS();
}
function stT(theme){
    if(theme==="dk"){
        document.documentElement.dataset.theme="dk";
    }else{
        document.documentElement.removeAttribute("data-theme");
    }
}
window.addEventListener("message",e=>{
    if(e.data?.type!=="fluetro-theme")return;
    stT(e.data.theme);
});
const svT=localStorage.getItem("th");
if(svT==="dk")stT("dk");
else stT("lt");
function nG(){
    scr=0;
    go=false;
    mv=false;
    wn=false;
    clO();
    crB();
    B.style.setProperty("--cols",Sz);
    sT();
    sT();
    rd();
}
rB.addEventListener("click",nG);
function mvL(row){
    let rw=row.filter(x=>x!==null);
    for(let i=0;i<rw.length-1;i++){
        if(rw[i].val===rw[i+1].val){
            rw[i]={
                id:rw[i].id,
                val:rw[i].val*2,
                merge:[rw[i].id,rw[i+1].id]
            };
            scr+=rw[i].val;
            rw.splice(i+1,1);
        }
    }
    while(rw.length<Sz)rw.push(null);
    bd.flat().forEach(t=>{
        if(t)t.new=false;
    });
    return rw;
}
function mvR(row){
    return mvL([...row].reverse()).reverse();
}
function mvU(){
    for(let c=0;c<Sz;c++){
        let col=[];
        for(let r=0;r<Sz;r++)col.push(bd[r][c]);
        col=mvL(col);
        for(let r=0;r<Sz;r++)bd[r][c]=col[r];
    }
}
function mvD(){
    for(let c=0;c<Sz;c++){
        let col=[];
        for(let r=0;r<Sz;r++)col.push(bd[r][c]);
        col=mvR(col);
        for(let r=0;r<Sz;r++)bd[r][c]=col[r];
    }
}
function mvB(dir){
    const o=JSON.stringify(bd.map(r=>r.map(t=>t?t.val:0)));
    if(dir==="left"){
        for(let r=0;r<Sz;r++)bd[r]=mvL(bd[r]);
    }else if(dir==="right"){
        for(let r=0;r<Sz;r++)bd[r]=mvR(bd[r]);
    }else if(dir==="up"){
        mvU();
    }else if(dir==="down"){
        mvD();
    }
    const n=JSON.stringify(bd.map(r=>r.map(t=>t?t.val:0)));
    if(o===n)return false;
    sT();
    rd();
    checkG();
    return true;
}
function cM(){
    if(eC().length>0)return false;
    for(let r=0;r<Sz;r++){
        for(let c=0;c<Sz;c++){
            if(c<Sz-1&&bd[r][c]&&bd[r][c+1]&&bd[r][c].val===bd[r][c+1].val)return false;
            if(r<Sz-1&&bd[r][c]&&bd[r+1][c]&&bd[r][c].val===bd[r+1][c].val)return false;
        }
    }
    return true;
}
function cW(){
    for(let r=0;r<Sz;r++){
        for(let c=0;c<Sz;c++){
            if(bd[r][c]&&bd[r][c].val===2048)return true;
        }
    }
    return false;
}
function shW(){
    ovi.textContent="🎉";
    ovt.textContent="You reached 2048!";
    ovp.textContent="Congratulations!";
    ov.classList.add("open");
}
function shL(){
    ovi.textContent="😵";
    ovt.textContent="Game Over";
    ovp.textContent="No more moves!";
    ov.classList.add("open");
}
function clO(){
    ov.classList.remove("open");
}
function checkG(){
    if(cW()){
        wn=true;
        go=true;
        shW();
        return;
    }
    if(cM()){
        go=true;
        shL();
    }
}
document.addEventListener("keydown",e=>{
    const k={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down",w:"up",a:"left",s:"down",d:"right"}[e.key];
    if(!k||go||mv)return;
    e.preventDefault();
    mv=true;
    if(!mvB(k)){
        mv=false;
        return;
    }
    if(scr>bs){
        bs=scr;
        localStorage.setItem("fn-bs",bs);
    }
    setTimeout(()=>{
        mv=false;
    },180);
});
dB.addEventListener("click",e=>{
    e.stopPropagation();
    dM.classList.toggle("open");
});
document.addEventListener("click",e=>{
    if(!dM.contains(e.target)&&!dB.contains(e.target)){
        dM.classList.remove("open");
    }
});
dM.querySelectorAll("button").forEach(x=>{
    x.addEventListener("click",()=>{
        const d=dif[x.dataset.difficulty];
        Sz=d.sz;
        dM.classList.remove("open");
        nG();
    });
});
ng.addEventListener("click",nG);
nG();