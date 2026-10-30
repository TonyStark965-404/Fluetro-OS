# Fluetro OS

A clean (kinda) customizable WebOS. Like my other project: Fluent New Tab, this is also inspired heavily by Microsoft Fluent Design System and macOS versions before Tahoe.

## How does it look?

### Boot Screen:

<img width="1920" height="1080" alt="Screenshot 2026-09-10 215800" src="https://github.com/user-attachments/assets/4e8725d0-dec3-4e5e-9fe7-03ca8bc61876" />

### Logon/Welcome Screen:

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3bcd2130-6df8-4c7c-9941-93881acfd84f" />

### Light Mode:

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f415d4ff-5026-458d-a92a-f43184cd7b6a" />

### Dark Mode:

<img width="1920" height="1080" alt="Screenshot 2026-09-10 230721" src="https://github.com/user-attachments/assets/2b7b20aa-287c-4ffa-96fb-6704e8438554" />

[![Run FluetroOS](https://img.shields.io/badge/Run-OS-brightgreen?style=for-the-badge)](https://fluetro-os.vercel.app/)

## How to use?

-Just click the Run OS link and that's it

## What features does it have?

- A consistent design language, inspired by Windows 11 and MacOS
- macOS style Top Bar with Date and weather, which also have working flyouts
- macOS style dock for apps
- Smooth and consistent animations
- Sign out, shut down and restart screens
- Shut down feature that can actually close the Browser Tab after the sequence
- A Memo so you can note down your thoughts
- Working Paint app
- A calculator app that can do basic calculations.
- Working Browser
- AI Brief (inspired by Samsung Now Brief)
- Games: Minesweeper, 2048, Dino Runner, Surf, Minecraft Classic, Pac-Man, and Flappy Bird
- Custom right-click context menus for the desktop and file explorer
- Automatic accent colors based on the selected wallpaper
- The OS itself doesn't require any permissions
- A Files app with folders, file management, and a virtual filesystem
- A Settings app for customizing the OS
- A Terminal app
- A Python IDE for writing and running Python code
- A Cute Pomodoro Timer to help you stay focused
- A Music Player, Photo Viewer, and Video Player
- A built-in Guide to help new users get started
- Draggable, resizable, minimizable, and maximizable app windows
- Light and Dark Mode support
- Customizable wallpapers and a Stretch Dock option
- System sounds and volume controls
- Built-in app search
- Local storage for saving user preferences and supported app data

### Privacy Note

- The AI Brief currently requests location information. If location permission is not provided, its weather/location functionality may fall back to IP-based location detection. This is not ideal for Fluetro's privacy-focused design, and it will be fixed in a future update.

## How can I run it locally and modify it?

Easy, just do this:

```bash
git clone https://github.com/TonyStark965-404/Fluetro-OS.git
cd fluetro-os
```

then open index.html in your browser to run locally
or open the folder in VS Code or any other editor to modify

## How does it work?

Fluetro OS is built with HTML, CSS and JavaScript, where the Memo content, Weather Location and user preferences (like Dark Mode and Wallpaper) are stored locally using localStorage. The weather data is fetched using Open-Meteo.

## Whom to Credit for the assets?

- [Arindam Saha](https://unsplash.com/@hyperickz) on Unsplash for the Default Foggy mountain Wallpaper
- [Benjamin Voros](https://unsplash.com/@vorosbenisop) on Unsplash for the Starry mountain Wallpaper
- [Bogdan Pasca](https://unsplash.com/@bogdipasca) on Unsplash for the House near shore Wallpaper
- [Joshua Woroniecki](https://unsplash.com/@joshuaworoniecki) on Unsplash for the Trees under stars Wallpaper
- [Icons8](https://icons8.com) for the dock icons
- [Lucide](https://lucide.dev) for the various UI icons and symbols
- [One UI MASTER](https://www.reddit.com/user/EmergencyMelodic9443/) for the AI Brief app
- [player.style](https://player.style/) for the Music Player styling
- [Google / Chromium Authors](https://chromium.googlesource.com/chromium/src/) for the Chrome Dino game (via chromedino.com)
- [Microsoft / Mojang](https://classic.minecraft.net/) for the official Minecraft Classic web version
- [Microsoft Edge Team](https://www.microsoft.com/edge) (with web packaging adapted via [Jack Buehner](https://github.com/jackbuehner/MicrosoftEdge-Surf) and hosted via [3kh0](https://threekho.github.io/edgesurf/)) for the Edge Surf game
- [Pac-Man](https://github.com/masonicgit/pacman) by MasonicGit
- [Flappy Bird](https://flappybird.io/) for the Flappy Bird game
- [Umut Taha Çimen](https://github.com/umuttahacimen/web-python-ide) for the Python IDE
- [Cute Pomodoro Timer](https://cutepomodorotimer.com/) for the Cute Pomodoro Timer app

## Any Features planned for the Future?

Since there's always room for improvement, in the future, I might add

- PDF reader that allows you to upload a PDF to read it
- Similar apps for photos and videos too
- Maybe a markdown editor

### What's already done in this update:

- The Files app to browse well... files
- Music Player
- More UI Polish and animations
- More games
- Animations for Maximize/Restore Down
- More customization options
- - Custom accent color support
- - Custom wallpaper support
- - And Many more customization options
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

## Are There some issues?

Yes

- Weather and Minesweeper use emojis for icons, so they're not consistent across different operating systems.
- Paint app starts with the default theme as retro, doesn't follow OS Dark Mode and should be changed via Extras>Themes for consistency

## Note:

- I am not in any way or manner connected with Fluetro PDF, it's an entirely different app developed by [FireCubeStudios](https://github.com/FireCubeStudios/).
- I added this since Google's AI Overview has been telling people that I made that app.
- Also, the names being same is by pure coincidence, and I did not know about the existence of Fluetro PDF before I started this project.