document.addEventListener("DOMContentLoaded", async () => {
    lucide.createIcons();
    let hr24tgl = localStorage.getItem("24clc") === "true";
    function updcl() {
        const dkclock = document.getElementById("dkclock");
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: !hr24tgl }).replace(/\s?(AM|PM)/i, "");
        const dktime = now.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" }) + " " + now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: !hr24tgl }).replace(/\s?(AM|PM)/i, "");
        const clock = document.getElementById("clock");
        clock.textContent = timeString;
        dkclock.textContent = dktime;
    }
    updcl();
    applyhigh();
    setInterval(updcl, 1000);
    document.addEventListener("contextmenu", (e) => {
        if (e.target.closest('input, textarea, [contenteditable="true"]')) {
            return;
        }

        e.preventDefault();
    });
    const lB = document.getElementById("lb");
    const lS = document.getElementById("ls");
    const BT = document.getElementById("bt");
    const dT = document.getElementById("dt");
    const ClPl = document.getElementById("clpl");
    const ClB = document.getElementById("dkclock");
    const CD = document.getElementById("cd");
    const Mon = document.getElementById("mon");
    const Days = document.getElementById("days");
    const Hr = document.getElementById("hr");
    const Min = document.getElementById("min");
    const Sec = document.getElementById("sec");
    const ADt = document.getElementById("adt");
    const Pm = document.getElementById("pm");
    const Nm = document.getElementById("nm");
    const pB = document.querySelector(".pa");
    const pP = document.querySelector(".dtp");
    const nB = document.querySelector(".np");
    const nP = document.querySelector(".nav");
    const ed = document.getElementById("ed");
    const ope = document.getElementById("ope");
    const de = document.getElementById("de");
    const conm = document.querySelector(".conm");
    const fied = document.querySelector(".files-editor");
    const fib = document.querySelector(".fib");
    const navaddbar = document.querySelector(".tob");
    let Fbeiedit = null
    const editorTxt = document.getElementById("editorTxt");
    const editFnm = document.getElementById("editFnm");
    const editsv = document.getElementById("editsv");
    let pharr = [];
    let phIn = -1;
    const photoPrev = document.getElementById("photoPrev");
    const photoNxt = document.getElementById("photoNext");
    const aibi = document.getElementById("aibif");
    const isFirstRun = localStorage.getItem("fluetroInitialized") === null;
    let CaD = new Date();
    if (BT) {
        setTimeout(() => {
            BT.classList.add("hd");
            wP.classList.add("open");
            setTimeout(() => {
                BT.style.display = "none"
                wP.classList.remove("open");
            }, 2500)
        }, 5000);
    }
    const sndbtn = document.getElementById("sndbtn");
    const volbar = document.getElementById("volbar");
    const FluetroAudio = (() => {
        const srcs = new Map();
        let vol = Math.max(0, Math.min(100,
            Number(localStorage.getItem("fluetroVol") ?? 100)
        ));
        let mute = localStorage.getItem("fluetroMT") === "true";
        function apply(el, base) {
            el.volume = base * vol / 100;
            el.muted = mute;
        }
        function reg(el, base = 1) {
            srcs.set(el, base);
            apply(el, base);
            return el;
        }
        function sync() {
            srcs.forEach((base, el) => apply(el, base));
            document.querySelectorAll("audio, video").forEach(el => {
                if (!srcs.has(el)) reg(el);
            });
            volbar.value = vol;
            const icon = mute || vol === 0
                ? "volume-x"
                : vol <= 33
                    ? "volume"
                    : vol <= 66
                        ? "volume-1"
                        : "volume-2";
            sndbtn.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons({ nodes: [sndbtn] });
            sndbtn.classList.toggle("active", !mute && vol > 0);
            sndbtn.setAttribute("aria-pressed", String(mute || vol === 0));
            localStorage.setItem("fluetroVol", vol);
            localStorage.setItem("fluetroMT", mute);
        }
        function setVol(v) {
            vol = Math.max(0, Math.min(100, Number(v) || 0));
            mute = false;
            sync();
        }
        function togMT() {
            mute = !mute;
            sync();
        }
        new MutationObserver(() => {
            document.querySelectorAll("audio, video").forEach(el => {
                if (!srcs.has(el)) reg(el);
            });
        }).observe(document.body, {
            childList: true,
            subtree: true
        });
        volbar.addEventListener("input", () => setVol(volbar.value));
        sndbtn.addEventListener("click", togMT);
        document.addEventListener("keydown", e => {
            if (e.ctrlKey && !e.altKey && !e.shiftKey &&
                e.key.toLowerCase() === "m") {
                e.preventDefault();
                togMT();
            }
        });
        sync();
        return { reg, setVol, togMT };
    })();
    const acc = {
        "assets/wallpapers/wallpaper1.jpg": { accent: "#8e63a9", accent2: "#d3b8e3" }, "assets/wallpapers/wallpaper3.jpg": { accent: "#684d39", accent2: "#c9a98c" }, "assets/wallpapers/wallpaper4.jpg": { accent: "#6274a1", accent2: "#b4c2e5" }
    };
    function sAc(wall = localStorage.getItem("fall") || "assets/wallpapers/wallpaper2.jpg") {
        const act = acc[wall];
        if (localStorage.getItem("accMode") === "custom") {
            return;
        }
        if (act) {
            document.documentElement.style.setProperty("--accent", act.accent);
            document.documentElement.style.setProperty("--accent2", act.accent2);
        } else {
            document.documentElement.style.removeProperty("--accent");
            document.documentElement.style.removeProperty("--accent2");
        }

    }
    function updClPl() {
        const now = new Date();
        CD.textContent = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });
        const secs = now.getSeconds();
        const mins = now.getMinutes();
        const hrs = now.getHours();
        const secang = secs * 6;
        const minang = mins * 6 + secs * 0.1;
        const hrang = (hrs % 12) * 30 + mins * 0.5;
        Sec.style.transform = `translateX(-50%) rotate(${secang}deg)`;
        Min.style.transform = `translateX(-50%) rotate(${minang}deg)`;
        Hr.style.transform = `translateX(-50%) rotate(${hrang}deg)`;
        ADt.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: !hr24tgl });
    }
    function renCal() {
        const yr = CaD.getFullYear();
        const mont = CaD.getMonth();
        Mon.textContent = CaD.toLocaleDateString([], { month: "long", year: "numeric" });
        Days.innerHTML = "";
        const fD = new Date(yr, mont, 1).getDay();
        const dIm = new Date(yr, mont + 1, 0).getDate();
        const dIPm = new Date(yr, mont, 0).getDate();
        const td = new Date();
        for (let i = fD - 1; i >= 0; i--) {
            const day = document.createElement("div");
            day.className = "day om";
            day.textContent = dIPm - i;
            Days.appendChild(day);
        }
        for (let dN = 1; dN <= dIm; dN++) {
            const day = document.createElement("div");
            day.className = "day";
            day.textContent = dN;
            if (dN === td.getDate() && mont === td.getMonth() && yr === td.getFullYear()) {
                day.classList.add("td");
            }
            Days.appendChild(day);
        }
        const fc = fD + dIm;
        const rc = 42 - fc;
        for (let nD = 1; nD <= rc; nD++) {
            const day = document.createElement("div");
            day.className = "day om";
            day.textContent = nD;
            Days.appendChild(day);
        }
    }
    ClB.addEventListener("click", (event) => {
        event.stopPropagation();
        const wO = ClPl.classList.contains("open");
        clPU();
        if (!wO) {
            ClPl.classList.add("open");
            ClB.classList.add("active");
            updClPl();
            renCal();
        }
    });
    Pm.addEventListener("click", (event) => {
        event.stopPropagation();
        CaD.setDate(1);
        CaD.setMonth(CaD.getMonth() - 1);
        renCal();
    });
    Nm.addEventListener("click", (event) => {
        event.stopPropagation();
        CaD.setDate(1);
        CaD.setMonth(CaD.getMonth() + 1);
        renCal();
    });
    setInterval(updClPl, 1000);
    updClPl();
    if (lB && lS && dT) {
        lB.addEventListener("click", () => {
            clPU();
            SysSounds.play("login");

            dT.classList.add("login");

            requestAnimationFrame(() => {
                lS.classList.add("login");
            });
            setTimeout(() => {
                lS.classList.add("inactive");
            }, 550);
            if (isFirstRun) {
                setTimeout(() => {
                    const guideButton = document.querySelector(
                        '.dk .app[data-app="guide"]'
                    );
                    if (guideButton) {
                        guideButton.click();
                        localStorage.setItem("fluetroInitialized", "true");
                    }
                }, 1100);
            }
        });
    }
    const CcB = document.getElementById("settings");
    const Cc = document.getElementById("settings-panel");
    const wP = document.getElementById("wpicker");
    const WtB = document.getElementById("wb");
    const WtP = document.getElementById("wtp");
    const wtt = document.getElementById("wtt");
    const wtco = document.getElementById("wtco");
    const wtic = document.querySelector(".wtic");
    const wtu = document.querySelector(".wtu");
    const wtr = document.getElementById("wtr");
    const wthloc = document.querySelector(".wthloc");
    const wthcit = document.getElementById("wth-city");
    const wthcity = document.getElementById("wth-cit");
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
                lat: pl.latitude, lon: pl.longitude, name: pl.name, country: pl.country
            };
        } catch (error) {
            console.error("Location error:", error);
            return null;
        }
    }
    async function fetchWeather(lat, lon, locationName) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Weather request failed")
            }
            const da = await res.json();
            const tem = Math.round(da.current.temperature_2m);
            const cd = da.current.weather_code;
            const cond = {
                0: ["☀️", "Clear"],
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
                99: ["⛈️", "Thunderstorm"]
            };
            const [ico, con] = cond[cd] || ["🌡️", "Unknown"];
            wtt.textContent = `${tem}°C`;
            wtic.textContent = ico;
            wtco.textContent = con;
            wthloc.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
     width="12"
     height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="none"/></svg>${locationName}`;
            WtB.textContent = `${ico} ${tem}°C ~ ${con}`
            const upd = new Date(da.current.time);
            wtu.textContent = `Updated:${upd.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
        } catch (error) {
            console.error("WTH error:", error);
            wtco.textContent = error.message;
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
            wthcity.value = wthcit.value;
        });
    }
    if (wthcity) {
        wthcity.addEventListener("change", async () => {
            const cit = wthcity.value.trim();
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
            wthcit.value = wthcity.value;
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
    function clPU() {
        Cc?.classList.remove("open");
        wP.classList.remove("open");
        ClPl?.classList.remove("open");
        WtP?.classList.remove("open");
        lM.classList.remove("open");
        CcB?.classList.remove("active");
        WtB?.classList.remove("active");
        ClB?.classList.remove("active");
        loB?.classList.remove("active");
        sugg.classList.remove("show");
        search.value = "";
        search.blur();
    }
    if (WtB && WtP) {
        WtB.addEventListener("click", () => {
            const wasO = WtP.classList.contains("open");
            clPU();
            if (!wasO) {
                WtP.classList.add("open");
                WtB.classList.add("active");
            }
        })
    }
    if (CcB && Cc) {
        CcB.addEventListener("click", () => {
            const wasO = Cc.classList.contains("open");
            clPU();
            if (!wasO) {
                Cc.classList.add("open");
                CcB.classList.add("active");
            }
        });
    }
    function syncMsTheme() {
        if (!gF?.contentWindow) return;
        const dk = document.body.classList.contains("dark-mode");
        gF.contentWindow.postMessage({
            type: "fluetro-theme",
            theme: dk ? "dk" : "light"
        }, "*");
        binC.contentWindow.postMessage({
            type: "fluetro-theme",
            theme: dk ? "dk" : "light"
        }, "*");
    }
    const tT = document.getElementById("tt");
    const tTs = document.getElementById("thmit");
    if (tT) {
        tT.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            tT.classList.toggle("active");
            if (tT.classList.contains("active")) tTs.classList.add("on");
            else tTs.classList.remove("on");
            updSwitches();
            const iD = document.body.classList.contains("dark-mode");
            localStorage.setItem("them", iD ? "dark" : "light");
            syncMsTheme();
        });
    }
    if (tTs) {
        tTs.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            tTs.classList.toggle("on");
            updSwitches();
            if (tTs.classList.contains("on")) tT.classList.add("active");
            else tT.classList.remove("active");
            const iD = document.body.classList.contains("dark-mode");
            localStorage.setItem("them", iD ? "dark" : "light");
            syncMsTheme();
        });
    }
    window.addEventListener("message", e => {
        if (e.data?.type !== "fluetro-toggle-theme") return;
        tT?.click();
        if (e.data?.type === "fluetro-theme-request") {
            syncMsTheme();
        }
    });
    const wOp = document.querySelectorAll(".wp-option");
    const wCus = document.getElementById("custwall");
    const CSwrap = document.getElementById("custwallwrap")
    const savedCustomWall = localStorage.getItem("customWall");
    if (savedCustomWall) {
        CSwrap.dataset.wallpaper = savedCustomWall;
        CSwrap.style.backgroundImage = `url("${savedCustomWall}")`;
    }
    wOp.forEach(option => {
        option.addEventListener("click", () => {
            const wall = option.dataset.wallpaper;
            if (!wall) return;
            wOp.forEach(opt => opt.classList.toggle("sel", opt.dataset.wallpaper === wall));
            dT.style.setProperty("--nxt-wall", `url("${wall}")`);
            dT.classList.add("wp-ch");
            sAc(wall);
            if (wall === CSwrap.dataset.wallpaper) {
                smolautoacc.classList.add("dis");
                autoAccBtn.classList.add("dis");
            } else {
                smolautoacc.classList.remove("dis");
                autoAccBtn.classList.remove("dis");
            }
            setTimeout(() => {
                dT.style.backgroundImage = `url("${wall}")`;
                dT.classList.remove("wp-ch");
                localStorage.setItem("fall", wall);
            }, 400);
            wCus.addEventListener("change", () => {
                setAccMode("custom");
                const fl = wCus.files[0];
                if (!fl) return;
                if (!fl.type.startsWith("image/")) {
                    alert("Please select an image file.");
                    return;
                }
                if (fl.size > 2 * 1024 * 1024) {
                    alert("Please select an image smaller than 2MB.");
                    return
                }
                const rd = new FileReader();
                rd.onload = () => {
                    dT.style.setProperty("--nxt-wall", `url("${rd.result}")`);
                    dT.classList.add("wp-ch");
                    setTimeout(() => {
                        wOp.forEach(opt => opt.classList.remove("sel"));
                        CSwrap.classList.add("sel");
                        dT.style.backgroundImage = `url("${rd.result}")`;
                        dT.classList.remove("wp-ch");
                        localStorage.setItem("fall", rd.result);
                        localStorage.setItem("customWall", rd.result);
                        CSwrap.dataset.wallpaper = rd.result;
                        CSwrap.style.backgroundImage = `url("${rd.result}")`;
                        smolautoacc.classList.add("dis");
                        autoAccBtn.classList.add("dis");
                    }, 400);
                }
                rd.readAsDataURL(fl)
            })
        });
    });
    dT.addEventListener("click", (event) => {
        if (
            !event.target.closest("#settings-panel") &&
            !event.target.closest("#wpicker") &&
            !event.target.closest("#settings") &&
            !event.target.closest("#wallb") &&
            !event.target.closest("#clpl") &&
            !event.target.closest("#wtp") &&
            !event.target.closest("#wb") &&
            !event.target.closest(".sesec")
        ) {
            clPU();
        }
    })
    dT.addEventListener("mousedown", (event) => {
        if (event.target.closest(".appwin")) {
            return;
        }
        document.querySelectorAll(".appwin").forEach(win => {
            focWin(null);
        });
    });
    const sOB = document.getElementById("so");
    const sOS = document.getElementById("sos")
    if (sOB) {
        sOB.addEventListener("click", () => {
            clPU();
            SysSounds.play("logout");
            appWins.forEach(win => {
                win.classList.remove("open");
                win.classList.remove("minimized");
                win.classList.remove("maximized");
                win.classList.remove("focused");
                const app = document.querySelector(`.app[data-app="${win.dataset.app}"]`);
                app?.classList.remove("rng");
                app?.classList.remove("rngmin");
                if (win === ghW && ghA) {
                    gF.src = "";
                    gV.classList.remove("playing");
                    gBa?.classList.remove("show");
                    document.querySelector(".gawc").classList.remove("playing");
                }
            })
            dT.classList.remove("login");
            sOS.classList.add("active");
            requestAnimationFrame(() => {
                lS.style.visibility = "visible";
            });
            setTimeout(() => {
                sOS.classList.remove("active");
                lS.classList.remove("login");
                lS.classList.remove("inactive");
            }, 500);
        }, 900);
    }
    const rOB = document.getElementById("rst");
    const rOS = document.getElementById("rds")
    if (rOB) {
        rOB.addEventListener("click", () => {
            clPU();
            appWins.forEach(win => {
                win.classList.remove("open");
                win.classList.remove("minimized");
                win.classList.remove("maximized");
                win.classList.remove("focused");
                const app = document.querySelector(`.app[data-app="${win.dataset.app}"]`);
                app?.classList.remove("rng");
                app?.classList.remove("rngmin");
                if (win === ghW && ghA) {
                    gF.src = "";
                    gV.classList.remove("playing");
                    gBa?.classList.remove("show");
                    document.querySelector(".gawc").classList.remove("playing");
                }
            })
            dT.classList.remove("login");
            rOS.classList.add("active");
            requestAnimationFrame(() => {
                lS.style.visibility = "visible";
            });
            setTimeout(() => {
                rOS.classList.remove("active");
                setTimeout(() => {
                    location.reload();
                }, 500)
            }, 1500);
        }, 900);
    }
    const sDB = document.getElementById("sd")
    const sDS = document.getElementById("sds")
    if (sDB && sDS) {
        sDB.addEventListener("click", () => {
            clPU();
            SysSounds.play("shutdown");
            dT.classList.remove("login");
            setTimeout(() => {
                sDS.classList.add("active");
            }, 450);
            setTimeout(() => {
                const sdsp = sDS.querySelector(".sdsp");
                const txt = sDS.querySelector("p");
                if (sdsp) sdsp.style.display = "none";
                if (txt) txt.textContent = "";
                window.close();
            }, 1500);
        });
    }
    const lM = document.getElementById("lm");
    const aF = document.getElementById("af");
    const loB = document.getElementById("logo");
    const sI = document.getElementById("sysinfo");
    const sC = document.getElementById("sysclo");
    const OK = document.getElementById("ok");
    const OK2 = document.querySelector(".ok2");
    const OK3 = document.querySelector(".ok3");
    const OK4 = document.querySelector(".ok4");
    const ost = document.querySelector(".ost");
    const pprdm = document.getElementById("pprdm");
    if (loB && lM) {
        loB.addEventListener("click", (event) => {
            event.stopPropagation();
            const waO = lM.classList.contains("open");
            clPU();
            if (!waO) {
                lM.classList.add("open");
                loB.classList.add("active");
            }
        });
    }
    if (aF && sI) {
        aF.addEventListener("click", () => {
            lM.classList.remove("open");
        })
    }
    if (ost) {
        ost.addEventListener("click", () => {
            clPU();
        })
    }
    if (sC) {
        sC.addEventListener("click", cSI);
    }
    if (OK) {
        OK.addEventListener("click", cSI);
    }
    function cSI() {
        sI.classList.remove("open");
    }
    const testWin = document.getElementById("win");
    const appWins = document.querySelectorAll(".appwin");
    const nA = document.querySelector('[data-app="memo"]')
    if (nA && testWin) {
        nA.addEventListener("click", () => {
            testWin.classList.add("open")
            testWin.classList.remove("minimized");
            nA.classList.add("rng");
            nA?.classList.remove("rngmin");
            focWin(testWin);
        });
    }
    function focWin(win) {
        appWins.forEach(app => {
            app.classList.remove("focused");
            applyhigh();
        });
        if (win) {
            win.classList.add("focused");
        }
    }
    function crWin(win) {
        if (!win) {
            return;
        }
        const dA = document.querySelector(`.app[data-app="${win.dataset.app}"]`);
        const Cl = win.querySelector(".cl");
        const Min = win.querySelector(".mini");
        const Max = win.querySelector(".max");
        const TB = win.querySelector(".wintit");
        win.addEventListener("mousedown", () => {
            focWin(win);
        });
        dA.addEventListener("click", () => {
            focWin(win);
        })
        if (Cl) {
            Cl.addEventListener("click", (event) => {
                event.stopPropagation();
                win.classList.remove("open");
                win.classList.remove("minimized");
                dA?.classList.remove("rng");
                if (win === ghW && ghA) {
                    gF.src = "";
                    gV.classList.remove("playing");
                    gBa?.classList.remove("show");
                    document.querySelector(".gawc").classList.remove("playing");
                }
                if (win === WW && wA) {
                    wA.classList.remove("rng");
                    wA.classList.remove("sh");
                }
                if (win === noW && wA) {
                    wA.classList.remove("rng");
                    wA.classList.remove("sh");
                }
                if (win === ntW && wA) {
                    wA.classList.remove("rng");
                    wA.classList.remove("sh");
                }
                if (win === suW && wA) {
                    wA.classList.remove("rng");
                    wA.classList.remove("sh");
                }
                if (win === phW && phA) {
                    phA.classList.remove("rng");
                    phA.classList.remove("sh");
                }
                if (win === guW && guA) {
                    guA.classList.remove("rng");
                    guA.classList.remove("sh");
                }
                if (win === fW) {
                    fHs = [];
                    fFt = [];
                    fC = "Home";
                }
                if (win === mpW && mpA) {
                    audio.currentTime = 0;
                    seekBar.value = 0;
                    audio.pause();
                };
                if (win === aW && aA) {
                    aibi.src = "";
                }
                if (win === pyW && pyA) {
                    pyF.src = "";
                }
                if (win === vpW && vpA) {
                    vpA.classList.remove("rng");
                    vpA.classList.remove("sh");
                    vidwrap.classList.remove("playing");
                    vidreal.currentTime = 0;
                    vidreal.pause();
                };
            });
        }
        if (Min) {
            Min.addEventListener("click", (event) => {
                event.stopPropagation();
                if (win === WW || win === noW || win === ntW || win === suW) return;
                win.classList.add("minimized");
                dA.classList.remove("rng");
                dA?.classList.add("rngmin");
            });
        }
        if (Max) {
            Max.addEventListener("click", (event) => {
                if (win === cW || win === WW || win === noW || win === ntW || win === suW) return;
                event.stopPropagation();
                win.classList.toggle("maximized")
                win.classList.add("animate");
                setTimeout(() => {
                    win.classList.remove("animate")
                }, 360);
                if (win.classList.contains("maximized")) {
                    Max.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
     width="16"
     height="16"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
    <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
    <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
    <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
    <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
</svg>`;
                } else {
                    Max.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
        <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
        <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
        <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
    </svg>`;;
                }
            })
        };
        TB.addEventListener("dblclick", (event) => {
            if (!dbltitop) return;
            if (win === cW || win === WW || win === noW || win === ntW || win === suW) return;
            event.stopPropagation();
            win.classList.toggle("maximized")
            win.classList.add("animate");
            setTimeout(() => {
                win.classList.remove("animate")
            }, 360);
            if (win.classList.contains("maximized")) {
                Max.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
     width="16"
     height="16"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
    <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
    <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
    <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
    <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
</svg>`;
            } else {
                Max.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
        <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
        <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
        <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
    </svg>`;;
            }
        })
        let dr = false;
        let drOX = 0;
        let drOY = 0;
        if (TB) {
            TB.addEventListener("mousedown", (event) => {
                if (event.target.closest(".winctrl")) {
                    return;
                }
                if (win.classList.contains("maximized")) {
                    return;
                }
                dr = true;
                const Prec = dT.getBoundingClientRect();
                const rec = win.getBoundingClientRect();
                drOX = event.clientX - rec.left;
                drOY = event.clientY - rec.top;
                win.style.left = `${rec.left - Prec.left}px`;
                win.style.top = `${rec.top - Prec.top}px`;
                focWin(win);
            });
            document.addEventListener("mousemove", (event) => {
                if (!dr) {
                    return;
                }
                win.style.left = `${event.clientX - drOX}px`;
                win.style.top = `${event.clientY - drOY}px`;
            });
            document.addEventListener("mouseup", () => {
                dr = false;
            });
        }
        let rsz = false;
        let rsD = "";
        let stX = 0;
        let stY = 0;
        let stL = 0;
        let stT = 0;
        let stW = 0;
        let stH = 0;
        const RSZ = 8;
        const styles = window.getComputedStyle(win);
        const minW = parseFloat(styles.minWidth) || 360;
        const minH = parseFloat(styles.minHeight) || 510;
        function gRsD(event) {
            if (win.classList.contains("maximized")) {
                return "";
            }
            const rect = win.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const l = x <= RSZ;
            const r = x >= rect.width - RSZ;
            const t = y <= RSZ;
            const b = y >= rect.height - RSZ;
            if (t && l) return "tl";
            if (t && r) return "tr";
            if (b && l) return "bl";
            if (b && r) return "br";
            if (l) return "l";
            if (r) return "r";
            if (t) return "t";
            if (b) return "b";
            return "";
        }
        win.addEventListener("mousemove", (event) => {
            if (win === cW || win === WW || win === noW || win === ntW || win === mpW || win === suW) {
                win.style.cursor = "";
                return;
            }
            if (rsz) return;
            const d = gRsD(event);
            const cursors = {
                t: "ns-resize",
                b: "ns-resize",
                l: "ew-resize",
                r: "ew-resize",
                tl: "nwse-resize",
                br: "nwse-resize",
                tr: "nesw-resize",
                bl: "nesw-resize"
            };
            win.style.cursor = cursors[d] || "";
        });
        win.addEventListener("mousedown", (event) => {
            if (event.button !== 0) return;
            if (win === cW || win === WW || win === noW || win === ntW || win === mpW || win === suW) {
                win.style.cursor = "";
                return;
            }
            const d = gRsD(event);
            if (!d) return;
            event.preventDefault();
            event.stopPropagation();
            rsz = true;
            rsD = d;
            const Prec = dT.getBoundingClientRect();
            const rect = win.getBoundingClientRect();
            win.style.left = `${rect.left - Prec.left}px`;
            win.style.top = `${rect.top - Prec.top}px`;
            rsz = true;
            rsD = d;
            stX = event.clientX;
            stY = event.clientY;
            stL = rect.left - Prec.left;
            stT = rect.top - Prec.top;
            stW = rect.width;
            stH = rect.height;
            win.classList.add("resizing");
            if (win.querySelector("iframe")) {
                document.body.classList.add("resizing-iframe");
            }
            focWin(win);
        });
        document.addEventListener("mousemove", (event) => {
            if (!rsz) return;
            if (win === cW || win === WW || win === noW || win === ntW || win === mpW || win === suW) {
                win.style.cursor = "";
                return;
            }
            if (event.buttons === 0) {
                rsz = false;
                rsD = "";
                win.classList.remove("resizing");
                win.style.cursor = "";
                if (win.querySelector("iframe")) {
                    document.body.classList.remove("resizing-iframe");
                }
                return;
            }
            const dx = event.clientX - stX;
            const dy = event.clientY - stY;
            let l = stL;
            let t = stT;
            let w = stW;
            let h = stH;
            if (rsD.includes("r")) {
                w = Math.max(minW, stW + dx);
            }
            if (rsD.includes("b")) {
                h = Math.max(minH, stH + dy);
            }
            if (rsD.includes("l")) {
                w = Math.max(minW, stW - dx);
                l = stL + (stW - w);
            }
            if (rsD.includes("t")) {
                h = Math.max(minH, stH - dy);
                t = stT + (stH - h);
            }
            win.style.left = `${l}px`;
            win.style.top = `${t}px`;
            win.style.width = `${w}px`;
            win.style.height = `${h}px`;
        });
        document.addEventListener("mouseup", () => {
            if (!rsz) return;
            rsz = false;
            rsD = "";
            win.classList.remove("resizing");
            win.style.cursor = "";
            if (win.querySelector("iframe")) {
                document.body.classList.remove("resizing-iframe");
            }
        })
        document.addEventListener("blur", () => {
            if (!rsz) return;
            rsz = false;
            rsD = "";
            win.classList.remove("resizing");
            win.style.cursor = "";
            if (win.querySelector("iframe")) {
                document.body.classList.remove("resizing-iframe");
            }
        })
    }
    const note = document.getElementById("note");
    if (note) {
        if (localStorage.getItem("noteset") !== "true") {
            note.value = localStorage.getItem("memos") || "";
        }
        note.addEventListener("input", () => {
            localStorage.setItem("memos", note.value);
        });
    }
    const WW = document.getElementById("wipwin");
    const noW = document.getElementById("nowin");
    const ntW = document.getElementById("notwin");
    const cW = document.getElementById("cawin");
    const calD = document.getElementById("cadis");
    const calB = document.querySelectorAll("[dcal]");
    const phW = document.getElementById("picwin");
    const mpW = document.getElementById("mpwin");
    const mpA = document.querySelector('[data-app="mus"]');
    const vpW = document.getElementById("vidpwin");
    const vpA = document.querySelector(`[data-app="vid"]`);
    const vidreal = document.querySelector("media-theme-sutro video");
    const vidwrap = document.getElementById("videoplaying");
    let calVal = "0";
    let calP = null;
    let calO = null;
    let calW = false;
    function updCalc() {
        calD.textContent = calVal;
    }
    function cal(a, b, op) {
        switch (op) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "×":
                return a * b;
            case "÷":
                return b === 0 ? 0 : a / b;
            case "%":
                return (a / 100) * b;
            default:
                return b;
        }
    }
    function hCI(ty, val) {
        if (ty === "clear") {
            calVal = "0";
            calP = null;
            calO = null;
            calW = false;
            sAO(null);
            updCalc();
            return;
        }
        if (ty === "bksp") {
            if (!calW) {
                calVal = calVal.length > 1 ? calVal.slice(0, -1) : "0";
            }
            updCalc();
            return;
        }
        if (ty === "num") {
            if (calW) {
                calVal = val === "." ? "0." : val;
                calW = false;
            } else if (val === "." && calVal.includes(".")) { return; }
            else if (calVal === "0" && val !== ".") { calVal = val; }
            else {
                calVal += val;
            }
            updCalc()
        }
        if (ty === "op") {
            const cur = Number(calVal);
            if (calP !== null && calO && !calW) {
                calP = cal(calP, cur, calO);
                calVal = String(calP);
            }
            else {
                calP = cur;
            }
            calO = val;
            calW = true;
            sAO(val)
            updCalc();
            return;
        }
        if (ty === "eq") {
            if (calO === null || calP === null) {
                return;
            }
            const res = cal(calP, Number(calVal), calO);
            calVal = String(res);
            calP = null;
            calO = null;
            calW = true;
            sAO(null);
            updCalc();
        }
    }
<<<<<<< HEAD
    calB.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.getAttribute("dcal") === "op") {
                hCI("op", btn.getAttribute("data-op"));
            } else {
                hCI(btn.getAttribute("dcal"), btn.textContent);
            }
=======
    hCI(tp,val);
})
function sAO(op){
    calB.forEach(btn=>{
        btn.classList.remove("actop");
    })
    if(op){
        const btn=[...calB].find(b=>{
            return b.getAttribute("data-op")===op;
        });
        btn?.classList.add("actop");
    }
}
const pW=document.getElementById("pin");
const bW=document.getElementById("bin");
const painA = document.querySelector('[data-app="pain"]');
const calcA = document.querySelector('[data-app="cat"]');
const BrA=document.querySelector('[data-app="bro"]');
const aW=document.getElementById("ab");
const aA=document.querySelector(`[data-app="aib"]`);
const ghW=document.getElementById("gw");
const ghA=document.querySelector(`[data-app="gh"]`);
const gV=document.getElementById("gv");
const gF=document.getElementById("gframe");
const gBa=document.getElementById("gback");
const gCrs=document.querySelectorAll(".gcr");
const rG=document.getElementById("rg");
const rGN=document.getElementById("rgn");
const GN={din:"Dino Runner",es:"Surf",mc:"Minecraft Classic",ms:"Minesweeper", dir:"2048"};
const binC=document.getElementById("bf")
gBa?.classList.remove("show");
if(gF){
    gF.addEventListener("load",()=>{
        syncMsTheme();
    })
}
if(binC){
    binC.addEventListener("load",()=>{
        syncMsTheme();
    })
}
function uRG(){
    const lG=localStorage.getItem("lG");
    if (lG && GN[lG]){
        rGN.textContent=GN[lG];
    } else{
        rG.style.display="none";
    }
}
uRG();
if (ghA && ghW){
ghA.addEventListener("click", () => {
        ghW.classList.add("open");
        ghW.classList.remove("minimized");
        ghA.classList.add("rng");
        ghA.classList.remove("rngmin");
        focWin(ghW);
});}
if (painA && pW){
painA.addEventListener("click", () => {
        pW.classList.add("open")
        pW.classList.remove("minimized");
        painA.classList.add("rng");
        painA.classList.remove("rngmin");
        focWin(pW);
});}
if (BrA && bW){
BrA.addEventListener("click", () => {
        bW.classList.add("open")
        bW.classList.remove("minimized");
        BrA.classList.add("rng");
        BrA?.classList.remove("rngmin");
        focWin(bW);
});}
if (aA && aW){
aA.addEventListener("click", () => {
        aW.classList.add("open")
        aW.classList.remove("minimized");
        aA.classList.add("rng");
        aA?.classList.remove("rngmin");
        focWin(aW);
});}
if (calcA && cW){
calcA.addEventListener("click", () => {
        cW.classList.add("open")
        cW.classList.remove("minimized");
        calcA.classList.add("rng");
        calcA?.classList.remove("rngmin");
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
    syncMsTheme();
    const defwall="assets/wallpapers/wallpaper2.jpg";
    const wll=localStorage.getItem("fall")||defwall;
    if(wll){
        dT.style.backgroundImage=`url("${wll}")`;
        sAc(wll);
        wOp.forEach(opt => {
    opt.classList.toggle("sel", opt.dataset.wallpaper === wll);
});
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
gCrs.forEach(card=>{
    card.addEventListener("click",()=>{
        const gm=card.dataset.game;
        if(gm==="ms"){
            gF.src="./assets/apps/MineSweeper/index.html";
        } else if (gm==="mc"){
            gF.src="https://classic.minecraft.net";
        } else if(gm==="dir"){
            gF.src="./assets/apps/F2048/index.html";
        }
        else if(gm==="din"){
            gF.src="https://chromedino.com/embed/";
        }
        else {
            gF.src="https://threekho.github.io/edgesurf/";
        }
        document.querySelector(".gawc").classList.add("playing");
        gV.classList.add("playing");
        gBa?.classList.add("show");
        requestAnimationFrame(()=>{
            localStorage.setItem("lG",gm);
        uRG();
>>>>>>> 32c37b4f4b9834a9036076bd4b74153f5ed6117a
        })
    })
    document.addEventListener("keydown", e => {
        if (!cW.classList.contains("focused")) return;
        if (["INPUT", "TEXTAREA"].includes(e.target.tagName) || e.target.isContentEditable) return;
        let k = e.key;
        let tp = "num";
        let val = k;
        if (k === "*") {
            tp = "op";
            val = "×";
        }
        else if (k === "/") {
            val = "÷";
            tp = "op"
        }
        else if (["+", "-", "%", "×", "÷"].includes(k)) tp = "op";
        else if (k === "Enter" || k === "=") {
            tp = "eq";
            val = "=";
        }
        else if (k === "Backspace") tp = "bksp";
        else if (k === "Escape") tp = "clear";
        else if (/^[0-9.]/.test(k)) tp = "num";
        else return;
        e.preventDefault();
        const btn = [...calB].find(b => {
            const bT = b.getAttribute("dcal");
            const bV = b.textContent;
            return bT === tp && bV === val;
        })
        if (btn) {
            btn.classList.add("pressed");
            setTimeout(() => btn.classList.remove("pressed"), 100);
        }
        hCI(tp, val);
    })
    function sAO(op) {
        calB.forEach(btn => {
            btn.classList.remove("actop");
        })
        if (op) {
            const btn = [...calB].find(b => {
                return b.getAttribute("data-op") === op;
            });
            btn?.classList.add("actop");
        }
    }
    const pW = document.getElementById("pin");
    const pmtW = document.getElementById("pmtin");
    const bW = document.getElementById("bin");
    const fW = document.getElementById("ex");
    const fB = fW?.querySelector(".bd");
    const fA = fW?.querySelector("#ad");
    const fiA = document.querySelector(`[data-app="exp"]`);
    const painA = document.querySelector('[data-app="pain"]');
    const pmtA = document.querySelector('[data-app="pmt"]');
    const calcA = document.querySelector('[data-app="cat"]');
    const phA = document.querySelector('[data-app="pic"]');
    const guA = document.querySelector('[data-app="guide"]');
    const guW = document.getElementById("guidwin");
    const stA = document.querySelector('[data-app="set"]');
    const stbtnqs = document.querySelector(".setappop");
    const stbnctm = document.getElementById("wp-set");
    const trbtn = document.getElementById("wp-term");
    const setW = document.getElementById("setwin");
    const BrA = document.querySelector('[data-app="bro"]');
    const aW = document.getElementById("ab");
    const aA = document.querySelector(`[data-app="aib"]`);
    const ghW = document.getElementById("gw");
    const ghA = document.querySelector(`[data-app="gh"]`);
    const gV = document.getElementById("gv");
    const gF = document.getElementById("gframe");
    const gBa = document.getElementById("gback");
    const gCrs = document.querySelectorAll(".gcr");
    const rG = document.getElementById("rg");
    const rGN = document.getElementById("rgn");
    const GN = { din: "Dino Runner", es: "Surf", mc: "Minecraft Classic", ms: "Minesweeper", dir: "2048", pcm: "Pac-Man", fpb: "Flappy Bird" };
    const binC = document.getElementById("bf")
    const pyW = document.getElementById("pyi");
    const pyA = document.querySelector('[data-app="py"]')
    const trA = document.querySelector('[data-app="term"]');
    const trW = document.getElementById("temwin");
    const pyF = document.getElementById("pyf");
    gBa?.classList.remove("show");
    if (gF) {
        gF.addEventListener("load", () => {
            syncMsTheme();
        })
    }
    if (binC) {
        binC.addEventListener("load", () => {
            syncMsTheme();
        })
    }
    function uRG() {
        const lG = localStorage.getItem("lG");
        if (lG && GN[lG]) {
            rGN.textContent = GN[lG];
        } else {
            rG.style.display = "none";
        }
    }
    uRG();
    if (ghA && ghW) {
        ghA.addEventListener("click", () => {
            ghW.classList.add("open");
            ghW.classList.remove("minimized");
            ghA.classList.add("rng");
            ghA.classList.remove("rngmin");
            focWin(ghW);
        });
    }
    if (painA && pW) {
        painA.addEventListener("click", () => {
            pW.classList.add("open")
            pW.classList.remove("minimized");
            painA.classList.add("rng");
            painA.classList.remove("rngmin");
            focWin(pW);
        });
    }
    if (pmtA && pmtW) {
        pmtA.addEventListener("click", () => {
            pmtW.classList.add("open")
            pmtW.classList.remove("minimized");
            pmtA.classList.add("rng");
            pmtA.classList.remove("rngmin");
            focWin(pmtW);
        });
    }
    if (stA && setW) {
        stA.addEventListener("click", () => {
            setW.classList.add("open")
            setW.classList.remove("minimized");
            stA.classList.add("rng");
            stA.classList.remove("rngmin");
            focWin(setW);
        });
    }
    stbtnqs.addEventListener("click", () => {
        setW.classList.add("open")
        setW.classList.remove("minimized");
        stA.classList.add("rng");
        stA.classList.remove("rngmin");
        focWin(setW);
        clPU();
    })
    stbnctm.addEventListener("click", () => {
        setW.classList.add("open")
        setW.classList.remove("minimized");
        stA.classList.add("rng");
        stA.classList.remove("rngmin");
        focWin(setW);
        clPU();
    })
    if (fiA && fW) {
        fiA.addEventListener("click", () => {
            fW.classList.add("open")
            fW.classList.remove("minimized");
            fiA.classList.add("rng");
            fiA.classList.remove("rngmin");
            fHs = [];
            fFt = [];
            fC = "Home";
            renfl("Home");
            fBk.classList.add("dis");
            fFd.classList.add("dis");
            ne.classList.add("dis");
            sor.classList.add("dis");
            focWin(fW);
        });
    }
    if (BrA && bW) {
        BrA.addEventListener("click", () => {
            bW.classList.add("open")
            bW.classList.remove("minimized");
            BrA.classList.add("rng");
            BrA?.classList.remove("rngmin");
            focWin(bW);
        });
    }
    if (pyA && pyW) {
        pyA.addEventListener("click", () => {
            pyF.src = "https://umuttahacimen.github.io/web-python-ide/"
            pyW.classList.add("open")
            pyW.classList.remove("minimized");
            pyA.classList.add("rng");
            pyA?.classList.remove("rngmin");
            focWin(pyW);
        });
    }
    if (trA && trW) {
        trA.addEventListener("click", () => {
            trW.classList.add("open")
            trW.classList.remove("minimized");
            trA.classList.add("rng");
            trA?.classList.remove("rngmin");
            focWin(trW);
        });
    }
    trbtn.addEventListener("click", () => {
        trW.classList.add("open")
        trW.classList.remove("minimized");
        trA.classList.add("rng");
        trA?.classList.remove("rngmin");
        clPU();
        focWin(trW);
    });
    if (aA && aW) {
        aA.addEventListener("click", () => {
            aW.classList.add("open")
            aW.classList.remove("minimized");
            aA.classList.add("rng");
            aA?.classList.remove("rngmin");
            aibi.src = "https://ai-brief-10-updated-879804446672.asia-southeast1.run.app/";
            focWin(aW);
        });
    }
    if (calcA && cW) {
        calcA.addEventListener("click", () => {
            cW.classList.add("open")
            cW.classList.remove("minimized");
            calcA.classList.add("rng");
            calcA?.classList.remove("rngmin");
            focWin(cW);
        });
    }
    if (guA && guW) {
        guA.addEventListener("click", () => {
            guW.classList.add("open")
            guW.classList.remove("minimized");
            guA.classList.add("rng");
            guA?.classList.remove("rngmin");
            guA.classList.add("sh");
            focWin(guW);
        });
    }
    if (mpA && mpW) {
        mpA.addEventListener("click", () => {
            mpW.classList.add("open")
            mpW.classList.remove("minimized");
            mpA.classList.add("rng");
            mpA?.classList.remove("rngmin");
            focWin(mpW);
            startMusic();
        });
    }
    async function lSS() {
        const th = localStorage.getItem("them");
        if (th === "dark") {
            document.body.classList.add("dark-mode");
            tT?.classList.add("active");
            tTs.classList.add("on");
        } else {
            document.body.classList.remove("dark-mode");
            tT?.classList.remove("active");
            tTs.classList.remove("on");
        }
        syncMsTheme();
        const defwall = "assets/wallpapers/wallpaper2.jpg";
        const wll = localStorage.getItem("fall") || defwall;
        if (wll) {
            dT.style.backgroundImage = `url("${wll}")`;
            sAc(wll);
            wOp.forEach(opt => {
                opt.classList.toggle("sel", opt.dataset.wallpaper === wll);
            });
        }
        const wthLoC = localStorage.getItem("wthLoc");
        if (wthLoC && wthcit) {
            wthcit.value = wthLoC;
            wthcity.value = wthcit.value;
            const loc = await gCL(wthLoC);
            if (loc) {
                wtL = loc;
                const locN = loc.country
                    ? `${loc.name}, ${loc.country}`
                    : loc.name;
                await fetchWeather(loc.lat, loc.lon, locN);
            }
        }
        if (wthLoC && wthcity) {
            wthcity.value = wthLoC;
            wthcit.value = wthcity.value;
            const loc = await gCL(wthLoC);
            if (loc) {
                wtL = loc;
                const locN = loc.country
                    ? `${loc.name}, ${loc.country}`
                    : loc.name;
                await fetchWeather(loc.lat, loc.lon, locN);
            }
        }
    }
    lSS();
    gCrs.forEach(card => {
        card.addEventListener("click", () => {
            const gm = card.dataset.game;
            if (gm === "ms") {
                gF.src = "./assets/apps/minesweeper/index.html";
            } else if (gm === "mc") {
                gF.src = "https://classic.minecraft.net";
            } else if (gm === "dir") {
                gF.src = "./assets/apps/F2048/index.html";
            }
            else if (gm === "din") {
                gF.src = "https://chromedino.com/embed/";
            }
            else if (gm === "fpb") {
                gF.src = "https://flappybird.io/";
            }
            else if (gm === "pcm") {
                gF.src = "https://masonicgit.github.io/pacman/";
            }
            else {
                gF.src = "https://threekho.github.io/edgesurf/";
            }
            document.querySelector(".gawc").classList.add("playing");
            gBa?.classList.add("show");

            gV.classList.add("playing");
            requestAnimationFrame(() => {
                localStorage.setItem("lG", gm);
                uRG();
            })
        })
    })
    if (gBa) {
        gBa.addEventListener("click", () => {
            gF.src = "";
            gBa?.classList.remove("show");
            gV.classList.remove("playing");
            document.querySelector(".gawc").classList.remove("playing");
        })
    }
    const fI = {
        Home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
        Gallery: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-images"><path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/></svg>`,
        def: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`
    }
    const fSys = {
        "Home": [
            {
                name: "Internal Storage",
                size: "23.4 GB / 512 GB",
                modified: "14 Sept 2026",
                type: "Disk Drive"
            }
        ],

        "Internal Storage": [
            {
                name: "User Files",
                size: "400 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Apps",
                size: "6.5 GB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "System",
                size: "16.5 GB",
                modified: "14 Sept 2026",
                type: "Folder"
            }
        ],

        "Internal Storage\\User Files": [
            {
                name: "Downloads",
                size: "82 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Documents",
                size: "74 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Images",
                size: "96 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Audios",
                size: "68 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Videos",
                size: "80 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            }
        ],

        "Internal Storage\\System": [{ name: "do_not_open", size: "23.4 GB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Stupid/Bufe.png" }],

        "Internal Storage\\User Files\\Downloads": [],

        "Internal Storage\\User Files\\Documents": [],

        "Internal Storage\\User Files\\Images": [{ name: "Memes", size: "--", modified: "14 Sept 2026", type: "Folder" }],

        "Internal Storage\\User Files\\Images\\Memes": [
            { name: "canye", size: "550 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/canye.jpg" },
            { name: "fbi_open_up", size: "226 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/fbi.jpg" },
            { name: "freaky_pic", size: "127 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/rigby.jpg" },
            { name: "Guy", size: "107 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/Guyro.jpg" },
            { name: "MM-Mine", size: "190 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/Mine.jpg" },
            { name: "mnm", size: "240 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/mnm.jpg" },
            { name: "OOOOIIII", size: "334 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/OOOOIIIJOSUKE.jpg" },
            { name: "TTT", size: "333 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/TripleT.jpg" },
            { name: "warning_do_not_open", size: "120 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/evil.jpg" },
            { name: "why_tho_theriouth", size: "420 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/jonkler.jpg" }
        ],

        "Internal Storage\\Apps": [
            {
                name: "Browser",
                size: "320 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Paint",
                size: "180 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Memo",
                size: "120 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Calculator",
                size: "85 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Music Player",
                size: "85 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Daily Brief",
                size: "1.55 GB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Gaming Hub",
                size: "410 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Minesweeper",
                size: "290 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "2048",
                size: "240.8 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Surf",
                size: "519.2 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Dino Runner",
                size: "260 MB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Minecraft Classic",
                size: "2.52 GB",
                modified: "14 Sept 2026",
                type: "Folder"
            },
            {
                name: "Cute Pomodoro Timer",
                size: "75 MB",
                modified: "31 Oct 2026",
                type: "Folder"
            },
            {
                name: "Python IDE",
                size: "250 MB",
                modified: "31 Oct 2026",
                type: "Folder"
            }
        ],

        "Internal Storage\\Apps\\Browser": [
            {
                name: "data",
                size: "42 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "18 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "browser",
                size: "260 MB",
                modified: "14 Sept 2026",
                type: "Application"
            }
        ],

        "Internal Storage\\Apps\\Python IDE": [
            { name: "data", size: "40 MB", modified: "31 Oct 2026", type: "Data File" },
            { name: "UI", size: "20 MB", modified: "31 Oct 2026", type: "Data File" },
            { name: "python", size: "190 MB", modified: "31 Oct 2026", type: "Application" }
        ],
        "Internal Storage\\Apps\\Cute Pomodoro Timer": [
            { name: "data", size: "10 MB", modified: "31 Oct 2026", type: "Data File" },
            { name: "UI", size: "5 MB", modified: "31 Oct 2026", type: "Data File" },
            { name: "pomodoro", size: "60 MB", modified: "31 Oct 2026", type: "Application" }
        ],

        "Internal Storage\\Apps\\Paint": [
            {
                name: "data",
                size: "24 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "16 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "paint",
                size: "140 MB",
                modified: "14 Sept 2026",
                type: "Application"
            }
        ],

        "Internal Storage\\Apps\\Memo": [
            {
                name: "data",
                size: "18 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "12 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "memo",
                size: "90 MB",
                modified: "14 Sept 2026",
                type: "Application"
            }
        ],

        "Internal Storage\\Apps\\Calculator": [
            {
                name: "data",
                size: "12 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "8 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "calc",
                size: "65 MB",
                modified: "14 Sept 2026",
                type: "Application"
            }
        ],
        "Internal Storage\\Apps\\Music Player": [
            {
                name: "data",
                size: "12 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "8 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "mplayer",
                size: "65 MB",
                modified: "14 Sept 2026",
                type: "Application"
            }
        ],
        "Internal Storage\\Apps\\Daily Brief": [
            {
                name: "data",
                size: "38 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "22 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "brief",
                size: "200 MB",
                modified: "14 Sept 2026",
                type: "Application"
            }
        ],

        "Internal Storage\\Apps\\Gaming Hub": [
            {
                name: "data",
                size: "52 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "28 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "ghub",
                size: "330 MB",
                modified: "14 Sept 2026",
                type: "Application"
            }
        ],

        "Internal Storage\\Apps\\Minesweeper": [
            {
                name: "data",
                size: "34 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "18 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "msw",
                size: "4 KB",
                modified: "14 Sept 2026",
                type: "Integration"
            },
            {
                name: "msw",
                size: "8 KB",
                modified: "14 Sept 2026",
                type: "Icon"
            }
        ],

        "Internal Storage\\Apps\\2048": [
            {
                name: "data",
                size: "28 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "16 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "2048",
                size: "4 KB",
                modified: "14 Sept 2026",
                type: "Integration"
            },
            {
                name: "2048",
                size: "8 KB",
                modified: "14 Sept 2026",
                type: "Icon"
            }
        ],

        "Internal Storage\\Apps\\Surf": [
            {
                name: "data",
                size: "62 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "24 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "sf",
                size: "4 KB",
                modified: "14 Sept 2026",
                type: "Integration"
            },
            {
                name: "sf",
                size: "8 KB",
                modified: "14 Sept 2026",
                type: "Icon"
            }
        ],

        "Internal Storage\\Apps\\Dino Runner": [
            {
                name: "data",
                size: "180 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "46 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "dr",
                size: "4 KB",
                modified: "14 Sept 2026",
                type: "Integration"
            },
            {
                name: "dr",
                size: "8 KB",
                modified: "14 Sept 2026",
                type: "Icon"
            }
        ],

        "Internal Storage\\Apps\\Minecraft Classic": [
            {
                name: "data",
                size: "1.82 GB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "UI",
                size: "420 MB",
                modified: "14 Sept 2026",
                type: "Data File"
            },
            {
                name: "mcc",
                size: "4 KB",
                modified: "14 Sept 2026",
                type: "Integration"
            },
            {
                name: "mcc",
                size: "8 KB",
                modified: "14 Sept 2026",
                type: "Icon"
            }
        ],

        "Gallery": [
            {
                name: "wall1",
                type: "Image",
                path: "assets/wallpapers/wallpaper1.jpg"
            },
            {
                name: "wall2",
                type: "Image",
                path: "assets/wallpapers/wallpaper2.jpg"
            },
            {
                name: "wall3",
                type: "Image",
                path: "assets/wallpapers/wallpaper3.jpg"
            },
            {
                name: "wall4",
                type: "Image",
                path: "assets/wallpapers/wallpaper4.jpg"
            },
            { name: "why_tho_theriouth", size: "420 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/jonkler.jpg" },
            { name: "canye", size: "550 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/canye.jpg" },
            { name: "mnm", size: "240 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/mnm.jpg" },
            { name: "warning_do_not_open", size: "120 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/evil.jpg" },
            { name: "OOOOIIII", size: "334 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/OOOOIIIJOSUKE.jpg" },
            { name: "fbi_open_up", size: "226 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/fbi.jpg" },
            { name: "MM-Mine", size: "190 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/Mine.jpg" },
            { name: "freaky_pic", size: "127 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/rigby.jpg" },
            { name: "TTT", size: "333 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/TripleT.jpg" },
            { name: "Guy", size: "107 KB", modified: "14 Sept 2026", type: "Image", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Memes/Guyro.jpg" }
        ],
        "Internal Storage\\User Files\\Audios": [
            { name: "Bad - Michael Jackson", type: "Audio", modified: "14 Sept 2026", size: "4.2 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Bad.mp3" },
            { name: "Billie Jean - Michael Jackson", type: "Audio", modified: "14 Sept 2026", size: "3.8 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Billie%20Jean.mp3" },
            { name: "Smooth Criminal - Michael Jackson", type: "Audio", modified: "14 Sept 2026", size: "4.5 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Smooth%20Criminal.mp3" },
            { name: "Thriller - Michael Jackson", type: "Audio", modified: "14 Sept 2026", size: "5.1 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Thriller.mp3" },
            { name: "Beat It - Michael Jackson", type: "Audio", modified: "14 Sept 2026", size: "4.0 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Beat%20It.mp3" },
            { name: "Chicago - Michael Jackson", type: "Audio", modified: "14 Sept 2026", size: "3.9 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Chicago.mp3" }
        ],
        "Internal Storage\\User Files\\Videos": [
            { name: "Marionette", type: "Video", modified: "14 Sept 2026", size: "4.2 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Videos/marionette.mp4" },
            { name: "classic_roll", type: "Video", modified: "14 Sept 2026", size: "4.2 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Videos/classic_roll.mp4" },
            { name: "Peetah", type: "Video", modified: "14 Sept 2026", size: "4.2 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Videos/petah.mp4" },
            { name: "scary_movie_scene", type: "Video", modified: "14 Sept 2026", size: "4.2 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Videos/scary_movie_scene.mp4" },
            { name: "sus_vid", type: "Video", modified: "14 Sept 2026", size: "4.2 MB", path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Videos/sus_vid.mp4" }
        ]
    };
    const UserCr = {};
    const wA = document.getElementById("errw");
    const dtp = document.querySelector(".dtp");
    const fd = fB.querySelector(".fd");
    const rnmb = document.querySelector(".rnmb");
    const rnin = document.getElementById("rnin");
    const rnd = document.getElementById("rnd")
    const rnc = document.getElementById("rc");
    const addB = document.querySelector(".add");
    const brcr = document.getElementById("brcr");
    function renBrr(path) {
        brcr.replaceChildren();
        const parts = (path || "Home").split("\\").filter(Boolean);
        parts.forEach((part, index) => {
            if (index > 0) {
                const seprtr = document.createElement("span");
                seprtr.className = "seprtr";
                seprtr.textContent = "›";
                brcr.appendChild(seprtr);
            }
            const item = document.createElement("span");
            item.textContent = part;
            brcr.appendChild(item);
        })
    }
    addB.addEventListener("click", () => {
        if (addB.classList.contains("editing")) return;
        addB.classList.add("editing");
        fA.focus();
        fA.select();
    })
    fA.addEventListener("blur", () => {
        addB.classList.remove("editing");
    })
    function renfl(loc = "Home") {
        document.querySelectorAll(".fis .navb").forEach(btn => {
            btn.classList.toggle("act", fL[btn.id] === loc)
        })
        renBrr(loc);
        const items = sorting(fSys[loc]);
        if (!fB) return;
        if (!fd) return;
        fd.innerHTML = "";
        phA.classList.remove("sh");
        if (loc === "Gallery" || loc === "Home") {
            ne.classList.add("dis");
            sor.classList.add("dis");
        } else {
            ne.classList.remove("dis");
            sor.classList.remove("dis");
        }
        if (loc === "Internal Storage\\System") {
            const Surprise = FluetroAudio.reg(
                new Audio("https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/Stupid/URDED.mp3"),
                0.25
            );
            Surprise.play().catch(err => console.log("Audio play blocked:", err));
        }
        if (items.length === 0) {
            const emp = document.createElement("div");
            emp.className = "emp";
            emp.innerHTML = `<div class="empic"><img width="32" height="32" src="https://img.icons8.com/color/32/opened-folder.png" alt="opened-folder"/></div><span>This folder is empty</span>`
            fd.appendChild(emp);
        } else {
            items.forEach(item => {
                const row = document.createElement("button");
                row.className = "it";
                let icon = "assets/icons/file.png"
                if (item.type === "Folder") {
                    item.size = "--";
                    if (fC === "Internal Storage\\User Files") {
                        if (item.name === "Documents") icon = "assets/icons/docf.png";
                        else if (item.name === "Images") icon = "assets/icons/phof.png";
                        else if (item.name === "Videos") icon = "assets/icons/movf.png";
                        else if (item.name === "Audios") icon = "assets/icons/audf.png";
                        else if (item.name === "Downloads") icon = "assets/icons/downf.png";
                    } else {
                        icon = "assets/icons/folder.png";
                    }
                }
                else if (item.type === "Disk Drive") {
                    icon = "assets/icons/diskm.png";
                } else if (item.type === "Application") {
                    if (item.name === "browser") {
                        icon = "assets/icons/bro.png"
                    } else if (item.name === "paint") {
                        icon = "assets/icons/pain.png"
                    } else if (item.name === "memo") {
                        icon = "assets/icons/mem.png"
                    } else if (item.name === "brief") {
                        icon = "assets/icons/aib.png"
                    } else if (item.name === "ghub") {
                        icon = "assets/icons/game.png"
                    } else if (item.name === "calc") {
                        icon = "assets/icons/calc.png"
                    } else if (item.name === "mplayer") {
                        icon = "assets/icons/mus.png"
                    } else if (item.name === "pomodoro") {
                        icon = "assets/icons/pmt.png";
                    } else if (item.name === "python") {
                        icon = "assets/icons/py.png";
                    }
                } else if (item.type === "Icon") {
                    if (item.name === "msw") {
                        icon = "assets/icons/ms.png";
                    } else if (item.name === "2048") {
                        icon = "assets/icons/ico2048.svg";
                    } else if (item.name === "mcc") {
                        icon = "assets/icons/mc.png"
                    } else if (item.name === "sf") {
                        icon = "assets/icons/surf.png"
                    } else if (item.name === "dr") {
                        icon = "assets/icons/dino.png"
                    }
                } else if (item.type === "Audio") {
                    icon = "assets/icons/musf.png";
                }
                else if (item.type === "Image") {
                    icon = "assets/icons/picf.png";
                }
                else if (item.type === "Video") {
                    icon = "assets/icons/vidf.png";
                }
                else {
                    icon = "assets/icons/file.png";
                }
                row.innerHTML = `
    <span class="itn">
        <img src="${icon}" alt="">
        ${item.name}
    </span>
    <div class="sef2 invisible"></div>
    <span>${item.size}</span>
    <div class="sef2 invisible"></div>
    <span>${item.modified}</span>
    <div class="sef2 invisible"></div>
    <span>${item.type}</span>
`;
                row.addEventListener("click", () => {
                    document.querySelector(".it.pressed")?.classList.remove("pressed");
                    row.classList.add("pressed");
                    conm.classList.remove("open");
                    dtp.innerHTML = ``;
                    dtp.innerHTML = `<span><img src=${icon}></img>${item.name}</span>
        <span>Size: ${item.size}</span>
    <span>Date Modified: ${item.modified}</span>
    <span>Type: ${item.type}</span>`;
                })
                row.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    document.querySelector(".it.pressed")?.classList.remove("pressed");
                    document.querySelector(".conm.open")?.classList.remove("open");
                    row.classList.add("pressed");
                    showConm(event, item.uC === true);
                })
                function opfl() {
                    if (item.name === "System") {
                        SysSounds.play("error");
                        WW.classList.add("open");
                        wA.classList.add("sh");
                        WW.classList.remove("minimized");
                        wA?.classList.remove("rngmin");
                        wA.classList.add("rng");
                        wA.classList.remove("rngmin");
                        focWin(WW);
                    } else if (item.type === "Disk Drive" || item.type === "Folder" && item.name !== "System") {
                        const newPath = `${fC}\\${item.name}`;
                        if (fC === "Home") goTo(`${item.name}`);
                        else goTo(newPath);
                    } else if (item.type === "Audio") {
                        const trIn = musTr.findIndex(t => t.path === item.path);
                        if (trIn === -1) return
                        mpW.classList.add("open");
                        mpW.classList.remove("minimized");
                        mpA.classList.add("rng");
                        mpA?.classList.remove("rngmin");
                        focWin(mpW);
                        startMusic(trIn);
                        audio.play();
                    }
                    else if (item.type === "Application") {
                        if (item.name === "browser") {
                            bW.classList.add("open")
                            bW.classList.remove("minimized");
                            BrA.classList.add("rng");
                            BrA?.classList.remove("rngmin");
                            focWin(bW);
                        } else if (item.name === "paint") {
                            pW.classList.add("open");
                            pW.classList.remove("minimized");
                            painA.classList.add("rng");
                            painA.classList.remove("rngmin");
                            focWin(pW);
                        } else if (item.name === "memo") {
                            testWin.classList.add("open");
                            testWin.classList.remove("minimized");
                            nA.classList.add("rng");
                            nA?.classList.remove("rngmin");
                            focWin(testWin);
                        } else if (item.name === "calc") {
                            cW.classList.add("open");
                            cW.classList.remove("minimized");
                            calcA.classList.add("rng");
                            calcA?.classList.remove("rngmin");
                            focWin(cW);
                        } else if (item.name === "mplayer") {
                            mpW.classList.add("open");
                            mpW.classList.remove("minimized");
                            mpA.classList.add("rng");
                            mpA?.classList.remove("rngmin");
                            focWin(mpW);
                            startMusic();
                        } else if (item.name === "brief") {
                            aW.classList.add("open");
                            aW.classList.remove("minimized");
                            aA.classList.add("rng");
                            aA?.classList.remove("rngmin");
                            aibi.src = "https://ai-brief-10-updated-879804446672.asia-southeast1.run.app/"
                            focWin(aW);
                        } else if (item.name === "ghub") {
                            ghW.classList.add("open");
                            ghW.classList.remove("minimized");
                            ghA.classList.add("rng");
                            ghA.classList.remove("rngmin");
                            focWin(ghW);
                        } else if (item.name === "python") {
                            document.querySelector('.dk .app[data-app="py"]').click();
                        }
                        else if (item.name === "pomodoro") {
                            document.querySelector('.dk .app[data-app="pmt"]').click();
                        }
                    }
                    else if (item.type === "Text File") {
                        fied.classList.add("editing");
                        fib.classList.add("editing");
                        navaddbar.classList.add("editing");
                        opTxtedit(item);
                    } else if (item.type === "Image") {
                        phW.classList.add("open");
                        phW.classList.remove("minimized");
                        phA.classList.add("rng");
                        phA.classList.remove("rngmin");
                        phA.classList.add("sh");
                        pharr = fSys[fC].filter(item => item.type && item.path);
                        phIn = pharr.findIndex(img => img.path === item.path);
                        renPh(phIn);
                        focWin(phW);
                    } else if (item.type === "Video") {
                        vpW.classList.add("open");
                        vpW.classList.remove("minimized");
                        vpA.classList.add("rng");
                        vpA.classList.remove("rngmin");
                        vpA.classList.add("sh");
                        vidwrap.classList.add("playing");
                        vidreal.src = item.path;
                        vidreal.load();
                        focWin(vpW);
                    }
                    else {
                        SysSounds.play("error");
                        noW.classList.add("open");
                        wA.classList.add("sh");
                        noW.classList.remove("minimized");
                        wA?.classList.remove("rngmin");
                        wA.classList.add("rng");
                        wA.classList.remove("rngmin");
                        focWin(noW);
                    }
                }
                if (loc === "Gallery") {
                    rengl();
                    return;
                }
                row.addEventListener("dblclick", () => {
                    opfl();
                })
                row._fileItem = item;
                row._opfl = opfl;
                fd.appendChild(row);
            })
        }
        ope.addEventListener("click", () => {
            const sel = document.querySelector(".it.pressed, .glit.pressed");
            if (!sel) return;
            if (sel.classList.contains("glit")) {
                const image = sel._fileItem;
                if (!image) return;
                phW.classList.add("open");
                phW.classList.remove("minimized");
                phA.classList.add("rng");
                phA.classList.remove("rngmin");
                phA.classList.add("sh");
                pharr = (fSys.Gallery || []).filter(item =>
                    item.path
                );
                phIn = pharr.findIndex(item =>
                    item.path === image.path
                );
                if (phIn === -1) return;
                renPh(phIn);
                focWin(phW);
            } else {
                sel._opfl?.();
            }
            conm.classList.remove("open");
        })
        ed.addEventListener("click", () => {
            const sel = document.querySelector(".it.pressed");
            if (!sel) return;
            const it = sel._fileItem;
            if (!it || it.uC !== true) return;
            conm.classList.remove("open");
            rnin.value = it.name;
            rnmb.classList.add("open");
            rnin.focus();
            rnin.select();
        })
        de.addEventListener("click", () => {
            const sel = document.querySelector(".it.pressed");
            if (!sel) return;
            const it = sel._fileItem;
            if (!it || it.uC !== true) return;
            const its = fSys[fC];
            const ind = its.indexOf(it);
            if (ind !== -1) its.splice(ind, 1);
            const pth = `${fC}\\${it.name}`;
            delete fSys[pth];
            delete UserCr[pth];
            conm.classList.remove("open");
            svmdFs();
            renfl(fC);
        })
        fA.value = loc;
        const fIC = document.getElementById("adidc");
        if (fIC) {
            fIC.innerHTML = fI[loc] || fI.def;
            fB.querySelector(".st")?.remove();
            const sepm = document.createElement("div");
            sepm.className = ("sepm");
            const st = document.createElement("div");
            st.className = "st";
            st.appendChild(sepm);
            const sT = document.createElement("span");
            sT.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
            st.appendChild(sT);
            fB.appendChild(st);
        }
    };
    rnd.addEventListener("click", () => {
        const sel = document.querySelector(".it.pressed");
        if (!sel) return;
        const it = sel._fileItem;
        if (!it || it.uC !== true) return;
        const old = it.name;
        const nnm = rnin.value.trim();
        if (!nnm) return;
        if (nnm === old) {
            rnmb.classList.remove("open");
            return;
        }
        const its = fSys[fC];
        const dupe = its.some(ot => ot !== it && ot.name.toLowerCase() === nnm.toLowerCase() && ot.type === it.type);
        if (dupe) {
            alert("An item with that name already exists");
            rnin.focus();
            rnin.select();
            return;
        }
        it.name = nnm;
        if (it.type === "Folder") {
            const opth = `${fC}\\${old}`;
            const npth = `${fC}\\${nnm}`;
            if (fSys[opth]) {
                fSys[npth] = fSys[opth];
                delete fSys[opth];
            }
            if (UserCr[opth]) {
                UserCr[npth] = nnm;
                delete UserCr[opth];
            }
        }
        svmdFs();
        rnmb.classList.remove("open");
        renfl(fC);
    })
    rnc.addEventListener("click", () => {
        rnmb.classList.remove("open");
    })
    rnin.addEventListener("keydown", event => {
        if (event.key === "Enter") rnd.click();
        if (event.key === "Escape") rnc.click();
    })
    const fL = {
        h: "Home", gl: "Gallery",
        d: "Internal Storage",
        user: "Internal Storage\\User Files",
        dow: "Internal Storage\\User Files\\Downloads",
        doc: "Internal Storage\\User Files\\Documents",
        pi: "Internal Storage\\User Files\\Images",
        au: "Internal Storage\\User Files\\Audios",
        vi: "Internal Storage\\User Files\\Videos"
    };
    const musTr = [
        {
            title: "Bad",
            artist: "Michael Jackson",
            path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Bad.mp3",
            albumArt: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/AlbumArt/Bad.jpg"
        },
        {
            title: "Beat It",
            artist: "Michael Jackson",
            path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Beat%20It.mp3",
            albumArt: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/AlbumArt/BI.jpg"
        },
        {
            title: "Billie Jean",
            artist: "Michael Jackson",
            path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Billie%20Jean.mp3",
            albumArt: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/AlbumArt/BJ.jpg"
        },
        {
            title: "Chicago",
            artist: "Michael Jackson",
            path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Chicago.mp3",
            albumArt: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/AlbumArt/Chicago.jpg"
        },
        {
            title: "Smooth Criminal",
            artist: "Michael Jackson",
            path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Smooth%20Criminal.mp3",
            albumArt: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/AlbumArt/SC.jpg"
        },
        {
            title: "Thriller",
            artist: "Michael Jackson",
            path: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/music/Thriller.mp3",
            albumArt: "https://lmyhtzpjddmrslfpubkh.supabase.co/storage/v1/object/public/media/AlbumArt/Thriller.jpg"
        }
    ]
    const albumArt = document.getElementById("AlbArt");
    const songTitle = document.querySelector(".song-title");
    const songArtist = document.querySelector(".song-artist");
    const seekBar = document.getElementById("realBar");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");
    const prevTrack = document.getElementById("prevT");
    const playPause = document.getElementById("playPause");
    const nextTrack = document.getElementById("nextT");
    const queueList = document.querySelector(".que-list");
    let audio = FluetroAudio.reg(new Audio());
    let currentTrack = 0;
    function startMusic(trackIndex) {
        const track = musTr[trackIndex];
        if (!track) return;
        renQ();
        document.querySelectorAll(".que-item").forEach(item => {
            item.classList.toggle(
                "active",
                item.querySelector(".que-tit")?.textContent === `${track.title} - ${track.artist}`
            );
        });
        currentTrack = trackIndex;
        audio.src = track.path;
        audio?.addEventListener("timeupdate", () => {
            seekBar.value = (audio.currentTime / audio.duration) * 100;
            currentTime.textContent = formatTime(audio.currentTime);
            const progress = Number(seekBar.value);
            seekBar.style.background = `
    linear-gradient(
        to right,
        var(--accent) 0%,
        var(--accent) ${progress}%,
        rgba(255,255,255,0.25) ${progress}%,
        rgba(255,255,255,0.25) 100%
    )`;
        });
        audio?.addEventListener("loadedmetadata", () => {
            duration.textContent = formatTime(audio.duration);
        });
        audio.addEventListener("play", () => {
            playPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;
        });
        audio.addEventListener("pause", () => {
            playPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`;
        });
        albumArt.src = track.albumArt;
        songTitle.textContent = track.title;
        songArtist.textContent = track.artist;
    }
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    function renQ() {
        queueList.innerHTML = "";
        musTr.forEach((track, index) => {
            const listItem = document.createElement("button");
            listItem.className = "que-item";
            listItem.innerHTML = `<span class="que-tit">${track.title} - ${track.artist}</span>`;
            listItem.addEventListener("click", () => {
                startMusic(index);
                audio.play();
            });
            queueList.appendChild(listItem);
        });
    }
    startMusic(0);
    seekBar.addEventListener("input", () => {
        if (audio) {
            const progress = Number(seekBar.value);
            audio.currentTime = (progress / 100) * audio.duration;
            seekBar.style.background = `
    linear-gradient(
        to right,
        var(--accent) 0%,
        var(--accent) ${progress}%,
        rgba(255,255,255,0.25) ${progress}%,
        rgba(255,255,255,0.25) 100%
    )
`;
        }
    });
    if (audio.paused) {
        playPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`;
    } else {
        playPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;
    }
    playPause.addEventListener("click", () => {
        if (audio) {
            if (audio.paused) {
                audio.play();
                playPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`;
            } else {
                audio.pause();
                playPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;
            }
        }
    });
    prevTrack.addEventListener("click", () => {
        if (currentTrack > 0) {
            startMusic(currentTrack - 1);
        }
        audio.currentTime = 0;
        seekBar.value = 0;
        audio.play();
    })
    nextTrack.addEventListener("click", () => {
        if (currentTrack < musTr.length - 1) {
            startMusic(currentTrack + 1);
        }
        audio.currentTime = 0;
        seekBar.value = 0;
        audio.play();
    })
    Object.entries(fL).forEach(([id, loc]) => {
        const btn = document.getElementById(id);
        btn?.addEventListener("click", () => {
            goTo(loc)
        })
    })
    const det = fB.querySelector(".det");
    const phot = document.getElementById("photo");
    function rengl() {
        if (!fB) return;
        const fd = fB.querySelector(".fd");
        if (!fd) return;
        fd.innerHTML = "";
        const grid = document.createElement("div");
        grid.className = "glgr";
        const imgs = fSys.Gallery || [];
        imgs.forEach(image => {
            const itm = document.createElement("div");
            itm.className = "glit"
            itm._fileItem = image;
            const img = document.createElement("img");
            img.src = image.path;
            img.alt = "";
            itm.appendChild(img);
            grid.appendChild(itm);
            img.addEventListener("dblclick", () => {
                phW.classList.add("open");
                phW.classList.remove("minimized");
                phA.classList.add("rng");
                phA.classList.remove("rngmin");
                phA.classList.add("sh");
                pharr = fSys[fC].filter(item => item.type === "Image" && item.path);
                phIn = pharr.findIndex(item => item.path === image.path);
                renPh(phIn);
                focWin(phW);
            })
            itm.addEventListener("click", (event) => {
                event.preventDefault();
                document.querySelector(".glit.pressed")
                    ?.classList.remove("pressed");
                itm.classList.add("pressed");
                conm.classList.remove("open");
            });
            itm.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                document.querySelector(".it.pressed, .glit.pressed")
                    ?.classList.remove("pressed");
                document.querySelector(".conm.open")
                    ?.classList.remove("open");
                itm.classList.add("pressed");
                showConm(event, image.uC === true)
            });
        })
        fd.appendChild(grid);
        fB.querySelector(".st")?.remove();
        const sepm = document.createElement("div");
        sepm.className = ("sepm");
        const st = document.createElement("div");
        st.className = "st";
        st.appendChild(sepm);
        const sT = document.createElement("span");
        sT.textContent = `${imgs.length} item${imgs.length === 1 ? "" : "s"}`;
        st.appendChild(sT);
        fB.appendChild(st);
        fA.value = "Gallery";
    }
    nB?.addEventListener("click", () => {
        nP?.classList.toggle("hid");
        nB.classList.toggle("hid", nP.classList.contains("hid"));
    })
    pB?.addEventListener("click", () => {
        pP?.classList.toggle("hid");
        pB.classList.toggle("hid", pP.classList.contains("hid"));
    })
    OK2.addEventListener("click", () => {
        if (WW && wA) {
            wA.classList.remove("rng");
            wA.classList.remove("sh");
            WW.classList.remove("open");
            WW.classList.remove("minimized");
        }
    })
    OK3.addEventListener("click", () => {
        if (noW && wA) {
            wA.classList.remove("rng");
            wA.classList.remove("sh");
            noW.classList.remove("open");
            noW.classList.remove("minimized");
        }
    })
    OK4.addEventListener("click", () => {
        if (ntW && wA) {
            wA.classList.remove("rng");
            wA.classList.remove("sh");
            ntW.classList.remove("open");
            ntW.classList.remove("minimized");
        }
    })
    let fHs = [];
    let fFt = [];
    let fC = "Home";
    const fBk = document.getElementById("b");
    fBk?.addEventListener("click", () => {
        if (fHs.length === 0) {
            return;
        }
        const prev = fHs.pop();
        fFt.push(fC);
        goTo(prev, true);
        fBk.classList.toggle("dis", fHs.length === 0);
        fFd?.classList.remove("dis");
    });
    const fFd = document.getElementById("f");
    fFd?.addEventListener("click", () => {
        if (fFt.length === 0) {
            return;
        }
        const nxt = fFt.pop();
        fHs.push(fC);
        goTo(nxt, true);
        fFd.classList.toggle("dis", fFt.length === 0);
        fBk?.classList.remove("dis");
    });
    const fRf = document.getElementById("r");
    fRf?.addEventListener("click", () => {
        fRf.classList.add("refreshing");
        fRf.addEventListener("animationend", () => {
            fRf.classList.remove("refreshing");
        }, { once: true });
        renfl(fC);
    })
    function goTo(loc, fromHis = false) {
        if (!loc || !fSys[loc]) return;
        if (loc === fC) {
            renfl(fC);
            fBk?.classList.toggle("dis", fHs.length === 0);
            fFd?.classList.toggle("dis", fFt.length === 0);
            return;
        }
        if (!fromHis) {
            fHs.push(fC);
            fFt = [];
        }
        fC = loc;
        if (loc === "Gallery") {
            dtp.classList.add("hid");
            pB.classList.add("dis");
            det.classList.add("dis");
            fd.classList.add("gl");

        } else {
            pB.classList.remove("dis");
            det.classList.remove("dis");
            fd.classList.remove("gl");
            if (!pB.classList.contains("hid")) {
                dtp.classList.remove("hid");
            }
        }
        if (loc === "Gallery" || loc === "Home") {
            ne.classList.add("dis");
            sor.classList.add("dis");
        } else {
            ne.classList.remove("dis");
            sor.classList.remove("dis");
        }
        renfl(fC);
        fBk?.classList.toggle("dis", fHs.length === 0);
        fFd?.classList.toggle("dis", fFt.length === 0);
    }
    const sor = document.querySelector(".srt");
    const ne = document.querySelector(".ne");
    const sorm = document.querySelector(".sorm");
    const newm = document.querySelector(".newm");
    const sora = document.querySelector(".sora");
    const sord = document.querySelector(".sord");
    sor.addEventListener("click", () => {
        newm.classList.remove("open");
        ne.classList.remove("active");
        sorm.classList.toggle("open");
        sor.classList.toggle("active");
    })
    ne.addEventListener("click", () => {
        sorm.classList.remove("open");
        sor.classList.remove("active");
        ne.classList.toggle("active");
        newm.classList.toggle("open");
    })
    fA?.addEventListener("keydown", e => {
        if (e.key !== "Enter") return;
        const pt = fA.value.trim();
        if (!pt) return;
        const tar = pt.split("\\").filter(Boolean).join("\\");
        if (fSys[tar]) {
            goTo(tar);
            return;
        }
        let cur = tar;
        const nxt = tar;
        const chd = fSys[cur] || [];
        const exs = chd.some(item => item.name === nxt);
        if (!fSys[cur] && !exs) {
            SysSounds.play("error");
            ntW.classList.add("open");
            wA.classList.add("sh");
            ntW.classList.remove("minimized");
            ntW.classList.add("open");
            wA?.classList.remove("rngmin");
            wA.classList.add("rng");
            wA.classList.remove("rngmin");
            focWin(ntW);
            return;
        }
        cur = nxt;
        goTo(cur);
    })
    let sort = "asc";
    sora.classList.add("active");
    function sorting(items) {
        const sorted = [...items];
        sorted.sort((a, b) => {
            const A = String(a.name || "").toLowerCase();
            const B = String(b.name || "").toLowerCase();
            return sort === "asc" ? A.localeCompare(B) : B.localeCompare(A);
        })
        return sorted;
    }
    sora?.addEventListener("click", () => {
        sort = "asc";
        sorm?.classList.remove("open");
        sor.classList.remove("active");
        sora.classList.add("active");
        sord.classList.remove("active");
        renfl(fC);
    })
    sord?.addEventListener("click", () => {
        sort = "desc";
        sorm?.classList.remove("open");
        sor.classList.remove("active");
        sora.classList.remove("active");
        sord.classList.add("active");
        renfl(fC);
    })
    function gUN(items, base) {/*🔫*/
        const names = new Set(items.map(item => item.name.toLowerCase()));
        let i = 2;
        if (base === "New Text File") {
            if (!names.has(`${base}`.toLowerCase())) {
                return `${base}`
            }
            while (names.has(`${base} (${i})`.toLowerCase())) i++;
            return `${base} (${i})`;
        }
        if (!names.has(`${base}`.toLowerCase())) {
            return `${base}`;
        }
        while (names.has(`${base} (${i})`.toLowerCase())) i++;
        if (base === "New Folder") return `${base} (${i})`;
    }
    const newfo = document.querySelector(".newfo");
    const newfi = document.querySelector(".newfi");
    newfo?.addEventListener("click", () => {
        const items = fSys[fC];
        if (!Array.isArray(items)) return;
        const nm = gUN(items, "New Folder");
        items.push({ name: nm, size: "--", modified: gmdD(), type: "Folder", uC: true });
        if (!fSys[nm]) {
            fSys[nm] = [];
        }
        const newPath = `${fC}\\${nm}`;
        UserCr[newPath] = nm;
        fSys[newPath] = [];
        newm.classList.remove("open");
        ne.classList.remove("active");
        renfl(fC);
        svmdFs();
    })
    newfi?.addEventListener("click", () => {
        const items = fSys[fC];
        if (!Array.isArray(items)) return;
        const nm = gUN(items, "New Text File");
        items.push({ name: nm, size: "1 KB", modified: gmdD(), type: "Text File", data: "", uC: true });
        newm.classList.remove("open");
        ne.classList.remove("active");
        renfl(fC);
        svmdFs();
    })
    const USfsys = "modified-filesystem";
    function lmdfFS() {
        const svd = localStorage.getItem(USfsys);
        if (!svd) return;
        try {
            const usFs = JSON.parse(svd);
            Object.entries(usFs).forEach(([folder, items]) => {
                if (!Array.isArray(items)) return;
                if (!fSys[folder]) fSys[folder] = [];
                items.forEach(item => {
                    const exs = fSys[folder].some(exs => exs.name === item.name);
                    if (!exs) {
                        fSys[folder].push(item);
                    }
                    if (item.type === "Folder") {
                        const newPath = `${folder}\\${item.name}`;
                        if (!fSys[newPath]) {
                            fSys[newPath] = [];
                        }
                        UserCr[newPath] = item.name;
                    }
                })
            })
        }
        catch (err) {
            console.error("Failed to load Filesystem:", err);
        }
    }
    function svmdFs() {
        const usFs = {};
        Object.entries(fSys).forEach(([folder, items]) => {
            if (!Array.isArray(items)) return;
            const usIT = items.filter(item => item.uC === true);
            if (usIT.length > 0) {
                usFs[folder] = usIT;
            }
        })
        localStorage.setItem(USfsys, JSON.stringify(usFs));
    }
    function gmdD() {
        return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    }
    const cl24tgl = document.getElementById("24cl");
    cl24tgl.classList.toggle("on", hr24tgl);
    updSwitches();
    cl24tgl.addEventListener("click", () => {
        hr24tgl = !hr24tgl;
        cl24tgl.classList.toggle("on", hr24tgl);
        updSwitches();
        localStorage.setItem("24clc", hr24tgl);
        updcl();
    });
    const autoAccBtn = document.getElementById("accaut");
    const cusAccBtn = document.getElementById("acccus");
    const cusAccInp = document.getElementById("custacc");
    const defacc = "#008bb6";
    const smolautoacc = document.getElementById("autoaccent")
    function isValidAcc(color) {
        return /^#[0-9a-fA-F]{6}$/.test(color);
    }
    function calcAccent2(hex) {
        const num = parseInt(hex.slice(1), 16);
        let r = (num >> 16) & 255;
        let g = (num >> 8) & 255;
        let b = num & 255;
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        let h = 0;
        let s = 0;
        let l = (max + min) / 2;
        if (diff !== 0) {
            s = diff / (1 - Math.abs(2 * l - 1));
            switch (max) {
                case r: h = ((g - b) / diff) % 6;
                    break;
                case g: h = (b - r) / diff + 2;
                    break;
                case b: h = (r - g) / diff + 4;
                    break;
            }
        }
        h *= 60;
        if (h < 0) h += 360;
        l = Math.min(0.88, l + (1 - l) * 0.55);
        s *= 0.55;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let rgb;
        if (h < 60) rgb = [c, x, 0];
        else if (h < 120) rgb = [x, c, 0];
        else if (h < 180) rgb = [0, c, x];
        else if (h < 240) rgb = [0, x, c];
        else if (h < 300) rgb = [x, 0, c];
        else rgb = [c, 0, x];
        return "#" + rgb.map(v => Math.round((v + m) * 255).toString(16).padStart(2, "0")).join("");
    }
    function safeAc(hex) {
        const c = hex.replace("#", "");
        let r = parseInt(c.slice(0, 2), 16);
        let g = parseInt(c.slice(2, 4), 16);
        let b = parseInt(c.slice(4, 6), 16);
        const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        if (l < 0.25) {
            r = Math.round(r * 0.7 + 255 * 0.3);
            g = Math.round(g * 0.7 + 255 * 0.3);
            b = Math.round(b * 0.7 + 255 * 0.3);
        } else if (l > 0.75) {
            r = Math.round(r * 0.75);
            g = Math.round(g * 0.75);
            b = Math.round(b * 0.75);
        }
        return "#" + [r, g, b].map(v =>
            v.toString(16).padStart(2, "0")
        ).join("");
    }

    function setAcc(color) {
        document.documentElement.style.setProperty("--accent", safeAc(color))
    }
    if (!localStorage.getItem("accMode")) setAccMode("auto");
    function setAccMode(mode) {
        localStorage.setItem("accMode", mode);
        autoAccBtn.classList.toggle("on", mode === "auto")
        cusAccBtn.classList.toggle("on", mode === "custom");
        updSwitches();
        if (mode === "auto") {
            cusAccInp.classList.add("dis");
            sAc();
            return;
        } else {
            cusAccInp.classList.remove("dis");
            applyCustAcc();
        }
    }
    function applyCustAcc() {
        let color = cusAccInp.value.trim();
        color = color.toUpperCase();
        if (color !== "#FFFFFF" && color !== "#000000" && isValidAcc(color)) {
            localStorage.setItem("customaccent", color);
            cusAccInp.value = safeAc(color);
            setAcc(color);
            document.documentElement.style.setProperty("--accent2", calcAccent2(color));
        }
        else {
            cusAccInp.value = "#008bb6";
        }
    }
    autoAccBtn.addEventListener("click", () => {
        autoAccBtn.classList.add("on");
        updSwitches();
        cusAccBtn.classList.remove("on");
        setAccMode("auto");
    })
    cusAccBtn.addEventListener("click", () => {
        autoAccBtn.classList.remove("on");
        cusAccBtn.classList.add("on");
        updSwitches();
        setAccMode("custom");
        cusAccInp.classList.remove("dis");
    })
    cusAccInp.addEventListener("change", () => {
        if (localStorage.getItem("accMode") === "custom") applyCustAcc();
        const svdclr = localStorage.getItem("customaccent");
        if (isValidAcc(svdclr) || "")
            cusAccInp.value = isValidAcc(svdclr || "") ? svdclr.toUpperCase() : defacc.toUpperCase();
        const svdmd = localStorage.getItem("accMode") || "auto";
        setAccMode(svdmd);
    })
    const TgExDt = document.getElementById("exdt");
    TgExDt.addEventListener("click", () => {
        TgExDt.classList.toggle("on");
        updSwitches();
        CD.classList.toggle("poof");
        localStorage.setItem("exdtc", TgExDt.classList.contains("on"));
    })
    if (localStorage.getItem("exdtc") !== null) {
        const isOn = localStorage.getItem("exdtc") === "true";
        TgExDt.classList.toggle("on", isOn);
        CD.classList.toggle("poof", !isOn);
        updSwitches();
    }
    CD.classList.toggle("poof", !TgExDt.classList.contains("on"));
    const andig = document.getElementById("andig");
    const anadigiarea = document.querySelector(".ans");
    andig.addEventListener("click", () => {
        andig.classList.toggle("on");
        updSwitches();
        anadigiarea.classList.toggle("poof");
        ClPl.classList.toggle("noclock");
        localStorage.setItem("noclockc", andig.classList.contains("on"));
    })
    if (localStorage.getItem("noclockc") !== null) {
        andig.classList.toggle("on", localStorage.getItem("noclockc") === "true");
        updSwitches();
    }
    anadigiarea.classList.toggle("poof", !andig.classList.contains("on"));
    ClPl.classList.toggle("noclock", !andig.classList.contains("on"));
    const savedAccent = localStorage.getItem("customaccent");
    cusAccInp.value = isValidAcc(savedAccent || "")
        ? savedAccent.toUpperCase()
        : defacc.toUpperCase();
    const savedMode = localStorage.getItem("accMode") || "auto";
    setAccMode(savedMode === "custom" ? "custom" : "auto");
    const dbltit = document.getElementById("dbltit");
    let dbltitop = dbltit.classList.contains("on");
    dbltit.addEventListener("click", () => {
        dbltit.classList.toggle("on");
        updSwitches();
        if (dbltit.classList.contains("on")) dbltitop = true;
        else dbltitop = false;
        localStorage.setItem("dbltitc", dbltit.classList.contains("on"));
    })
    if (localStorage.getItem("dbltitc") !== null) {
        dbltit.classList.toggle("on", localStorage.getItem("dbltitc") === "true");
    }
    const activeWall = localStorage.getItem("fall");
    if (activeWall === savedCustomWall && savedCustomWall) {
        smolautoacc.classList.add("dis");
        autoAccBtn.classList.add("dis");
    } else {
        smolautoacc.classList.remove("dis");
        autoAccBtn.classList.remove("dis");
    }
    const highop = document.getElementById("highop");
    if (localStorage.getItem("highopc") !== null) {
        highop.classList.toggle("on", localStorage.getItem("highopc") === "true");
        updSwitches();
    }
    function applyhigh() {
        document.querySelectorAll(".app.rng").forEach(app => {
            app.style.backgroundColor = highop.classList.contains("on")
                ? ""
                : "transparent";
        });
    }
    highop.addEventListener("click", () => {
        highop.classList.toggle("on");
        updSwitches();
        localStorage.setItem("highopc", highop.classList.contains("on"));
        applyhigh();
    })
    const clmemsh = document.getElementById("clmemsh");
    clmemsh.classList.toggle(
        "on",
        localStorage.getItem("noteset") === "true"
    );
    updSwitches();
    clmemsh.addEventListener("click", () => {
        clmemsh.classList.toggle("on");
        updSwitches();
        const clearMemo = clmemsh.classList.contains("on");
        localStorage.setItem("noteset", clearMemo);
        if (clearMemo && note) {
            localStorage.removeItem("memos");
        }
    });
    const strd = document.getElementById("stardance");
    strd.addEventListener("click", () => {
        window.open("https://stardance.hackclub.com/projects/50489", "_blank");
    })
    const gthb = document.getElementById("github");
    gthb.addEventListener("click", () => {
        window.open("https://github.com/TonyStark965-404/Fluetro-OS", "_blank");
    })
    const dock = document.querySelector(".dk");
    const maxdk = document.getElementById("maxdock");
    if (localStorage.getItem("maxdockc") !== null) {
        maxdk.classList.toggle(
            "on",
            localStorage.getItem("maxdockc") === "true"
        );
    }
    maxdk.addEventListener("click", () => {
        maxdk.classList.toggle("on");
        const mdk = maxdk.classList.contains("on");
        localStorage.setItem("maxdockc", mdk);
        updSwitches();
        checkmaxwin();
    })
    function gAName(win) {
        const appId = win.dataset.app;
        const dockButton = [...dock.querySelectorAll("[data-app]")]
            .find(btn => btn.dataset.app === appId);
        return dockButton?.getAttribute("ttp") || appId || "App";
    }
    function checkmaxwin() {
        if (!maxdk.classList.contains("on")) {
            dock.classList.remove("max");
            document.documentElement.style.setProperty("--dock-height", "");
            return;
        }
        const exts = [...document.querySelectorAll(".appwin.maximized")].some(win => win.classList.contains("open") && !win.classList.contains("minimized"));
        if (exts) {
            dock.classList.add("max");
            document.documentElement.style.setProperty("--dock-height", "66px");
        } else {
            dock.classList.remove("max");
            document.documentElement.style.setProperty("--dock-height", "");
        }
        const focedWin = [...appWins].reverse().find(win => win.classList.contains("open") && !win.classList.contains("minimized") && win.classList.contains("focused"));
        if (focedWin) {
            ost.textContent = gAName(focedWin);
            ost.classList.add("running");
        } else {
            ost.classList.remove("running")
            ost.textContent = "Fluetro";
        }
    }
    const winObserver = new MutationObserver(checkmaxwin);
    appWins.forEach(win => {
        winObserver.observe(win, { attributes: true, attributeFilter: ["class"] });
    });
    document.querySelectorAll(".setnav-it[data-section]").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll(".setnav-it.active").forEach(opt => {
                opt.classList.remove("active");
            })
            const tgsec = document.getElementById(item.dataset.section);
            if (tgsec) {
                item.classList.add("active");
                tgsec.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        })
    })
    const setnavItems = document.querySelectorAll(
        ".setnav-it[data-section]"
    );
    const setnavObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                setnavItems.forEach(item => {
                    item.classList.toggle(
                        "active",
                        item.dataset.section === sectionId
                    );
                });
            }
        });
    }, {
        root: document.querySelector(".setmain"),
        threshold: 0.3
    });
    setnavItems.forEach(item => {
        const section = document.getElementById(item.dataset.section);

        if (section) {
            setnavObserver.observe(section);
        }
    });
    const reset = document.getElementById("reset");
    const oksure = document.getElementById("oksure");
    const suW = document.getElementById("surewin");
    reset.addEventListener("click", () => {
        SysSounds.play("freset");
        suW.classList.add("open");
        wA.classList.add("sh");
        suW.classList.remove("minimized");
        wA?.classList.remove("rngmin");
        wA.classList.add("rng");
        wA.classList.remove("rngmin");
        focWin(noW);
    })
    oksure.addEventListener("click", () => {
        if (suW && wA) {
            wA.classList.remove("rng");
            wA.classList.remove("sh");
            suW.classList.remove("open");
            suW.classList.remove("minimized");
        }
    })
    function updSwitches() {
        document.querySelectorAll(".switch").forEach(sw => {
            sw.innerHTML = sw.classList.contains("on")
                ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>`
                : "";
        });
    }
    function updSvBtn(item) {
        if (editorTxt.value === item.data) editsv.classList.add("disabled");
        else editsv.classList.remove("disabled");
    }
    function opTxtedit(item) {
        Fbeiedit = item;
        editFnm.textContent = item.name;
        editorTxt.value = item.data ?? "";
        updSvBtn(item);
    }
    editorTxt.addEventListener("input", updSvBtn);
    editsv.addEventListener("click", () => {
        if (!Fbeiedit || editorTxt.value === Fbeiedit.data) return;
        Fbeiedit.data = editorTxt.value;
        svmdFs();
        updSvBtn(Fbeiedit);
    })
    const exited = document.getElementById("editorExit");
    exited.addEventListener("click", () => {
        fied.classList.remove("editing");
        fib.classList.remove("editing");
        navaddbar.classList.remove("editing");
    })
    function renPh(index) {
        if (index < 0 || index >= pharr.length) return;
        phIn = index;
        phot.src = pharr[phIn].path;
        if (phIn === 0) photoPrev.classList.add("disabled");
        else photoPrev.classList.remove("disabled");
        if (phIn === pharr.length - 1) photoNxt.classList.add("disabled");
        else photoNxt.classList.remove("disabled");
    }
    photoPrev.addEventListener("click", () => {
        renPh(phIn - 1);
    })
    photoNxt.addEventListener("click", () => {
        renPh(phIn + 1);
    })
    document.addEventListener("keydown", event => {
        if (!phW.classList.contains("open")) return;
        if (event.key === "ArrowLeft" && !photoPrev.classList.contains("disabled")) {
            event.preventDefault();
            photoPrev.click();
        } else if (event.key === "ArrowRight" && !photoNxt.classList.contains("disabled")) {
            event.preventDefault();
            photoNxt.click();
        }
    })
    fW?.addEventListener("click", (event) => {
        if (event.target.closest(".navb") ||
            event.target.closest(".fop button") || event.target.closest(".glit") ||
            event.target.closest(".it") || event.target.closest(".dtp") || event.target.closest(".rnmb") || event.target.closest("#ed")) return;
        document.querySelector(".it.pressed,.glit.pressed")?.classList.remove("pressed");
        sorm.classList.remove("open");
        newm.classList.remove("open");
        sor.classList.remove("active");
        ne.classList.remove("active");
        dtp.innerHTML = ``;
        dtp.innerHTML = `<span>Select something to view Details</span>`;
        conm.classList.remove("open");
    })
    const cusWawrap = document.getElementById("custwallwrap");
    cusWawrap.addEventListener("click", () => {
        setAccMode("custom");
        smolautoacc.classList.add("dis");
        autoAccBtn.classList.add("dis");
    })
    const findApps = [...document.querySelectorAll(".appwin")]
        .map(win => {
            const appId = win.dataset.app;
            const dockButton = [...dock.querySelectorAll("[data-app]")]
                .find(btn => btn.dataset.app === appId);
            return {
                id: appId,
                name: dockButton?.getAttribute("ttp") || appId,
                icon: dockButton?.querySelector("img")?.src || "",
                window: win
            };
        })
        .filter(app => app.id && app.id !== "wip" && app.id !== "vid" && app.id !== "pic");
    const search = document.getElementById("search");
    const sugg = document.querySelector(".sugg");
    const sBar = document.querySelector(".Bar");
    const FindB = document.getElementById("Findb");
    if (localStorage.getItem("findbc") !== null) {
        FindB.classList.toggle(
            "active",
            localStorage.getItem("findbc") === "true"
        );
        sBar.classList.toggle(
            "off",
            localStorage.getItem("findbc") !== "true"
        );
    }
    FindB.addEventListener("click", () => {
        sBar.classList.toggle("off");
        FindB.classList.toggle("active");
        const findBc = FindB.classList.contains("active");
        localStorage.setItem("findbc", findBc);
    })
    const clfinsh = document.getElementById("clfinsh");
    clfinsh.classList.toggle(
        "on",
        localStorage.getItem("findset") === "true"
    );
    updSwitches();
    clfinsh.addEventListener("click", () => {
        clfinsh.classList.toggle("on");
        updSwitches();
        const clearFind = clfinsh.classList.contains("on");
        localStorage.setItem("findset", clearFind);
        if (clearFind && search) {
            search.value = "";
        }
    });
    const defSugg = ["bro", "pain", "gh"];
    let sresults = "";
    let highSugg = -1;
    let recents = [];
    if (localStorage.getItem("findset") !== "true") {
        recents = JSON.parse(localStorage.getItem("findresults") || "[]")
    } else {
        localStorage.removeItem("findresults");
    }
    function rensugg() {
        const query = search.value.trim().toLowerCase();
        sugg.innerHTML = "";
        highSugg = -1;
        if (query) {
            sresults = findApps.filter(app => app.name.toLowerCase().includes(query)).slice(0, 3);
        } else {
            const ordapps = [...new Set([...recents, ...defSugg])];
            sresults = ordapps.map(id => findApps.find(app => app.id === id)).filter(Boolean).slice(0, 3);
        }
        if (sresults.length === 0) {
            const empty = document.createElement("div");
            empty.textContent = "No matching apps found";
            empty.className = "suggele";
            empty.style.pointerEvents = "none";
            sugg.appendChild(empty);
        } else {
            sresults.forEach(app => {
                const btn = document.createElement("button");
                btn.className = "suggele";
                btn.addEventListener("mouseenter", () => {
                    const btns = [...sugg.querySelectorAll("button.suggele")];
                    highSugg = btns.indexOf(btn);
                    btns.forEach((buttn, index) => {
                        buttn.classList.toggle("selected", index === highSugg);
                    })
                })
                const ico = document.createElement("img");
                ico.className = "suggelico";
                ico.src = app.icon;
                ico.alt = "";
                btn.appendChild(ico);
                const name = document.createElement("span");
                name.className = "suggelnm";
                name.textContent = app.name;
                btn.appendChild(name);
                btn.addEventListener("click", () => {
                    const dkbtn = [...dock.querySelectorAll("[data-app]")].find(butn => butn.dataset.app === app.id);
                    if (!dkbtn) return;
                    recents = recents.filter(id => id !== app.id);
                    recents.unshift(app.id);
                    recents = recents.slice(0, 3);
                    localStorage.setItem("findresults", JSON.stringify(recents));
                    dkbtn.click();
                    search.value = "";
                    rensugg();
                    search.blur();
                })
                sugg.appendChild(btn);
            })
        }
        sugg.classList.add("show");
    }
    search.addEventListener("input", () => {
        rensugg();
    })
    search.addEventListener("focus", () => {
        rensugg();
    })
    search.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!sresults.length) return;
            if (e.key === "ArrowDown") {
                highSugg = (highSugg + 1) % sresults.length;
            } else {
                highSugg = highSugg <= 0 ? sresults.length - 1 : highSugg - 1;
            }
            const btns = sugg.querySelectorAll("button.suggele");
            btns.forEach((btn, index) => {
                btn.classList.toggle("selected", index === highSugg);
            })
        }
        if (e.key === "Enter") {
            e.preventDefault();
            if (!sresults.length) return;
            const index = highSugg === -1 ? 0 : highSugg;
            const btns = sugg.querySelectorAll("button.suggele");
            btns[index]?.click();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            clPU();
            search.blur();
        }
    })
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        const tgt = e.target;
        if (!(tgt instanceof HTMLInputElement)) return;
        if (tgt === search) return;
        e.preventDefault();
        clPU();
        tgt.blur();
    })
    const autolocbtn = document.getElementById("autoloc");
    if (autolocbtn) {
        autolocbtn.addEventListener("click", async () => {
            if (autolocbtn.classList.contains("disabled")) return;
            autolocbtn.classList.add("disabled");
            try {
                const res = await fetch("https://ipwho.is/");
                if (!res.ok) {
                    throw new Error("IP location request failed");
                }
                const data = await res.json();
                if (!data.success || !data.city) {
                    throw new Error("Unable to identify city");
                }
                wthcit.value = data.city;
                wthcit.dispatchEvent(
                    new Event("change", { bubbles: true })
                );
            } catch (error) {
                console.error("IP location error:", error);
                alert("Unable to detect your location.");
            } finally {
                autolocbtn.classList.remove("disabled");
            }
        });
    }
    const autolocbtn2 = document.getElementById("autoloc2");
    if (autolocbtn2) {
        autolocbtn2.addEventListener("click", async () => {
            if (autolocbtn2.classList.contains("disabled")) return;
            autolocbtn2.classList.add("disabled");
            try {
                const res = await fetch("https://ipwho.is/");
                if (!res.ok) {
                    throw new Error("IP location request failed");
                }
                const data = await res.json();
                if (!data.success || !data.city) {
                    throw new Error("Unable to identify city");
                }
                wthcit.value = data.city;
                wthcit.dispatchEvent(
                    new Event("change", { bubbles: true })
                );
            } catch (error) {
                console.error("IP location error:", error);
                alert("Unable to detect your location.");
            } finally {
                autolocbtn.classList.remove("disabled");
            }
        });
    }
    pprdm.addEventListener("click", () => {
        sI.classList.add("open");
    })
    const hostbr = document.getElementById("hostbr");
    function getbrr() {
        const ua = navigator.userAgent;
        if (ua.includes("Edg/")) return "Microsoft Edge";
        else if (ua.includes("OPR/")) return "Opera";
        else if (ua.includes("Firefox/")) return "Mozilla Firefox";
        else if (ua.includes("SamsungBrowser/")) return "Samsung Browser";
        else if (ua.includes("Chrome/")) return "Google Chrome";
        else if (ua.includes("Safari/")) return "Apple Safari";
        else return "Unknown Browser";
    }
    if (hostbr) {
        hostbr.textContent = getbrr();
    }
    const tem = document.querySelector(".tem");
    const temp = document.getElementById("temp");
    const temout = document.getElementById("temout");
    if (tem && temp && temout && trW) {
        const termhist = [];
        let temhi = 0;
        let temdr = "";
        let temfx = null;
        let temmd = "";
        function temPrint(txt = "", cls = "") {
            const ln = document.createElement("div");
            ln.className = `temln ${cls}`.trim();
            ln.textContent = txt;
            temout.appendChild(ln);
            tem.scrollTop = tem.scrollHeight;
            return ln;
        }
        function temSp() {
            if (temfx !== null) {
                clearInterval(temfx);
                temfx = null;
            }
            temmd = "";
        }
        function temLch(id) {
            const btn = [...document.querySelectorAll(`[data-app="${id}"]`)].find(el => !el.classList.contains("appwin"));
            if (!btn) return false;
            btn.click();
            return true;
        }
        function runTrm(ucmd) {
            const s = ucmd.trim();
            if (!s) return;
            const cmd = s.split(/\s+/)[0].toLowerCase();
            const arg = s.slice(cmd.length).trim();
            switch (cmd) {
                case "help":
                    temPrint(`Available Commands:
help            Show this list
clear           Clear Terminal
echo [text]     Print text    
date            Show current date   
time            Show current time
browser         Show host browser
apps            List available apps
settings        Open settings
about           About Fluetro OS
creator         Open Creator's GitHub
guide           Open Fluetro Guide
sudo            Try administrator acces
hello           Say hello
matrix          Matrix style (Hacker theme)
                        `);
                    break;
                case "clear":
                    temSp();
                    temout.replaceChildren();
                    tem.classList.remove("matrix");
                    break;
                case "echo":
                    temPrint(arg);
                    break;
                case "date":
                    temPrint(new Date().toLocaleDateString());
                    break;
                case "time":
                    temPrint(new Date().toLocaleTimeString());
                    break;
                case "exit":
                    temSp();
                    trW.querySelectorA(".cl")?.click();
                    break;
                case "browser":
                    temPrint(`Host Browser: ${getbrr()}`);
                    break;
                case "apps":
                    const apps = [...new Set(
                        [...document.querySelectorAll(".appwin[data-app]")]
                            .map(el => el.dataset.app)
                            .filter(id => id && !["wip", "pic", "vid"].includes(id))
                    )];
                    temPrint(`Installed Apps:\n${apps.join(", ")}`)
                    break;
                case "settings":
                    if (temLch("set")) {
                        temPrint("Opening Settings...", "temok");
                    } else {
                        temPrint("Settings could not be opened.", "temerr");
                    }
                    break;
                case "about":
                    temPrint(`Fluetro OS 1.0
A web-based Desktop Environment inspired by Fluent and mac design styles
Built with HTML, CSS and JavaScript.`);
                    break;
                case "creator":
                    window.open("https://github.com/TonyStark965-404/", "_blank", "noopener,noreferrer");
                    temPrint("Opening creator's GitHub...", "temok");
                    break;
                case "guide":
                    if (temLch("guide")) {
                        temPrint("Opening Fluetro Guide...", "temok");
                    } else {
                        temPrint("Guide isn't here, yet.", "temerr");
                    }
                    break;
                case "sudo":
                    temPrint("Permission denied. Nice try, though");
                    break;
                case "hello":
                    temPrint("Hello, world! Welcome to Fluetro OS");
                    break;
                case "matrix":
                    tem.classList.toggle("matrix");
                    temPrint(tem.classList.contains("matrix") ? "Entering the Matrix..." : "Exiting the Matrix...");
                    break;
                default:
                    temPrint(`'${cmd}' is not recognized. Type 'help'.`, "temerr");
                    break;
            }
        }
        temp.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                const cmd = temp.value.trim();
                if (!cmd) return;
                termhist.push(cmd);
                temhi = termhist.length;
                temdr = "";
                const ln = document.createElement("div");
                ln.className = "temln";
                const pr = document.createElement("span");
                pr.className = "temcmd";
                pr.textContent = "user@fluetro: ~$";
                ln.append(pr, ` `, document.createTextNode(cmd));
                temout.appendChild(ln);
                temp.value = "";
                runTrm(cmd);
                tem.scrollTop = tem.scrollHeight;
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (!termhist.length) return;
                if (temhi === termhist.length) temdr = temp.value;
                temhi = Math.max(0, temhi - 1);
                temp.value = termhist[temhi];
                temp.setSelectionRange(temp.value.length, temp.value.length);
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!termhist.length) return;
                temhi = Math.min(termhist.length, temhi + 1);
                temp.value = temhi === termhist.length ? temdr : termhist[temhi];
                temp.setSelectionRange(temp.value.length, temp.value.length);
            }
        })
        tem.addEventListener("click", e => {
            if (e.target !== temp && !window.getSelection()?.toString()) {
                temp.focus();
            }
        })
        trW.querySelector(".cl")?.addEventListener("click", temSp);
        temPrint("Type 'help' to see all available commands.")
    }
    dT.addEventListener("contextmenu", e => {
        if (e.target.closest(".appwin,.tb,.dk,.wpicker,.Bar,.settings-panel")) return;
        e.preventDefault();
        const x = Math.min(e.clientX, window.innerWidth - wP.offsetWidth - 8);
        const y = Math.min(e.clientY, window.innerHeight - wP.offsetHeight - 8);
        wP.style.left = `${Math.max(8, x)}px`;
        wP.style.top = `${Math.max(8, y)}px`;
        wP.classList.remove("open");
        wP.classList.add("open");
    })
    function showConm(e, custom) {
        conm.classList.remove("open");
        conm.classList.toggle("small", !custom);
        ed.classList.toggle("dis", !custom);
        de.classList.toggle("dis", !custom);
        const pad = 8;
        const w = conm.offsetWidth;
        const h = conm.offsetHeight;
        const x = Math.max(pad,
            Math.min(e.clientX, window.innerWidth - w - pad));
        const y = Math.max(pad,
            Math.min(e.clientY, window.innerHeight - h - pad));
        conm.style.left = `${x}px`;
        conm.style.top = `${y}px`;
        conm.classList.add("open");
    }
    const SysSounds = (() => {
        const sounds = {
            login: ["Login.mp3", 0.30],
            logout: ["Logout.mp3", 0.3],
            shutdown: ["Shutdown.mp3", 0.35],
            freset: ["Reset.mp3", 0.3],
            error: ["Error.mp3"]
        }
        const cache = {};
        for (const [name, [file, volume]] of Object.entries(sounds)) {
            const el = new Audio(`assets/sounds/${file}`);
            el.preload = "auto";
            cache[name] = FluetroAudio.reg(el, volume);
        }
        function play(name) {
            const el = cache[name];
            if (!el) return;
            el.pause();
            el.currentTime = 0;
            el.play().catch(() => { });
        }
        return { play };
    })();
    const guideWin = document.getElementById("guidwin");
    if (guideWin) {
        const guideMain = guideWin.querySelector(".guidemain");
        const guideNav = guideWin.querySelectorAll("[data-guide]");
        const guideSections = guideMain.querySelectorAll(":scope > section");
        function openGuidePage(id) {
            const target = [...guideSections].find(s => s.id === id);
            if (!target) return;
            guideNav.forEach(btn => {
                const active = btn.dataset.guide === id;
                btn.classList.toggle("active", active);
                if (active) {
                    btn.setAttribute("aria-current", "page");
                } else {
                    btn.removeAttribute("aria-current");
                }
            });
            guideSections.forEach(section => {
                section.classList.toggle("active", section === target);
            });
            guideMain.scrollTop = 0;
        }
        guideNav.forEach(btn => {
            btn.addEventListener("click", () => {
                openGuidePage(btn.dataset.guide);
            });
        });
        openGuidePage("guideintro");
    }
    checkmaxwin();
    lmdfFS();
    appWins.forEach(win => {
        crWin(win);
    });
});
