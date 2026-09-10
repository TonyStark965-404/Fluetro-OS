const bE=document.getElementById("b");
const mE=document.getElementById("mc");
const tE=document.getElementById("tim");
const rB=document.getElementById("r");
const dB=document.getElementById("difb");
const dM=document.getElementById("difmen");
let sz=9;
let mn=10;
let b=[];
let go=false;
let gs=false;
let fl=0;
let tm=0;
let ti=null;
const dif={
    beginner:{sz:9,mn:10,wid:520},
    intermediate:{sz:16,mn:40,wid:600},
    expert:{sz:22,mn:80,wid:650}
};
function cb(){
    b=[];
    for(let r=0;r<sz;r++){
        let br=[];
        for(let c=0;c<sz;c++){
            br.push({mine:false,revealed:false,flagged:false,adjacent:0});
        }
        b.push(br);
    }}
function pm(){
    let p=0;
    while(p<mn){
        let r=Math.floor(Math.random()*sz);
        let c=Math.floor(Math.random()*sz);
        if(b[r][c].mine)continue;
        b[r][c].mine=true;
        p++;
    }}
function cn(){
    for(let r=0;r<sz;r++){
        for(let c=0;c<sz;c++){
            if(b[r][c].mine)continue;
            let n=0;
            for(let rr=r-1;rr<=r+1;rr++){
                for(let cc=c-1;cc<=c+1;cc++){
                    if(rr>=0&&rr<sz&&cc>=0&&cc<sz&&b[rr][cc].mine)n++;
                }
            }
            b[r][c].adjacent=n;
        }
    }
}
function rb(){
    bE.innerHTML="";
    bE.style.gridTemplateColumns=`repeat(${sz},1fr)`;
    const gw=document.querySelector(".gwin");
    gw.style.width=`min(${wWid}px,92vw)`;
    for(let r=0;r<sz;r++){
        for(let c=0;c<sz;c++){
            const ce=document.createElement("div");
            const d=b[r][c];
            ce.classList.add("cll");
            if(d.revealed){
                ce.classList.add("revealed");
                if(d.mine)ce.textContent="💣";
                else if(d.adjacent>0)ce.textContent=d.adjacent;
            }else if(d.flagged){
                ce.classList.add("flagged");
                ce.textContent="🚩";
            }
            ce.addEventListener("click",()=>rc(r,c));
            ce.addEventListener("contextmenu",e=>{
                e.preventDefault();
                tf(r,c);
            });
            bE.appendChild(ce);
        }
    }
    mE.textContent=String(mn-fl).padStart(3,"0");
}
function rc(r,c){
    if(go)return;
    const d=b[r][c];
    if(d.revealed||d.flagged)return;
    if(!gs){
        gs=true;
        st();
    }
    d.revealed=true;
    if(d.mine){
        go=true;
        stp();
        rm();
        rB.textContent="😵";
        return;
    }
    if(d.adjacent===0)re(r,c);
    cw();
    rb();
}
function re(r,c){
    for(let rr=r-1;rr<=r+1;rr++){
        for(let cc=c-1;cc<=c+1;cc++){
            if(rr<0||rr>=sz||cc<0||cc>=sz)continue;
            const d=b[rr][cc];
            if(!d.revealed&&!d.mine&&!d.flagged){
                d.revealed=true;
                if(d.adjacent===0)re(rr,cc);
            }}}}
function tf(r,c){
    if(go)return;
    const d=b[r][c];
    if(d.revealed)return;
    if(!d.flagged&&fl>=mn)return;
    d.flagged=!d.flagged;
    fl+=d.flagged?1:-1;
    rb();
}
function rm(){
    for(const r of b){
        for(const d of r){
            if(d.mine)d.revealed=true;
        }
    }
    rb();}
function cw(){
    for(const r of b){
        for(const d of r){
            if(!d.mine&&!d.revealed)return;
        }}
    go=true;
    stp();
    rB.textContent="😎";
}
function st(){
    ti=setInterval(()=>{
        tm++;
        tE.textContent=String(tm).padStart(3,"0");
    },1000);
}
function stp(){
    clearInterval(ti);
}
function ng(){
    stp();
    tm=0;
    fl=0;
    go=false;
    gs=false;
    tE.textContent="000";
    rB.textContent="🙂";
    cb();
    pm();
    cn();
    rb();
}
dB.addEventListener("click",e=>{
    e.stopPropagation();
    dM.classList.toggle("open");
});
let wWid=520;
dM.querySelectorAll("button").forEach(x=>{
    x.addEventListener("click",()=>{
        const d=dif[x.dataset.difficulty];
        sz=d.sz;
        mn=d.mn;
        wWid=d.wid;
        dM.classList.remove("open");
        ng();
    });
});
document.addEventListener("click",e=>{
    if(!dM.contains(e.target)&&!dB.contains(e.target)){
        dM.classList.remove("open");
    }
});
window.addEventListener("message",e=>{
    if(e.data?.type!=="fluetro-theme")return;

    if(e.data.theme==="dk"){
        document.documentElement.dataset.theme="dk";
    }else{
        document.documentElement.dataset.theme="light";
    }
});
rB.addEventListener("click",ng);
ng();
