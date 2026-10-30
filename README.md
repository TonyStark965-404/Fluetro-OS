<div align="center">

# Fluetro OS

**A clean, customizable WebOS inspired by the Microsoft Fluent Design System and classic macOS versions**

[![Run FluetroOS](https://img.shields.io/badge/run-os-brightgreen?style=flat-square)](https://fluetro-os.vercel.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## About

Fluetro OS is a clean, customizable WebOS. Inspired heavily by the Microsoft Fluent Design System and macOS versions before Tahoe, it brings a rich desktop environment directly to your browser. Everything is fully responsive, interactive, and self-contained with zero required browser permissions.

---

## Preview Gallery

<details>
<summary><b>Click to expand screenshots</b></summary>

### Boot Screen:

<img width="1920" height="1080" alt="Screenshot 2026-09-10 215800" src="https://github.com/user-attachments/assets/4e8725d0-dec3-4e5e-9fe7-03ca8bc61876" />

### Logon/Welcome Screen:

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3bcd2130-6df8-4c7c-9941-93881acfd84f" />

### Light Mode:

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f415d4ff-5026-458d-a92a-f43184cd7b6a" />

### Dark Mode:

<img width="1920" height="1080" alt="Screenshot 2026-09-10 230721" src="https://github.com/user-attachments/assets/2b7b20aa-287c-4ffa-96fb-6704e8438554" />

</details>

---

## Features

### Desktop Environment & Shell

- **Consistent design language** — inspired by Windows 11 and macOS
- **Top bar** — macOS-style with date, weather, and working flyouts
- **Dock** — macOS-style for apps with Stretch Dock option and built-in app search
- **Window management** — draggable, resizable, minimizable, and maximizable app windows with smooth maximize/restore down animations
- **Context menus** — custom right-click context menus for the desktop and file explorer
- **Session control** — working sign out, shut down, and restart screens (shut down can actually close the browser tab after the sequence)
- **Local storage** — saves user preferences, dark mode, custom wallpapers, and supported app data locally via `localStorage`
- **Zero permissions** — the OS itself doesn't require any browser permissions

### Visual Design & Customization

- **Light and Dark Mode** — seamless switching support
- **Accent colors** — automatic accent colors based on selected wallpaper, plus custom accent color support
- **Wallpapers** — customizable wallpapers
- **Animations** — smooth and consistent UI animations
- **Audio** — system sounds and volume controls backed by a custom audio engine

---

## Built-in Apps

| App                | Description                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Files**          | Browse folders, file management, and a virtual filesystem                                     |
| **Settings**       | A whole settings app with a bunch of customization options                                    |
| **Terminal**       | Command-line interface for the OS                                                             |
| **Python IDE**     | A python-based coding app for writing and running Python code                                 |
| **Memo**           | Note down your thoughts with local storage persistence                                        |
| **Calculator**     | Basic calculator that can do simple calculations                                              |
| **Paint**          | Working paint application                                                                     |
| **Browser**        | Fully functional embedded web browser                                                         |
| **AI Brief**       | Smart overview assistant (inspired by Samsung Now Brief)                                      |
| **Pomodoro Timer** | Cute Pomodoro Timer to help you stay focused                                                  |
| **Media Suite**    | Built-in Music Player, Photo Viewer, and Video Player                                         |
| **Guide**          | Built-in guide app to help new users get started                                              |
| **Games Hub**      | Minesweeper, 2048, Chrome Dino Runner, Edge Surf, Minecraft Classic, Pac-Man, and Flappy Bird |

---

## Tech Stack

| Layer               | Technology                                           |
| ------------------- | ---------------------------------------------------- |
| Frontend            | HTML5, CSS3, JavaScript                              |
| Persistence         | Browser `localStorage`                               |
| Weather API         | Open-Meteo                                           |
| Geolocation         | IP-based location detection via `ipwho.is`           |
| Audio/Media Hosting | Supabase (managed via custom `FluetroAudio` utility) |

---

## How does it work?

Fluetro OS is built with HTML, CSS and JavaScript, where the Memo content, Weather Location and user preferences (like Dark Mode and Wallpaper) are stored locally using localStorage. The weather data is fetched using Open-Meteo, with IP-based auto-location detection powered by `ipwho.is`, and audio assets hosted via Supabase.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/TonyStark965-404/Fluetro-OS.git
cd fluetro-os
```

Then open `index.html` in your browser to run locally, or open the folder in VS Code or any other editor to modify.

---

## Privacy Note

- The AI Brief currently requests location information. If location permission is not provided, its weather/location functionality may fall back to IP-based location detection. This is not ideal for Fluetro's privacy-focused design, and it will be fixed in a future update.

---

## Asset Credits

| Asset / Component                    | Creator / Source                                                                                                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Default Foggy Mountain Wallpaper** | [Arindam Saha](https://unsplash.com/@hyperickz) on Unsplash                                                                                                                  |
| **Starry Mountain Wallpaper**        | [Benjamin Voros](https://unsplash.com/@vorosbenisop) on Unsplash                                                                                                             |
| **House Near Shore Wallpaper**       | [Bogdan Pasca](https://unsplash.com/@bogdipasca) on Unsplash                                                                                                                 |
| **Trees Under Stars Wallpaper**      | [Joshua Woroniecki](https://unsplash.com/@joshuaworoniecki) on Unsplash                                                                                                      |
| **Dock Icons**                       | [Icons8](https://icons8.com)                                                                                                                                                 |
| **UI Icons & Symbols**               | [Lucide](https://lucide.dev)                                                                                                                                                 |
| **AI Brief App**                     | [One UI MASTER](https://www.reddit.com/user/EmergencyMelodic9443/)                                                                                                           |
| **Music Player Styling**             | [player.style](https://player.style/)                                                                                                                                        |
| **Chrome Dino**                      | [Google / Chromium Authors](https://chromium.googlesource.com/chromium/src/) (via `chromedino.com`)                                                                          |
| **Minecraft Classic**                | [Microsoft / Mojang](https://classic.minecraft.net/) (Official web version)                                                                                                  |
| **Edge Surf**                        | [Microsoft Edge Team](https://www.microsoft.com/edge) (via [Jack Buehner](https://github.com/jackbuehner/MicrosoftEdge-Surf) & [3kh0](https://threekho.github.io/edgesurf/)) |
| **Pac-Man**                          | [MasonicGit](https://github.com/masonicgit/pacman)                                                                                                                           |
| **Flappy Bird**                      | [Flappy Bird](https://flappybird.io/)                                                                                                                                        |
| **Python IDE**                       | [Umut Taha Çimen](https://github.com/umuttahacimen/web-python-ide)                                                                                                           |
| **Cute Pomodoro Timer**              | [Cute Timer](https://cutepomodorotimer.com/)                                                                                                                                 |

---

## Roadmap & Future Plans

Since there's always room for improvement, in the future, I might add:

- PDF reader that allows you to upload a PDF to read it
- Similar apps for photos and videos too
- Maybe a markdown editor

### What's already done in this update:

- The Files app to browse well... files
- Music Player
- More UI Polish and animations
- More games
- Animations for Maximize/Restore Down
- More customization options (Custom accent color support, custom wallpaper support, and more)
- Terminal
- A python-based coding app
- A whole Settings app with a bunch of settings
- A guide app
- Auto detect location feature

### What was already done in previous update:

- Games
- A working Browser
- AI Brief (inspired by Samsung's Now Brief)
- More consistent UI and use of accent colors

---

## Known Issues

- Weather and Minesweeper use emojis for icons, so they're not consistent across different operating systems.
- Paint app starts with the default theme as retro, doesn't follow OS Dark Mode and should be changed via `Extras > Themes` for consistency.

---

## Note

- I am not in any way or manner connected with **Fluetro PDF**, it's an entirely different app developed by [FireCubeStudios](https://github.com/FireCubeStudios/).
- I added this since Google's AI Overview has been telling people that I made that app.
- Also, the names being same is by pure coincidence, and I did not know about the existence of Fluetro PDF before I started this project.

---

<div align="center">

**Fluetro OS** — made with HTML, CSS, and JavaScript

</div>
