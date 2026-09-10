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

[![Run FluetroOS](https://img.shields.io/badge/run-os-brightgreen?style=for-the-badge)](https://fluetro-os.vercel.app/)

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
- Games: Minesweeper, 2048, Dino Runner, Surf, and Minecraft Classic
- Automatic accent colors based on the selected wallpaper
- The OS itself doesn't require any permissions
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

## Any Features planned for the Future?
Of course
- The Files app to browse well... files (work in progress)
- Maybe a Music Player
- More UI Polish and animations
- Possibly more games
- Animations for Maximize/Restore Down
- More customization options
- Maybe a Terminal
- Maybe a python-based coding app

### What's already done in this update:
- Games
- A working Browser (work in progress)
- AI Brief (inspired by Samsung's Now Brief)
- More consistent UI and use of accent colors
  
## Are There some issues?
Yes
- There is no animation for Maximize/Restore Down
- Files is still a Work in Progress, I just included it, so it feels fuller
- Since it doesn't require any browser permissions you have to add the Weather Location by yourself
- Weather and Minesweeper use emojis for icons, so they're not consistent across different operating systems.
- Paint app starts with the default theme as retro, doesn't follow OS Dark Mode and should be changed via Extras>Themes for consistency
